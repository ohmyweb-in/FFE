/* FFE Word import (ffe-word-import.php): a .docx press release -> a draft post, in the editor's browser.
 * mammoth.js turns the .docx into HTML using Word's own styles; WordPress's paste conversion (wp.blocks.rawHandler) turns that into
 * blocks. Photos are uploaded through the REST API like any upload. Checked against the docs and the live editor on 17 Nov 2026. */
(function (wp) {
  var el = wp.element.createElement, useState = wp.element.useState, Fragment = wp.element.Fragment;
  var registerPlugin = wp.plugins.registerPlugin, PluginDocumentSettingPanel = wp.editor.PluginDocumentSettingPanel;
  var C = wp.components, select = wp.data.select, dispatch = wp.data.dispatch, useSelect = wp.data.useSelect;

  // Word's built-in styles -> HTML. Heading 1 is the article's h2 (the page title is its h1). Unmapped styles fall back to mammoth's
  // defaults (lists, tables, bold, italic, links, footnotes).
  var STYLE_MAP = [
    "p[style-name='Title'] => h1.ffe-title:fresh",
    "p[style-name='Subtitle'] => p.ffe-subtitle:fresh",
    "p[style-name='Heading 1'] => h2:fresh",
    "p[style-name='Heading 2'] => h3:fresh",
    "p[style-name='Heading 3'] => h4:fresh",
    "p[style-name='Quote'] => blockquote > p:fresh",
    "p[style-name='Intense Quote'] => blockquote > p:fresh",
    "p[style-name='Caption'] => p.ffe-caption:fresh",
  ];
  // Closing sections the article template already shows (About cards, media contact) or that only matter on paper.
  var BOILER = /^(about (fresh food expo|ffe|messe berlin|the organi[sz]er)|for (more|further) information|for media|media (contact|enquir|queries)|press (contact|enquir)|notes? (to|for) editors|-*\s*ends\s*-*$|#{3}$)/i;
  var esc = function (s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; };
  var text = function (v) { return String(v == null ? '' : v).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim(); };

  function isEmptyPost() {
    var blocks = select('core/block-editor').getBlocks();
    var title = select('core/editor').getEditedPostAttribute('title');
    var empty = blocks.every(function (b) { return b.name === 'core/paragraph' && !text(b.attributes.content); });
    return empty && !String(title || '').trim();
  }

  async function convert(file, say) {
    if (!/\.docx$/i.test(file.name)) throw new Error('Please choose a .docx file. In Word: File > Save As > Word Document (.docx). In Google Docs: File > Download > Microsoft Word (.docx).');
    var base = file.name.replace(/\.docx$/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50) || 'article';
    var n = 0, skipped = [];
    var convertImage = mammoth.images.imgElement(async function (image) {
      var type = image.contentType || '';
      if (!/^image\/(jpeg|png|gif|webp)$/.test(type)) { skipped.push(type || 'unknown'); return { src: '' }; }
      var data = await image.readAsArrayBuffer();
      var ext = { jpeg: 'jpg', png: 'png', gif: 'gif', webp: 'webp' }[type.split('/')[1]];
      var form = new FormData();
      form.append('file', new Blob([data], { type: type }), base + '-' + (++n) + '.' + ext);
      if (image.altText) form.append('alt_text', image.altText);
      say('Uploading photo ' + n + '…');
      var m = await wp.apiFetch({ path: '/wp/v2/media', method: 'POST', body: form });
      return { src: m.source_url, alt: image.altText || '', 'class': 'wp-image-' + m.id, 'data-id': String(m.id) };
    });
    say('Reading the document…');
    var res = await mammoth.convertToHtml({ arrayBuffer: await file.arrayBuffer() }, { styleMap: STYLE_MAP, convertImage: convertImage });
    var doc = new DOMParser().parseFromString('<body>' + res.value + '</body>', 'text/html'), body = doc.body;
    body.querySelectorAll('img').forEach(function (i) { if (!i.getAttribute('src')) i.remove(); });

    // Title: Word's Title style, else a heading at the very top. Subtitle: the summary under the title.
    var title = '', excerpt = '';
    // Many documents aren't styled: a short, all-bold line with no full stop is a heading (and, at the very top, the title).
    var boldLine = function (e) { var x = e.textContent.trim(); return e.tagName === 'P' && x && x.length <= 160 && !/[.!?:]$/.test(x) && !e.querySelector('img') && Array.prototype.every.call(e.childNodes, function (c) { return /^(STRONG|B)$/.test(c.nodeName) || !c.textContent.trim(); }); };
    var first = body.firstElementChild;
    var t = body.querySelector('h1.ffe-title') || (first && (/^H[1-4]$/.test(first.tagName) || boldLine(first)) ? first : null);
    if (t) { title = t.textContent.trim(); t.remove(); }
    body.querySelectorAll('p').forEach(function (p) { if (boldLine(p) && p.textContent.trim().length <= 120) { var h = doc.createElement('h2'); h.textContent = p.textContent.trim(); p.replaceWith(h); } });
    var st = body.querySelector('p.ffe-subtitle');
    if (st) { excerpt = st.textContent.trim(); st.remove(); }
    body.querySelectorAll('h1').forEach(function (h) { var h2 = doc.createElement('h2'); h2.innerHTML = h.innerHTML; h.replaceWith(h2); });

    // Photos: each its own <figure>; a Caption-style line right after it becomes its caption.
    body.querySelectorAll('img').forEach(function (img) {
      var p = img.parentElement, fig = doc.createElement('figure');
      if (p && p !== body) { p.after(fig); } else { img.after(fig); }
      fig.appendChild(img);
      if (p && p !== body && !p.textContent.trim() && !p.querySelector('img')) p.remove();
      var next = fig.nextElementSibling;
      // Its caption: a Caption-style line, or a short all-italic line, right after it.
      var italicLine = next && next.tagName === 'P' && next.textContent.trim().length <= 300 && Array.prototype.every.call(next.childNodes, function (c) { return /^(EM|I)$/.test(c.nodeName) || !c.textContent.trim(); }) && next.textContent.trim();
      if (next && (next.matches('p.ffe-caption') || italicLine)) { var fc = doc.createElement('figcaption'); fc.innerHTML = next.innerHTML.replace(/^\s*<(em|i)>([\s\S]*)<\/\1>\s*$/i, '$2'); fig.appendChild(fc); next.remove(); }
    });
    // A quote typed as a plain paragraph, "“Words.” – Name, Role": a quote with its speaker (handled like Word's Quote style below).
    body.querySelectorAll('p').forEach(function (p) {
      var m = p.textContent.trim().match(/^([“"][\s\S]+[”"])\s*[—–-]\s*([^—–]+)$/);
      if (!m || p.closest('blockquote')) return;
      var bq = doc.createElement('blockquote'), q = doc.createElement('p'), who = doc.createElement('p');
      q.textContent = m[1]; who.textContent = '— ' + m[2].trim(); bq.append(q, who); p.replaceWith(bq);
    });
    body.querySelectorAll('p.ffe-caption').forEach(function (p) { p.removeAttribute('class'); p.innerHTML = '<em>' + p.innerHTML + '</em>'; });

    // The first photo is the Featured image (shown above the article with its caption), so it leaves the body.
    var featured = null, f0 = body.querySelector('figure');
    if (f0) { var fc0 = f0.querySelector('figcaption'); featured = { id: +f0.querySelector('img').dataset.id, caption: fc0 ? fc0.innerHTML : '' }; f0.remove(); }

    // Closing boilerplate, only in the second half of the document: from the first such heading or line to the end.
    var removed = [], kids = Array.prototype.slice.call(body.children);
    var cut = kids.findIndex(function (e, i) { return i >= kids.length / 2 && (/^H[2-6]$/.test(e.tagName) || (e.tagName === 'P' && e.textContent.trim().length < 60)) && BOILER.test(e.textContent.trim()); });
    if (cut > 0) kids.slice(cut).forEach(function (e) { if (/^H[2-6]$/.test(e.tagName) || BOILER.test(e.textContent.trim())) removed.push(e.textContent.trim()); e.remove(); });

    // Blocks, as WordPress converts a paste; then a quote's closing "— Name, role" line becomes its citation (name in bold).
    var blocks = wp.blocks.rawHandler({ HTML: body.innerHTML }).map(function (b) {
      if (b.name !== 'core/quote' || b.innerBlocks.length < 2) return b;
      var m = text(b.innerBlocks[b.innerBlocks.length - 1].attributes.content).match(/^[—–-]\s*(.+)$/);
      if (!m) return b;
      var at = m[1].indexOf(','), who = at > 0 ? m[1].slice(0, at) : m[1], role = at > 0 ? m[1].slice(at) : '';
      return wp.blocks.cloneBlock(b, { citation: '<strong>' + esc(who.trim()) + '</strong>' + esc(role) }, b.innerBlocks.slice(0, -1));
    }).filter(function (b) { return !(b.name === 'core/paragraph' && !text(b.attributes.content)); });

    return { title: title, excerpt: excerpt, featured: featured, blocks: blocks, photos: n, removed: removed, skipped: skipped,
      warnings: res.messages.filter(function (m) { return m.type !== 'info'; }).map(function (m) { return m.message; }) };
  }

  async function apply(r) {
    if (r.featured && r.featured.caption) await wp.apiFetch({ path: '/wp/v2/media/' + r.featured.id, method: 'POST', data: { caption: r.featured.caption } });
    dispatch('core/block-editor').resetBlocks(r.blocks);
    var edits = { status: 'draft' };
    if (r.title) edits.title = r.title;
    if (r.featured) edits.featured_media = r.featured.id;
    if (r.excerpt) edits.excerpt = r.excerpt;
    dispatch('core/editor').editPost(edits);
    await dispatch('core/editor').savePost();
  }

  function Importer() {
    var s = useState({ busy: false, log: '', error: '', done: null }), st = s[0], set = s[1];
    var empty = useSelect(function () { return isEmptyPost(); }, []);
    async function onChange(e) {
      var file = e.currentTarget.files && e.currentTarget.files[0];
      e.currentTarget.value = '';
      if (!file) return;
      set({ busy: true, log: 'Starting…', error: '', done: null });
      try {
        var r = await convert(file, function (m) { set(function (p) { return Object.assign({}, p, { log: m }); }); });
        set(function (p) { return Object.assign({}, p, { log: 'Saving the draft…' }); });
        await apply(r);
        set({ busy: false, log: '', error: '', done: r });
        dispatch('core/notices').createSuccessNotice('Imported from Word and saved as a draft. Check it, choose a Category, then Preview and Publish.', { type: 'snackbar' });
      } catch (err) {
        set({ busy: false, log: '', error: (err && err.message) || String(err), done: null });
      }
    }
    if (st.done) {
      var r = st.done;
      return el('div', { className: 'ffe-wi' },
        el(C.Notice, { status: 'success', isDismissible: false }, 'Imported and saved as a draft.'),
        el('ul', { style: { margin: '12px 0 0 18px', listStyle: 'disc' } },
          el('li', null, r.title ? 'Title: ' + r.title : 'No title found: type it at the top.'),
          el('li', null, r.photos ? r.photos + (r.photos === 1 ? ' photo' : ' photos') + ' uploaded; the first is the Featured image.' : 'No photos in the document: add a Featured image.'),
          r.excerpt ? el('li', null, 'Summary taken from the Subtitle.') : null,
          r.removed.length ? el('li', null, 'Left out (the page adds these itself): ' + r.removed.join('; ') + '.') : null,
          r.skipped.length ? el('li', null, r.skipped.length + ' picture(s) in a format the web can’t show (' + r.skipped.join(', ') + '): add them as photos.') : null,
          r.warnings.length ? el('li', null, 'Notes from the conversion: ' + r.warnings.slice(0, 3).join('; ')) : null),
        el('p', { style: { marginTop: '12px' } }, 'Now check the text, choose a Category, then Preview and Publish.'));
    }
    if (!empty) return el('p', null, 'Importing fills an empty article. To import a Word document, start a new one: Posts > Import from Word.');
    return el('div', { className: 'ffe-wi' },
      el('p', { style: { marginTop: 0 } }, 'Choose a finished press release or news story saved as a Word document (.docx). It becomes a draft with its headings, lists, quotes and photos.'),
      st.busy
        ? el('p', null, el(C.Spinner), ' ', st.log)
        : el(C.FormFileUpload, { accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document', onChange: onChange, render: function (o) {
            return el(C.Button, { variant: 'primary', onClick: o.openFileDialog }, 'Choose a Word document');
          } }),
      st.error ? el(C.Notice, { status: 'error', isDismissible: false }, st.error) : null);
  }

  registerPlugin('ffe-word-import', {
    render: function () {
      var s = useState(!!(window.ffeWordImport && window.ffeWordImport.open)), open = s[0], setOpen = s[1];
      return el(Fragment, null,
        el(PluginDocumentSettingPanel, { name: 'ffe-word-import', title: 'Import from Word', className: 'ffe-word-import' }, el(Importer)),
        open ? el(C.Modal, { title: 'Import a Word document', onRequestClose: function () { setOpen(false); }, size: 'medium' }, el(Importer)) : null);
    },
  });
})(window.wp);

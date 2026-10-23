// Reference-vs-staging measuring tool.  Usage: node scripts/elementor/measure.js <spec.json>
// spec = { ref, stg, widths: [1440, 900, 390], root: [refSel, stgSel], items: { name: [refSel, stgSel, mode?] }, shots: "/abs/dir" (optional), rootName, rootPos: false to skip the root's absolute x/y (buttons),
//          countOnly: true (only line counts can FAIL; boxes and lines are printed as info: for widths that are not pixel-matched),
//          gaps: true (after the items, the vertical gap between consecutive visible items on ref and stg; FAIL when |Δ| > 1) }
// mode "lines" compares text lines only (text boxes differ by design: the reference trims line boxes, Elementor does not). Scrollbars are hidden on both.
// Per site and width it prints each item's box and text lines (relative to the root's top-left) and the deltas.
// Exits 1 when any |delta| > 1px or a line count differs. Reduced motion is on, so reveals are visible and counts final.
const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const spec = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
const SESSION = `measure-${process.pid}`;
const ab = (args, input) => {
  const r = spawnSync("agent-browser", ["--session", SESSION, ...args], { encoding: "utf8", input, maxBuffer: 1 << 28 });
  if (r.status !== 0) throw new Error(`agent-browser ${args.join(" ")}: ${r.stderr || r.stdout}`);
  return r.stdout;
};

// Runs in the page (first rendered match per selector). Boxes are relative to the root; document coords of the root come back for cropping.
const PAGE = (rootSel, items) => `(() => {
  const rootEl = document.querySelector(${JSON.stringify(rootSel)});
  if (!rootEl) return { error: "root not found: " + ${JSON.stringify(rootSel)} };
  const rr = rootEl.getBoundingClientRect(), ox = rr.left, oy = rr.top;
  const r1 = (n) => Math.round(n * 100) / 100;
  const rel = (b) => [r1(b.left - ox), r1(b.top - oy), r1(b.width), r1(b.height)];
  const lines = (el) => {
    const rects = [], tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n; (n = tw.nextNode()); ) {
      if (!n.textContent.trim()) continue;
      const cs = getComputedStyle(n.parentElement);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      const pb = n.parentElement.getBoundingClientRect();
      if (pb.width <= 1 && pb.height <= 1) continue; // sr-only duplicates (CountUp): clipped to 1px, but their text rects still span the full text
      const rg = document.createRange(); rg.selectNodeContents(n);
      for (const q of rg.getClientRects()) if (q.width > 0) rects.push(q);
    }
    rects.sort((a, b) => a.top - b.top || a.left - b.left);
    const out = [];
    for (const q of rects) {
      const l = out.find((o) => Math.abs(o.top - q.top) <= 2);
      if (l) { l.left = Math.min(l.left, q.left); l.right = Math.max(l.right, q.right); l.bottom = Math.max(l.bottom, q.bottom); }
      else out.push({ top: q.top, left: q.left, right: q.right, bottom: q.bottom });
    }
    return out.map((l) => rel({ left: l.left, top: l.top, width: l.right - l.left, height: l.bottom - l.top }));
  };
  const items = ${JSON.stringify(items)}, res = {};
  for (const [k, sel] of Object.entries(items)) {
    // First match that is actually rendered (the source often has a hidden phone twin before the desktop one).
    const el = [...document.querySelectorAll(sel)].find((e) => { const b = e.getBoundingClientRect(); return b.width > 0 || b.height > 0; });
    res[k] = el ? { box: rel(el.getBoundingClientRect()), lines: lines(el) } : null;
  }
  return { root: { box: [r1(rr.left), r1(rr.top + scrollY), r1(rr.width), r1(rr.height)], lines: lines(rootEl) }, items: res };
})()`;

const stamp = Date.now();
const measure = (url, width, rootSel, items) => {
  ab(["set", "viewport", String(width), "900"]);
  ab(["set", "media", "light", "reduced-motion"]);
  ab(["open", `${url}${url.includes("?") ? "&" : "?"}nc=${stamp}`]);
  // Same layout width on both sites: the classic 15px scrollbar appears on one and not the other at some widths.
  ab(["eval", "document.head.appendChild(Object.assign(document.createElement('style'), { textContent: 'html{scrollbar-width:none}html::-webkit-scrollbar{display:none}' })), 1"]);
  ab(["eval", "document.fonts.ready.then(() => new Promise((r) => setTimeout(r, 500))).then(() => 1)"]);
  const j = JSON.parse(ab(["eval", "--json", "--stdin"], PAGE(rootSel, items)));
  const out = j.data.result;
  if (out.error) throw new Error(`${url} @${width}: ${out.error}`);
  return out;
};

const shot = (site, width, root) => {
  if (!spec.shots) return;
  fs.mkdirSync(spec.shots, { recursive: true });
  const full = path.join(spec.shots, `_full-${site}-${width}.png`);
  ab(["screenshot", "--full", full]);
  const name = `${spec.rootName || "root"}-${site}-${width}.png`;
  const [x, y, w, h] = root.box;
  const py = `import sys;from PIL import Image;im=Image.open(sys.argv[1]);x,y,w,h=map(float,sys.argv[3:7]);im.crop((max(0,round(x)),max(0,round(y)),min(im.width,round(x+w)),min(im.height,round(y+h)))).save(sys.argv[2])`;
  spawnSync("python3", ["-I", "-c", py, full, path.join(spec.shots, name), x, y, w, h]);
  fs.unlinkSync(full);
};

let fails = 0;
const fmt = (a) => (a ? a.map((v) => v.toFixed(1)).join(", ") : "—");
const row = (name, a, b, mode, noPos) => {
  const info = spec.countOnly;
  if (!a && !b) return `ok   ${name} hidden on both`;
  if (!a || !b) { fails++; return `FAIL ${name}: ${a ? "missing on stg" : "missing on ref"}`; }
  const out = [];
  const cmp = (tag, x, y, skip = 0) => {
    const d = x.map((v, i) => (i < skip ? 0 : +(y[i] - v).toFixed(2)));
    const bad = !info && d.some((v) => Math.abs(v) > 1);
    if (bad) fails++;
    out.push(`${bad ? "FAIL" : info ? "info" : "ok  "} ${name} ${tag}  ref [${fmt(x)}]  stg [${fmt(y)}]  Δ [${d.join(", ")}]`);
  };
  if (mode !== "lines") cmp("box", a.box, b.box, noPos ? 2 : 0);
  if (a.lines.length !== b.lines.length) { fails++; out.push(`FAIL ${name} line count ref ${a.lines.length} stg ${b.lines.length}`); }
  // Lines compare left/top/width; height depends on line-height and trimming.
  for (let i = 0; i < Math.min(a.lines.length, b.lines.length); i++) {
    const x = a.lines[i], y = b.lines[i], d = [0, 1, 2].map((k) => +(y[k] - x[k]).toFixed(2));
    const bad = !info && d.some((v) => Math.abs(v) > 1);
    if (bad) fails++;
    out.push(`${bad ? "FAIL" : info ? "info" : "ok  "} ${name} line${i}  ref [${x.slice(0, 3).map((v) => v.toFixed(1)).join(", ")}]  stg [${y.slice(0, 3).map((v) => v.toFixed(1)).join(", ")}]  Δ [${d.join(", ")}]`);
  }
  return out.join("\n");
};

// Vertical gaps between consecutive visible items (next.top - prev.bottom), ref vs stg.
const gaps = (names, ref, stg) => {
  const seen = names.filter((k) => ref[k] && stg[k]), out = [];
  for (let i = 1; i < seen.length; i++) {
    const [p, n] = [seen[i - 1], seen[i]], g = (it) => +(it[n].box[1] - (it[p].box[1] + it[p].box[3])).toFixed(2), a = g(ref), b = g(stg), d = +(b - a).toFixed(2), bad = Math.abs(d) > 1;
    if (bad) fails++;
    out.push(`${bad ? "FAIL" : "ok  "} gap ${p} -> ${n}  ref ${a}  stg ${b}  Δ ${d}`);
  }
  return out.join("\n");
};

try {
  for (const width of spec.widths) {
    console.log(`\n=== ${width}px ===`);
    const refItems = Object.fromEntries(Object.entries(spec.items || {}).map(([k, v]) => [k, v[0]]));
    const stgItems = Object.fromEntries(Object.entries(spec.items || {}).map(([k, v]) => [k, v[1]]));
    const ref = measure(spec.ref, width, spec.root[0], refItems);
    shot("ref", width, ref.root);
    const stg = measure(spec.stg, width, spec.root[1], stgItems);
    shot("stg", width, stg.root);
    console.log(row("root", ref.root, stg.root, "", spec.rootPos === false));
    for (const k of Object.keys(spec.items || {})) console.log(row(k, ref.items[k], stg.items[k], spec.items[k][2]));
    if (spec.gaps) console.log(gaps(Object.keys(spec.items || {}), ref.items, stg.items));
  }
} finally {
  spawnSync("agent-browser", ["--session", SESSION, "close"]);
}
console.log(fails ? `\n${fails} FAIL` : "\nall within 1px");
process.exit(fails ? 1 : 0);

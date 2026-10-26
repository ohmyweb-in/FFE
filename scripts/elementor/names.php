<?php
// Names every element in Elementor's Structure panel ("Heading · Asia Pacific's premier…", "Image · Hero photo", "… (phone only)"),
// so editors can find what they click and reach the elements the canvas can't (a photo under a fade, a phone-only copy).
// Fills empty names and refreshes the ones it made before (they start "Section · ", "Text · " …); a name someone typed in the editor is kept.
// Content and styles are not touched.
// Run through lib.js stamp() after a push, with $ids set; for a one-off over every document: $ids = all Elementor pages + templates.
// Data is decoded as objects (not arrays) so `{}` survives the round trip.

$str = function ($v) use (&$str) {
  if (is_string($v)) return $v;
  if (is_object($v) && isset($v->value)) return $str($v->value);
  if (is_object($v) && isset($v->content)) return $str($v->content);
  return '';
};
$snip = function ($html, $max = 42) {
  $t = trim(preg_replace('/\s+/u', ' ', html_entity_decode(wp_strip_all_tags(str_replace('<', ' <', $html)), ENT_QUOTES | ENT_HTML5, 'UTF-8')));
  $t = trim(str_replace(['›', '⁠'], '', $t));
  return mb_strlen($t) > $max ? rtrim(mb_substr($t, 0, $max - 1)) . '…' : $t;
};
// "Phone only · " etc. from the element's own local style (display none on some breakpoints). A prefix, not a suffix:
// the Structure panel is narrow and cuts the end of long names off.
$where = function ($el) {
  $hidden = [];
  foreach ((array) ($el->styles ?? []) as $cls) foreach ($cls->variants ?? [] as $v) {
    if (($v->meta->state ?? null) !== null) continue;
    $d = $v->props->display ?? null;
    if ($d === null) continue;
    $d = is_object($d) ? ($d->value ?? '') : $d;
    $hidden[$v->meta->breakpoint] = ($d === 'none');
  }
  if (!$hidden) return '';
  $at = function ($bp) use ($hidden) { // desktop-first cascade
    $order = ['desktop', 'laptop', 'tablet_extra', 'tablet', 'mobile'];
    $h = false;
    foreach ($order as $o) { if (array_key_exists($o, $hidden)) $h = $hidden[$o]; if ($o === $bp) return $h; }
  };
  [$d, $t, $m] = [$at('desktop'), $at('tablet'), $at('mobile')];
  if ($d && $t && $m) return '';               // hidden everywhere: a script fills it (not worth a label)
  if ($d && $t && !$m) return 'Phone only · ';
  if ($d && !$t) return $m ? 'Tablet only · ' : 'Tablet and phone · ';
  if (!$d && $t && $m) return 'Computer only · ';
  if (!$d && !$t && $m) return 'Not on phones · ';
  return '';
};
// First text inside an element; $types narrows it (a section is named after its heading, not the eyebrow above it).
$text_in = function ($el, $types = ['e-heading', 'e-paragraph']) use (&$text_in, $str) {
  if (in_array($el->widgetType ?? '', $types, true)) return $str($el->settings->title ?? $el->settings->paragraph ?? '');
  foreach ($el->elements ?? [] as $c) { $t = $text_in($c, $types); if ($t !== '') return $t; }
  return '';
};
$alt = function ($el) use ($str) {
  $id = $el->settings->image->value->src->value->id->value ?? $el->settings->image->value->src->value->id ?? 0;
  if (!$id) return '';
  $a = get_post_meta((int) $id, '_wp_attachment_image_alt', true);
  return $a !== '' ? $a : get_the_title((int) $id);
};
$has_attr = function ($el, $key) {
  foreach ($el->settings->attributes->value ?? [] as $kv) if (($kv->value->key->value ?? '') === $key) return true;
  return false;
};

$named = 0;
$walk = function (&$els, $depth) use (&$walk, &$named, $str, $snip, $where, $text_in, $alt, $has_attr) {
  foreach ($els as $el) {
    $type = $el->widgetType ?? $el->elType ?? '';
    $title = null;
    if ($type === 'e-heading') $title = 'Heading · ' . $snip($str($el->settings->title ?? ''));
    elseif ($type === 'e-paragraph') $title = 'Text · ' . $snip($str($el->settings->paragraph ?? ''));
    elseif ($type === 'e-image') $title = 'Image · ' . $snip($alt($el) ?: 'photo');
    elseif ($type === 'e-svg') $title = 'Icon';
    elseif ($type === 'html') $title = 'Code (ask before editing)';
    elseif (in_array($type, ['e-flexbox', 'e-div-block'], true)) {
      $dest = $str($el->settings->link->value->destination ?? '');
      if ($dest !== '') $title = ($has_attr($el, 'data-btn') ? 'Button · ' : 'Link · ') . $snip($text_in($el), 30) . ' → ' . $dest;
      elseif ($depth === 0) { $t = $text_in($el, ['e-heading']) ?: $text_in($el); $title = 'Section · ' . ($t !== '' ? $snip($t, 34) : ucfirst(str_replace('-', ' ', $el->id))); }
    }
    $old = $el->editor_settings->title ?? '';
    $new = $title === null || $title === '' ? '' : $where($el) . $title;
    $ours = '/^((Phone only|Tablet only|Tablet and phone|Computer only|Not on phones) · )?((Section|Heading|Text|Image|Button|Link) · |Icon( \(|$)|Code \(ask)/u';
    if ($new !== '' && $new !== $old && ($old === '' || preg_match($ours, $old))) {
      if (!isset($el->editor_settings) || !is_object($el->editor_settings)) $el->editor_settings = new stdClass();
      $el->editor_settings->title = $new;
      $named++;
    }
    if (!empty($el->elements)) $walk($el->elements, $depth + 1);
  }
};

$out = [];
foreach ($ids as $id) {
  $raw = get_post_meta($id, '_elementor_data', true);
  $data = json_decode(is_string($raw) ? $raw : '', false);
  if (!is_array($data)) { $out[$id] = 'no data'; continue; }
  $named = 0;
  $walk($data, 0);
  if ($named) update_post_meta($id, '_elementor_data', wp_slash(wp_json_encode($data)));
  $out[$id] = $named;
}
return $out;

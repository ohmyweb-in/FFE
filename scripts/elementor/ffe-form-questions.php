<?php
/**
 * Plugin Name: FFE form questions
 * Description: wp-admin > "Registration form": editors add questions to the Register Your Interest form (/register-to-visit/form/) and
 * show or hide its built-in ones, without Elementor. Added questions are inserted into the page's HTML at the chosen place and look like
 * the built-in ones (CSS below mirrors forms.js: label 15/19, 48px field, 20px boxes). Elementor's form sends them like any field (it
 * collects every input with data-interaction-id; the server keeps every posted field), so they reach the team email and Elementor >
 * Submissions under the question text. The built-in questions stay Elementor elements (pages/register-to-visit-form/form.js); a hide/show
 * set here wins over Elementor's Display setting. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

if (!defined('ABSPATH')) exit;

const FFE_FQ_PAGE = 'register-to-visit/form';
// Built-in questions: element id => label. Name, email and the two consent boxes can't be hidden (subject line, Mailchimp, consent).
const FFE_FQ_BUILTIN = [
  'rf-g-interesttype' => 'Interest Type', 'rf-g-salutation' => 'Salutation', 'rf-fld-firstname' => 'First Name', 'rf-fld-lastname' => 'Last Name',
  'rf-fld-email' => 'Business Email', 'rf-fld-mobile' => 'Mobile Number', 'rf-fld-company' => 'Company Name', 'rf-fld-jobtitle' => 'Job Title',
  'rf-fld-country' => 'Country / Region', 'rf-g-activity' => 'Company Business Activity', 'rf-g-products' => 'Products / services interested in',
  'rf-g-hostedbuyers' => 'Hosted Buyers Programme', 'rf-c-marketingconsent' => 'Marketing consent box', 'rf-c-termsconsent' => 'Terms consent box',
];
const FFE_FQ_FIXED = ['rf-fld-firstname', 'rf-fld-lastname', 'rf-fld-email', 'rf-c-marketingconsent', 'rf-c-termsconsent'];
const FFE_FQ_TYPES = ['text' => 'Short answer', 'textarea' => 'Long answer', 'select' => 'Dropdown (pick one)', 'radio' => 'Pick one (round buttons)', 'checkbox' => 'Tick boxes (pick any)', 'tick' => 'Single tick box'];

// Saved shape: ['hidden' => [element ids], 'questions' => [[id, question, type, options[], required, note, before]]].
// Until first saved: what form.js hides (16 Nov 2026, Ruben).
// A scratch copy of the form page (page.js `_test/…` with _ffe_page "_test/form") reads ffe_form_questions_test instead, to try questions out.
function ffe_fq_get(?bool $test = null): array {
  $test ??= ffe_fq_is_page() === 'test';
  return wp_parse_args(get_option($test ? 'ffe_form_questions_test' : 'ffe_form_questions', []), ['hidden' => ['rf-g-activity', 'rf-g-products'], 'questions' => []]);
}

/* 1. The screen. */
add_filter('option_page_capability_ffe_form_questions', fn() => 'ffe_manage_content'); // administrators and Content managers (ffe-content.php)
add_action('init', function () { // init, not admin_init: the sanitize filter then exists wherever the option is written
  register_setting('ffe_form_questions', 'ffe_form_questions', ['sanitize_callback' => function ($in) {
    $in = is_array($in) ? $in : [];
    // WordPress runs this twice when the option is first created, the second time on this function's own output ({hidden, questions},
    // no "show"): read that shape too, or every built-in question would come out hidden (17 Nov 2026, caught on the first save).
    $show = isset($in['show']) || !isset($in['hidden']) ? (array) ($in['show'] ?? []) : array_fill_keys(array_diff(array_keys(FFE_FQ_BUILTIN), (array) $in['hidden']), 1);
    $out = ['hidden' => [], 'questions' => []];
    foreach (array_keys(FFE_FQ_BUILTIN) as $k) if (!in_array($k, FFE_FQ_FIXED, true) && empty($show[$k])) $out['hidden'][] = $k;
    foreach ((array) ($in['questions'] ?? []) as $q) {
      $text = sanitize_text_field($q['question'] ?? '');
      if ($text === '') continue; // an emptied question is deleted
      $type = array_key_exists($q['type'] ?? '', FFE_FQ_TYPES) ? $q['type'] : 'text';
      $raw = $q['options'] ?? '';
      $opts = array_values(array_filter(array_map('sanitize_text_field', is_array($raw) ? $raw : preg_split('/\r\n|\r|\n/', (string) $raw))));
      if (in_array($type, ['select', 'radio', 'checkbox'], true) && !$opts) $type = 'text'; // a choice without options becomes a text box
      $id = preg_match('/^q[a-f0-9]{6}$/', $q['id'] ?? '') ? $q['id'] : 'q' . substr(md5(uniqid('', true)), 0, 6);
      $before = array_key_exists($q['before'] ?? '', FFE_FQ_BUILTIN) ? $q['before'] : 'rf-c-marketingconsent';
      $out['questions'][] = ['id' => $id, 'question' => $text, 'type' => $type, 'options' => array_slice($opts, 0, 60), 'required' => !empty($q['required']), 'note' => sanitize_text_field($q['note'] ?? ''), 'before' => $before];
    }
    return $out;
  }]);
});
add_action('update_option_ffe_form_questions', fn() => do_action('litespeed_purge_all'));
add_action('add_option_ffe_form_questions', fn() => do_action('litespeed_purge_all'));

add_action('admin_menu', function () {
  add_menu_page('Registration form', 'Registration form', 'ffe_manage_content', 'ffe-form-questions', function () {
    $o = ffe_fq_get(false);
    $rows = array_merge($o['questions'], array_fill(0, 2, ['id' => '', 'question' => '', 'type' => 'text', 'options' => [], 'required' => false, 'note' => '', 'before' => 'rf-c-marketingconsent']));
    $url = home_url('/' . FFE_FQ_PAGE . '/');
    ?>
    <div class="wrap"><h1>Registration form</h1>
    <p>The questions on <a href="<?php echo esc_url($url); ?>" target="_blank">Register Your Interest</a>. Visitors see changes within about 5 minutes. Answers arrive in the team email and under Elementor &gt; Submissions, named by the question.</p>
    <form method="post" action="options.php"><?php settings_fields('ffe_form_questions'); ?>
    <h2>Questions already on the form</h2>
    <p>Untick a question to hide it (its answers are then not asked or sent). Name, email and the two consent boxes always show.</p>
    <table class="form-table"><tr><th>Show</th><td>
    <?php foreach (FFE_FQ_BUILTIN as $k => $label) : $fixed = in_array($k, FFE_FQ_FIXED, true); ?>
      <label style="display:block;margin:0 0 6px"><input type="checkbox" name="ffe_form_questions[show][<?php echo esc_attr($k); ?>]" value="1" <?php checked($fixed || !in_array($k, $o['hidden'], true)); disabled($fixed); ?>> <?php echo esc_html($label); ?></label>
    <?php endforeach; ?>
    </td></tr></table>
    <h2>Your own questions</h2>
    <p>Fill in a question and Save. To add more, Save and two new empty boxes appear. To delete a question, empty its "Question" box and Save. For a dropdown, round buttons or tick boxes, write one option per line.</p>
    <?php foreach ($rows as $i => $q) : $n = "ffe_form_questions[questions][$i]"; ?>
    <fieldset style="background:#fff;border:1px solid #c3c4c7;border-radius:4px;padding:6px 16px;margin:0 0 14px;max-width:900px">
      <legend style="padding:0 6px;font-weight:600"><?php echo $q['question'] === '' ? 'New question' : 'Question ' . ($i + 1); ?></legend>
      <input type="hidden" name="<?php echo $n; ?>[id]" value="<?php echo esc_attr($q['id']); ?>">
      <table class="form-table" role="presentation">
        <tr><th><label for="fq<?php echo $i; ?>q">Question</label></th><td><input class="large-text" id="fq<?php echo $i; ?>q" name="<?php echo $n; ?>[question]" value="<?php echo esc_attr($q['question']); ?>"></td></tr>
        <tr><th><label for="fq<?php echo $i; ?>t">Answer type</label></th><td><select id="fq<?php echo $i; ?>t" name="<?php echo $n; ?>[type]"><?php foreach (FFE_FQ_TYPES as $k => $l) printf('<option value="%s"%s>%s</option>', esc_attr($k), selected($q['type'], $k, false), esc_html($l)); ?></select></td></tr>
        <tr><th><label for="fq<?php echo $i; ?>o">Options</label></th><td><textarea class="large-text" rows="4" id="fq<?php echo $i; ?>o" name="<?php echo $n; ?>[options]" placeholder="One option per line (Dropdown, round buttons and tick boxes only)"><?php echo esc_textarea(implode("\n", $q['options'])); ?></textarea></td></tr>
        <tr><th>Required</th><td><label><input type="checkbox" name="<?php echo $n; ?>[required]" value="1" <?php checked($q['required']); ?>> Visitors must answer</label></td></tr>
        <tr><th><label for="fq<?php echo $i; ?>n">Note under it</label></th><td><input class="large-text" id="fq<?php echo $i; ?>n" name="<?php echo $n; ?>[note]" value="<?php echo esc_attr($q['note']); ?>" placeholder="Optional, e.g. a disclaimer"></td></tr>
        <tr><th><label for="fq<?php echo $i; ?>b">Place it before</label></th><td><select id="fq<?php echo $i; ?>b" name="<?php echo $n; ?>[before]"><?php foreach (FFE_FQ_BUILTIN as $k => $l) printf('<option value="%s"%s>%s</option>', esc_attr($k), selected($q['before'], $k, false), esc_html($l)); ?></select></td></tr>
      </table>
    </fieldset>
    <?php endforeach; ?>
    <?php submit_button('Save questions'); ?></form></div>
    <?php
  }, 'dashicons-feedback', 60);
});

/* 2. On the page: hide/show the built-in questions and insert the added ones before their anchor elements. */
// 'live' on the form page, 'test' on its scratch copy, false elsewhere.
function ffe_fq_is_page() {
  static $id = null;
  if ($id === null) { $p = get_page_by_path(FFE_FQ_PAGE); $id = $p ? $p->ID : 0; }
  if (!is_page()) return false;
  if ($id && is_page($id)) return 'live';
  return get_post_meta(get_queried_object_id(), '_ffe_page', true) === '_test/form' ? 'test' : false;
}

add_action('wp_head', function () {
  if (!ffe_fq_is_page()) return;
  $o = ffe_fq_get();
  $css = '';
  foreach (array_keys(FFE_FQ_BUILTIN) as $k) {
    if (in_array($k, FFE_FQ_FIXED, true)) continue;
    $css .= sprintf('body .elementor [data-id="%s"] { display: %s !important; }', $k, in_array($k, $o['hidden'], true) ? 'none' : 'flex');
  }
  echo "<style id=\"ffe-fq-css\">$css\n" . ffe_fq_css() . "</style>\n";
});

function ffe_fq_css(): string {
  $p = 'body .elementor .ffe-xq';
  $chev = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M6 9l6 6 6-6' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";
  return "$p { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
$p:is([role=radiogroup], [role=group]) { gap: 16px; }
$p .ffe-xq-l { display: block; margin: 0; font: 500 15px/19px Outfit, system-ui, sans-serif; color: #000; }
$p .ffe-xq-in { width: 100%; height: 48px; padding: 0 16px; margin: 0; border: 1px solid #cdcdcd; border-radius: 10px; background: #fff; font: 500 15px/23px Outfit, system-ui, sans-serif; color: #000; box-sizing: border-box; transition: border-color 250ms, box-shadow 250ms; }
$p textarea.ffe-xq-in { height: 120px; padding: 14px 16px; resize: vertical; }
$p select.ffe-xq-in { padding-right: 48px; cursor: pointer; background: #fff $chev no-repeat right 18px center / 18px; }
$p .ffe-xq-opts { display: flex; flex-direction: column; gap: 14px; }
$p .ffe-xq-row { display: flex; flex-direction: row; align-items: flex-start; gap: 14px; }
$p .ffe-xq-c { width: 20px; height: 20px; min-width: 20px; padding: 0; margin: 0; border: 1.5px solid #8a8a8a; border-radius: 4px; box-sizing: border-box; }
$p .ffe-xq-c[type=radio] { border-radius: 999px; }
$p .ffe-xq-ol { display: block; flex: 1 1 0; min-width: 0; margin: 0; font: 500 13px/19px Outfit, system-ui, sans-serif; color: #4f4f4f; cursor: pointer; }
$p .ffe-xq-note { margin: 0; font: italic 400 13px/19px Outfit, system-ui, sans-serif; color: #4f4f4f; }";
}

// One question's markup. Ids: xq-<id>[-n]; data-interaction-id rf-f-xq-<id>[-n] keys the answer in Submissions. Choice groups are named by
// the question (Elementor labels a group by its name); text boxes carry the question as aria-label (Elementor's label for them).
function ffe_fq_html(array $q): string {
  $id = 'xq-' . $q['id'];
  $e = fn($s) => esc_attr($s);
  $req = $q['required'] ? ' required' : '';
  $star = $q['required'] ? '<span> *</span>' : '';
  $note = $q['note'] !== '' ? '<p class="ffe-xq-note">' . esc_html($q['note']) . '</p>' : '';
  $label = esc_html($q['question']);
  switch ($q['type']) {
    case 'radio':
    case 'checkbox':
      $radio = $q['type'] === 'radio';
      $opts = '';
      foreach ($q['options'] as $i => $opt) {
        $oid = "$id-" . ($i + 1);
        $opts .= sprintf('<div class="ffe-xq-row" role="listitem"><input class="ffe-xq-c" type="%s" id="%s" name="%s" value="%s" %s data-interaction-id="rf-f-%s"%s><label class="ffe-xq-ol" for="%s">%s</label></div>',
          $radio ? 'radio' : 'checkbox', $e($oid), $e($q['question']), $e($opt), $radio ? 'data-ffe-radio' : 'data-ffe-check', $e($oid), $radio ? $req : '', $e($oid), esc_html($opt));
      }
      return sprintf('<div class="ffe-xq" data-xq data-span role="%s" aria-labelledby="%s-label"%s%s><p class="ffe-xq-l" id="%s-label"%s>%s%s</p><div class="ffe-xq-opts" role="list">%s</div>%s</div>',
        $radio ? 'radiogroup' : 'group', $e($id), $radio && $q['required'] ? ' aria-required="true"' : '', !$radio && $q['required'] ? ' data-require-one' : '', $e($id), $star ? ' data-req' : '', $label, $star, $opts, $note);
    case 'tick':
      return sprintf('<div class="ffe-xq" data-xq data-span><div class="ffe-xq-row"><input class="ffe-xq-c" type="checkbox" id="%s" name="%s" value="Yes" data-ffe-check data-interaction-id="rf-f-%s" aria-label="%s"%s><label class="ffe-xq-ol" for="%s"%s>%s%s</label></div>%s</div>',
        $e($id), $e($id), $e($id), $e($q['question']), $req, $e($id), $star ? ' data-req' : '', $label, $star, $note);
    default:
      $common = sprintf('class="ffe-xq-in" id="%s" name="%s" data-ffe-input data-interaction-id="rf-f-%s" aria-label="%s"%s', $e($id), $e($id), $e($id), $e($q['question']), $req);
      if ($q['type'] === 'textarea') $control = "<textarea $common></textarea>";
      elseif ($q['type'] === 'select') {
        $control = "<select $common data-ph><option value=\"\">Select</option>";
        foreach ($q['options'] as $opt) $control .= sprintf('<option value="%s">%s</option>', $e($opt), esc_html($opt));
        $control .= '</select>';
      } else $control = "<input type=\"text\" $common>";
      return sprintf('<div class="ffe-xq" data-xq%s><label class="ffe-xq-l" for="%s"%s>%s%s</label>%s%s</div>',
        $q['type'] === 'textarea' ? ' data-span' : '', $e($id), $star ? ' data-req' : '', $label, $star, $control, $note);
  }
}

add_filter('elementor/frontend/the_content', function ($html) {
  if (!ffe_fq_is_page() || is_admin() || (class_exists('\Elementor\Plugin') && \Elementor\Plugin::$instance->editor->is_edit_mode())) return $html;
  $by = [];
  foreach (ffe_fq_get()['questions'] as $q) $by[$q['before']][] = ffe_fq_html($q);
  foreach ($by as $anchor => $parts) {
    $at = strpos($html, 'elementor-element-' . $anchor . ' ');
    $start = $at === false ? false : strrpos(substr($html, 0, $at), '<');
    if ($start === false) continue; // the anchor was removed in Elementor: its questions are left out rather than misplaced
    $html = substr($html, 0, $start) . implode('', $parts) . substr($html, $start);
  }
  return $html;
});

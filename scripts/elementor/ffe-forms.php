<?php
/**
 * Plugin Name: FFE — forms
 * Description: Server side of the site's Elementor (atomic) forms, as bunny/contact-form.ts does for the Next.js build: honeypot + Cloudflare Turnstile check, team routing, Mailchimp, ZeptoMail SMTP and a staging guard. Secrets are wp-config.php constants (FFE_TURNSTILE_SECRET, FFE_MAILCHIMP_KEY, FFE_ZEPTOMAIL_TOKEN, FFE_TEST_INBOX), never in this file. Deployed to wp-content/mu-plugins/; this copy in scripts/elementor/ is the record.
 */

const FFE_LIVE_HOST = 'www.freshfoodexpoapac.com';
const FFE_MAIL_FROM = 'noreply@freshfoodexpoapac.com';
// Messe Berlin Asia Pacific audience (shared with their other events); FFE APAC sign-ups carry this tag.
const FFE_MAILCHIMP_LIST = '20965648a9';
const FFE_MAILCHIMP_TAG = 'FFE APAC';

// The Enquiry Type select's option values are these keys, never addresses, so the site can't be used to mail anyone else.
const FFE_TEAMS = [
  'marketing' => 'marketing@freshfoodexpoapac.com', 'exhibitor' => 'exhibitor@freshfoodexpoapac.com',
  'visitor' => 'visitor@freshfoodexpoapac.com', 'conference' => 'conference@freshfoodexpoapac.com',
  'buyers' => 'buyer@freshfoodexpoapac.com', 'media' => 'media@freshfoodexpoapac.com',
];

// Mailchimp Source (MMERGE12) per form (the e-form's element id), so marketing can tell sign-ups, enquiries, exhibitors and visitors apart.
const FFE_SOURCES = [
  'ctform' => 'FFE APAC website – Contact Us',
  'axform' => 'FFE APAC website – Apply to Exhibit',
  'rfform' => 'FFE APAC website – Register to Visit',
];

// Staging = a test inbox is set and the site isn't on the live domain yet. Form emails then go to the test inbox, and only
// addresses on the test inbox's domain reach Mailchimp. Going live (home_url on www.) turns this off by itself.
function ffe_staging(): bool {
  return defined('FFE_TEST_INBOX') && wp_parse_url(home_url(), PHP_URL_HOST) !== FFE_LIVE_HOST;
}

// A posted field by the end of its element id: $form_data is keyed by element id (`${p}-f-${name}`, forms.js), not by the field's name.
// An editor who deletes and re-adds a field in Elementor gives it a random id (17 Nov: the marketing box became "b149ba4"), so the
// field's name, which Elementor posts beside it and keeps, is the fallback.
function ffe_field(array $data, string $name): string {
  foreach ($data as $k => $v) if (ffe_is($k, $name)) return is_string($v) ? trim($v) : '';
  return '';
}
function ffe_is($id, string $name): bool {
  static $names = null;
  if ($names === null) { // id => name, from the post Elementor already checked the nonce of
    $names = [];
    foreach ((array) ($_POST['form_fields'] ?? []) as $f) {
      if (is_array($f) && isset($f['id'], $f['name']) && is_string($f['id']) && is_string($f['name'])) $names[sanitize_text_field(wp_unslash($f['id']))] = sanitize_text_field(wp_unslash($f['name']));
    }
  }
  return str_ends_with((string) $id, "-f-$name") || strcasecmp($names[(string) $id] ?? '', $name) === 0;
}

/* 1. Every atomic form post, after Elementor's nonce check and before any action: honeypot, then Turnstile. Fails closed. */
add_filter('elementor_pro/atomic_forms/spam_check', function ($spam, $fields) {
  if ($spam) return true;
  // Honeypot (forms.js honeypot()): hidden from people, filled by bots.
  foreach ((array) $fields as $f)
    if (is_array($f) && str_ends_with((string) ($f['id'] ?? ''), '-f-website') && trim((string) ($f['value'] ?? '')) !== '') return true;
  // The snippet adds the widget's token to Elementor's request (it isn't one of the form's fields).
  $token = isset($_POST['cf-turnstile-response']) ? sanitize_text_field(wp_unslash($_POST['cf-turnstile-response'])) : ''; // phpcs:ignore WordPress.Security.NonceVerification
  if (!defined('FFE_TURNSTILE_SECRET') || $token === '' || strlen($token) > 2048) return true;
  $res = wp_remote_post('https://challenges.cloudflare.com/turnstile/v0/siteverify', ['timeout' => 10, 'body' => ['secret' => FFE_TURNSTILE_SECRET, 'response' => $token]]);
  $out = is_wp_error($res) ? null : json_decode(wp_remote_retrieve_body($res), true);
  // hostname: a token solved on another site that uses this widget doesn't count here.
  return empty($out['success']) || ($out['hostname'] ?? '') !== wp_parse_url(home_url(), PHP_URL_HOST);
}, 10, 2);

/* 2. Team email: Enquiry Type routing, the live site's subject ("Website enquiry: Name, Company"), staging guard. */
add_filter('elementor_pro/atomic_forms/email_headers', function ($headers, $form_data) {
  $data = (array) $form_data;
  $name = trim(ffe_field($data, 'firstname') . ' ' . ffe_field($data, 'lastname'));
  $company = ffe_field($data, 'company');
  $GLOBALS['ffe_mail'] = ['to' => FFE_TEAMS[ffe_field($data, 'team')] ?? null, 'tail' => $name . ($company !== '' ? ", $company" : '')];
  return $headers;
}, 10, 2);

// Runs right after, in the same email action; WordPress's own mail (password resets etc.) never has $GLOBALS['ffe_mail'] and is left alone.
add_filter('wp_mail', function ($args) {
  $m = $GLOBALS['ffe_mail'] ?? null;
  if (!$m) return $args;
  unset($GLOBALS['ffe_mail']);
  if ($m['to']) $args['to'] = $m['to'];
  // Visitor text in a header: collapse whitespace and cap the length (sanitize_text_field already dropped line breaks).
  if ($m['tail'] !== '') $args['subject'] = mb_substr(preg_replace('/\s+/', ' ', $args['subject'] . ': ' . $m['tail']), 0, 150);
  if (ffe_staging()) {
    $args['subject'] = '[Staging test, for ' . (is_array($args['to']) ? implode(', ', $args['to']) : $args['to']) . '] ' . $args['subject'];
    $args['to'] = FFE_TEST_INBOX;
    $h = is_array($args['headers']) ? $args['headers'] : explode("\n", (string) $args['headers']);
    $args['headers'] = array_values(array_filter($h, fn ($l) => !preg_match('/^\s*b?cc\s*:/i', (string) $l)));
  }
  return $args;
});

/* 3. All site mail through ZeptoMail SMTP, from the domain's verified sender (Elementor's default From is email@<host>, which ZeptoMail refuses). */
add_action('phpmailer_init', function ($mail) {
  if (!defined('FFE_ZEPTOMAIL_TOKEN')) return;
  $mail->isSMTP();
  $mail->Host = 'smtp.zeptomail.com';
  $mail->Port = 465;
  $mail->SMTPSecure = 'ssl';
  $mail->SMTPAuth = true;
  $mail->Username = 'emailapikey';
  $mail->Password = FFE_ZEPTOMAIL_TOKEN;
  $mail->setFrom(FFE_MAIL_FROM, 'Fresh Food Expo APAC', false);
});

/* 4. Form action "ffe-mailchimp" (forms.js form({ actions })): adds, or resubscribes and tags, the sender in the audience.
   On a form that also emails the team the email is the real job: Mailchimp runs only when the marketing box is ticked, and a
   Mailchimp failure is only logged. On sign-up forms (Mailchimp only) a failure fails the submission. */
add_action('elementor_pro/atomic_forms/actions/register', function ($runner) {
  $runner::register_action(new class extends \ElementorPro\Modules\AtomicForm\Actions\Action_Base {
    public function get_type(): string { return 'ffe-mailchimp'; }
    public function execute(array $form_data, array $widget_settings, array $context): array {
      $emails = in_array('email', (array) ($widget_settings['actions-after-submit'] ?? []), true);
      $consent = false;
      foreach ($form_data as $k => $v) if ((str_contains((string) $k, '-f-marketingconsent') || ffe_is($k, 'marketingConsent')) && $v !== '' && $v !== []) $consent = true;
      $ok = ['status' => 'success', 'message' => 'ok'];
      // The error text reaches the visitor's browser: keep it generic, details go to the PHP log.
      $fail = ['status' => 'failed', 'error' => 'Sign-up failed'];
      if (!$consent) return $emails ? $ok : $fail;
      return ffe_mailchimp($form_data, FFE_SOURCES[$context['form_id'] ?? ''] ?? 'FFE APAC website') || $emails ? $ok : $fail;
    }
  });
});

function ffe_mailchimp(array $data, string $source): bool {
  $email = sanitize_email(ffe_field($data, 'email'));
  if (!is_email($email) || !defined('FFE_MAILCHIMP_KEY') || !preg_match('/-([a-z]+\d+)$/', FFE_MAILCHIMP_KEY, $dc)) return false;
  if (ffe_staging() && strcasecmp(substr(strrchr($email, '@'), 1), substr(strrchr(FFE_TEST_INBOX, '@'), 1)) !== 0) return true;
  $f = fn ($n) => mb_substr(ffe_field($data, $n), 0, 255);
  $phone = $f('phone-n');
  preg_match('/\((\+[\d ]+)\)\s*$/', ffe_field($data, 'dial'), $dial); // "Singapore (+65)"
  $base = "https://{$dc[1]}.api.mailchimp.com/3.0/lists/" . FFE_MAILCHIMP_LIST . '/members';
  $req = fn ($url, $method, $body) => wp_remote_request($url, [
    'method' => $method, 'timeout' => 10, 'body' => wp_json_encode($body),
    'headers' => ['Authorization' => 'Basic ' . base64_encode('x:' . FFE_MAILCHIMP_KEY), 'Content-Type' => 'application/json'],
  ]);
  $res = $req($base, 'POST', [
    'email_address' => $email,
    'status' => 'subscribed',
    'tags' => [FFE_MAILCHIMP_TAG],
    // The audience's own fields: MMERGE7 Country Code, 8 Telephone Number, 10 Job Title, 11 Country, 12 Source.
    'merge_fields' => [
      'FNAME' => $f('firstname'), 'LNAME' => $f('lastname'), 'COMPANY' => $f('company'), 'MMERGE10' => $f('jobtitle'), 'MMERGE11' => $f('country'),
      // A number typed with its own "+code" wins over the picker; Register to Visit's field is `mobile`, typed with its own code.
      'MMERGE7' => $phone !== '' && $phone[0] !== '+' ? ($dial[1] ?? '') : '',
      'MMERGE8' => $phone !== '' ? $phone : $f('mobile'),
      'MMERGE12' => $source,
    ],
  ]);
  $code = (int) wp_remote_retrieve_response_code($res);
  if ($code >= 200 && $code < 300) return true;
  $err = json_decode(wp_remote_retrieve_body($res), true);
  if (($err['title'] ?? '') !== 'Member Exists') {
    error_log('FFE Mailchimp: ' . $code . ' ' . (is_wp_error($res) ? $res->get_error_code() : ($err['title'] ?? '')));
    return false;
  }
  // Already in the audience (often from another Messe Berlin event): keep their details, (re)subscribe and tag them.
  // ponytail: contacts in Mailchimp's compliance state refuse the resubscribe and stay unsubscribed; send status "pending" (a confirmation email) if that matters.
  $member = $base . '/' . md5(strtolower($email));
  $st = (int) wp_remote_retrieve_response_code($req($member, 'PATCH', ['status' => 'subscribed']));
  if ($st !== 200) error_log("FFE Mailchimp status: $st");
  $tc = (int) wp_remote_retrieve_response_code($req("$member/tags", 'POST', ['tags' => [['name' => FFE_MAILCHIMP_TAG, 'status' => 'active']]]));
  if ($tc !== 204 && $tc !== 200) { error_log("FFE Mailchimp tag: $tc"); return false; }
  return true;
}

/* 5. A question an editor hides in Elementor (Style > Layout > Display: None, on any breakpoint) is left out of the form: just before the
 * browser checks it, its fields are disabled, so they are neither required nor sent. Showing the question again brings them back. */
add_action('wp_footer', function () { ?>
<script id="ffe-form-hidden">
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('form.e-form-base [type=submit]');
  if (!b || !b.form) return;
  b.form.querySelectorAll('input, select, textarea').forEach(function (f) {
    if (f.type === 'hidden' || !(f.required || f.dataset.ffeOff || f.closest('[data-require-one]'))) return;
    // The "Other" text box is hidden until its box is ticked (site.js): judge it by its question instead.
    var off = !(f.hasAttribute('data-other-text') ? f.parentElement : f).getClientRects().length;
    if (off && !f.disabled) { f.disabled = true; f.dataset.ffeOff = '1'; }
    else if (!off && f.dataset.ffeOff) { f.disabled = false; delete f.dataset.ffeOff; }
  });
}, true); // capture: runs before the browser's own validation
</script>
<?php }, 99);

/* 6. Questions copied in Elementor: Elementor names an answer in the email by the field's aria-label, which forms.js sets to the original
 * question and a copy keeps. So each text box, select and textarea takes it from the label beside it instead, and a copy's repeated id
 * becomes unique (its label then focuses its own box). Multiple-choice questions are grouped by name and aren't covered. */
add_action('wp_footer', function () { ?>
<script id="ffe-form-labels">
document.querySelectorAll('form.e-form-base label[for]').forEach(function (l, i, all) {
  var f = l.htmlFor && l.parentElement.querySelector('#' + CSS.escape(l.htmlFor));
  if (!f || /^(radio|checkbox|hidden)$/.test(f.type)) return;
  var t = l.textContent.replace(/\s*\*\s*$/, '').trim();
  if (t) f.setAttribute('aria-label', t);
  if (document.getElementById(f.id) !== f) { f.id = l.htmlFor = f.id + '-' + i; }
});
</script>
<?php }, 99);

/* 7. Multiple-choice questions copied in Elementor (17 Nov: Ruben copied Interest Type for a Hosted Buyers question). Elementor groups
 * options by their hidden name and sends each option's hidden value, and a copy keeps both, so the copy's answers merged into the
 * original question (and the browser let a visitor pick only one option across both). On load, so the browser groups them right too:
 * every option sends the words beside it, and options whose name an earlier question already uses are renamed after their own
 * question (the nearest paragraph above them), which is also how the email labels them. */
add_action('wp_footer', function () { ?>
<script id="ffe-form-choices">
document.querySelectorAll('form.e-form-base').forEach(function (form) {
  var ps = [].filter.call(form.querySelectorAll('p'), function (p) { return !p.closest('label'); }), owner = {}, d = document.createElement('div');
  form.querySelectorAll('input[type=radio], input[type=checkbox]').forEach(function (f) {
    var n = f.name, q = '';
    // The question: the paragraph's first line (a note may follow a <br>), without the required star.
    for (var i = ps.length - 1; i >= 0; i--) if (ps[i].compareDocumentPosition(f) & Node.DOCUMENT_POSITION_FOLLOWING) { d.innerHTML = ps[i].innerHTML.split(/<br\b[^>]*>/i)[0]; q = d.textContent.replace(/[\s*]+$/, '').trim().slice(0, 120); break; }
    if (n && !(n in owner)) owner[n] = q;
    if (n && q && owner[n] !== q) f.name = q;
    // The option's own label: its row's, as a copy may repeat the original's id.
    var l = f.parentElement.querySelector('label[for="' + CSS.escape(f.id) + '"]') || f.parentElement.querySelector('label'), t = l && l.textContent.trim();
    if (t) f.value = t;
  });
});
</script>
<?php }, 99);

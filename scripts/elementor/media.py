"""Prepare the header/footer images from src/assets, upload them to staging and register them in the
media library. Writes media.json (key -> {id, url}). Idempotent: an existing file is overwritten and its
attachment reused, never duplicated.  Run: python3 scripts/elementor/media.py"""
import base64, json, os, pathlib, re, subprocess
from PIL import Image

SITE = "ffe-staging"
HERE = pathlib.Path(__file__).parent
SRC = HERE.parent.parent / "src/assets"
OUT = HERE / ".tmp/media"
DIR = "2026/10"
OUT.mkdir(parents=True, exist_ok=True)

# key: (source, output name, alt, prep). prep is a crop box, a target width, (crop box, size) with size an int width or
# a (w, h) tuple, "rot90", "compose-gw", or None (copied as is).
MEDIA = {
    # Header logo shows the right 131x90 of a 160x90 render (object-cover object-right); compact mark is the
    # Figma 318:1795 crop. Both are cut here so Elementor shows them without CSS cropping.
    "logo": ("logo.png", "ffe-logo.png", "Fresh Food Expo Asia Pacific", (116, 0, 640, 360)),
    "logo-compact": ("logo-compact.png", "ffe-logo-compact.png", "Fresh Food Expo Asia Pacific", (40, 28, 357, 197)),
    "icon-search": ("icon-search.png", "ffe-icon-search.png", "", 54),
    "icon-plus": ("icon-plus.png", "ffe-icon-plus.png", "", 90),
    # Figma chevrons are "^" glyphs turned 90 degrees; the rotation is baked into the file.
    "chevron-contact": ("chevron-contact.svg", "ffe-chevron-contact.svg", "", "rot90"),
    "chevron-lang": ("chevron-lang.svg", "ffe-chevron-lang.svg", "", None),
    "social-linkedin": ("social-linkedin.png", "ffe-social-linkedin.png", "", 87),
    "social-facebook": ("social-facebook.svg", "ffe-social-facebook.svg", "", None),
    "social-youtube": ("social-youtube.png", "ffe-social-youtube.png", "", 87),
    "social-instagram": ("social-instagram.png", "ffe-social-instagram.png", "", 87),
    "nav-about": ("about/hero.jpg", "ffe-nav-about.jpg", "", 600),
    "nav-exhibit": ("exhibit/hero.jpg", "ffe-nav-exhibit.jpg", "", 600),
    "nav-visit": ("visit/hero.jpg", "ffe-nav-visit.jpg", "", 600),
    "nav-news": ("news/media-gallery.jpg", "ffe-nav-news.jpg", "", 600),
    "partner-sfa": ("partners/sfa.png", "ffe-partner-sfa.png", "Singapore Food Agency", None),
    "partner-temasek": ("partners/temasek.png", "ffe-partner-temasek.png", "Temasek", None),
    "partner-esg": ("partners/esg.png", "ffe-partner-esg.png", "Enterprise Singapore", None),
    "partner-secb": ("partners/secb.png", "ffe-partner-secb.png", "Singapore Exhibition & Convention Bureau", None),
    "partner-messe": ("partners/messe.png", "ffe-partner-messe.png", "Messe Berlin Asia Pacific", None),
    "partner-sg": ("partners/sg.png", "ffe-partner-sg.png", "Singapore: Passion Made Possible", None),
    "partner-siaw": ("partners/siaw.png", "ffe-partner-siaw.png", "Singapore International Agri-Food Week", None),
    # Home hero (Hero.tsx, ui.tsx DateVenue / Button).
    "hero": ("hero.jpg", "ffe-hero.jpg", "", 1920),
    "hero-curve": ("hero-curve.svg", "ffe-hero-curve.svg", "", None),
    "hero-curve-mobile": ("hero-curve-mobile.svg", "ffe-hero-curve-mobile.svg", "", None),
    "slider-dots": ("slider-dots.svg", "ffe-slider-dots.svg", "", None),
    "chevron-sm-brand": ("chevron-sm-brand.svg", "ffe-chevron-sm-brand.svg", "", "rot90"),
    "chevron-sm-white": ("chevron-sm-white.svg", "ffe-chevron-sm-white.svg", "", "rot90"),
    "icon-calendar": ("icon-calendar.png", "ffe-icon-calendar.png", "", 69),
    "icon-location": ("icon-location.png", "ffe-icon-location.png", "", 69),
    "powered-fl": ("popup/fruit-logistica.png", "ffe-powered-fl.png", "Fruit Logistica", None),
    "powered-gw": ("popup/gruene-woche.png", "ffe-powered-gw.png", "Grüne Woche", None),
    # Home sections after the hero (plan.md 2.2). Crop boxes are the Figma crop() fills in source pixels, so each file is the visible frame.
    "about": ("about-hall.jpg", "ffe-about.jpg", "Visitors filling a market hall with Norwegian and Swedish stands at a Messe Berlin trade fair", ((420, 73, 1635, 997), 1215)),
    "about-curve": ("about-curve.svg", "ffe-about-curve.svg", "", None),
    "about-curve-mobile": ("about-curve-mobile.svg", "ffe-about-curve-mobile.svg", "", None),
    "chevron-accent": ("chevron-accent.svg", "ffe-chevron-accent.svg", "", "rot90"),
    "chevron-ink": ("chevron-ink.svg", "ffe-chevron-ink.svg", "", "rot90"),
    "chevron-white": ("chevron-white.svg", "ffe-chevron-white.svg", "", "rot90"),
    "chevron-black": ("chevron-black.svg", "ffe-chevron-black.svg", "", "rot90"),
    "chevron-brand": ("chevron-brand.svg", "ffe-chevron-brand.svg", "", "rot90"),
    "divider-circle": ("divider-circle.svg", "ffe-divider-circle.svg", "", None),
    "leaf": ("leaf.png", "ffe-leaf.png", "", ((284, 216, 1113, 1036), (98, 98))),
    "leaf-outline": ("leaf-outline.svg", "ffe-leaf-outline.svg", "", None),
    "icon-ring": ("icon-ring.svg", "ffe-icon-ring.svg", "", None),
    "check": ("check.svg", "ffe-check.svg", "", None),
    "flow-arrow": ("flow-arrow.png", "ffe-flow-arrow.png", "", 62),
    "eco-fresh": ("eco-fresh-food.jpg", "ffe-eco-fresh.jpg", "Crates of fresh broccoli and vegetables on display", ((1, 0, 1901, 827), 800)),
    "eco-agri": ("eco-agri-tech.jpg", "ffe-eco-agri.jpg", "Automated food-processing machine under purple light", ((26, 0, 1949, 839), 800)),
    "eco-logistics": ("eco-logistics.jpg", "ffe-eco-logistics.jpg", "Refrigerated truck being loaded with fresh produce at a cold storage facility", ((0, 25, 1672, 755), 800)),
    "icon-fresh": ("icon-fresh-food.png", "ffe-icon-fresh.png", "", 68),
    "icon-agri": ("icon-agri-tech.png", "ffe-icon-agri.png", "", 68),
    "icon-logistics": ("icon-logistics.png", "ffe-icon-logistics.png", "", 68),
    "exhibit": ("exhibit.jpg", "ffe-exhibit.jpg", "Exhibitors in conversation at a trade fair stand", 1988),
    "visit": ("visit.jpg", "ffe-visit.jpg", "Visitors walking through a busy exhibition hall", 1928),
    "visit-base": ("visit-base.jpg", "ffe-visit-base.jpg", "", 1000),
    "world-map": ("world-map.png", "ffe-world-map.png", "", 1436),
    "arrow-circle": ("arrow-circle.svg", "ffe-arrow-circle.svg", "", None),
    "show-gw": ("show-gruene-woche.jpg", "ffe-show-gw.jpg", "", 640),
    "show-fl": ("show-fruit-logistica.jpg", "ffe-show-fl.jpg", "", 640),
    "show-afl": ("show-asia-fruit-logistica.jpg", "ffe-show-afl.jpg", "", 640),
    "show-fli": ("show-fruit-logistica-india.jpg", "ffe-show-fli.jpg", "", 640),
    "logo-gw": (None, "ffe-logo-gw.svg", "", "compose-gw"),
    "logo-fl": ("logo-fruit-logistica.svg", "ffe-logo-fl.svg", "", None),
    "logo-afl": ("logo-asia-fruit-logistica.png", "ffe-logo-afl.png", "", ((0, 0, 1274, 577), (212, 96))),
    "logo-fli": ("logo-fruit-logistica-india.png", "ffe-logo-fli.png", "", ((7, 0, 1219, 675), (140, 78))),
    "join": ("join.jpg", "ffe-join.jpg", "", 1918),
    "newsletter-main": ("newsletter-main.jpg", "ffe-newsletter-main.jpg", "Exhibitors talking beside a robotics demo at a trade fair stand", ((25, 0, 1720, 1122), 1000)),
    "newsletter-small": ("newsletter-small.jpg", "ffe-newsletter-small.jpg", "Robotic arm harvesting in a greenhouse", ((25, 94, 761, 629), 480)),
    "dots": ("dots.svg", "ffe-dots.svg", "", None),
}


def run(ability, data):
    f = HERE / f".tmp/media-call-{os.getpid()}.json"
    f.write_text(json.dumps(data))
    r = subprocess.run(["novamira", "--site", SITE, "run", ability, "--yes", "--input", f"@{f}", "--json"], capture_output=True, text=True, check=True)
    j = json.loads(r.stdout)
    if not j["ok"]:
        raise SystemExit(f"{ability}: {j.get('error')}")
    return j["data"]


for key, (src, name, alt, prep) in MEDIA.items():
    dst = OUT / name
    if isinstance(prep, tuple) and isinstance(prep[0], int):
        Image.open(SRC / src).crop(prep).save(dst, optimize=True)
    elif isinstance(prep, tuple):
        # (crop box, size): crop, then resize to an int width or a (w, h) tuple.
        box, size = prep
        im = Image.open(SRC / src).crop(box)
        size = size if isinstance(size, tuple) else (size, round(im.height * size / im.width))
        im = im.resize(size, Image.LANCZOS)
        im.save(dst, quality=82, optimize=True) if name.endswith(".jpg") else im.save(dst, optimize=True)
    elif isinstance(prep, int):
        im = Image.open(SRC / src)
        im = im.resize((prep, round(im.height * prep / im.width)), Image.LANCZOS)
        im.save(dst, quality=82, optimize=True) if name.endswith(".jpg") else im.save(dst, optimize=True)
    elif prep == "compose-gw":
        # Grüne Woche lockup (Organiser.tsx): mark and wordmark side by side in one 94x30 SVG.
        inner = lambda f: re.sub(r' id="[^"]*"', "", re.search(r"<svg[^>]*>(.*)</svg>", (SRC / f).read_text(), re.S).group(1))
        dst.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="94" height="30" viewBox="0 0 94 30" fill="none"><g transform="translate(0 1.33)">{inner("logo-gruene-woche-mark.svg")}</g><g transform="translate(36.58 0)">{inner("logo-gruene-woche-text.svg")}</g></svg>')
    elif prep == "rot90":
        svg = (SRC / src).read_text()
        vb = re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg)
        w, h = vb.groups()
        paths = "".join(re.findall(r"<path[^>]*/>", svg))
        dst.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{h}" height="{w}" viewBox="0 0 {h} {w}" fill="none"><g transform="translate({h} 0) rotate(90)">{paths}</g></svg>')
    elif name.endswith(".svg"):
        # e-svg rewrites the root fill to currentColor, so an unfilled path (line art) has to say so itself.
        svg = (SRC / src).read_text()
        if re.search(r'<svg[^>]*\bfill="none"', svg):
            svg = re.sub(r"<(path|circle)(?![^>]*\bfill=)", r'<\1 fill="none"', svg)
        dst.write_text(svg)
    else:
        dst.write_bytes((SRC / src).read_bytes())
    link = run("novamira/create-upload-link", {"path": f"wp-content/uploads/{DIR}/{name}", "overwrite": True})
    subprocess.run(["curl", "-sSf", "-X", "PUT", "-H", f"{link['token_header']}: {link['upload_token']}", "--data-binary", f"@{dst}", link["upload_url"]], check=True, capture_output=True)
    print(".", end="", flush=True)

# One PHP round-trip registers the lot. SVGs get an attachment too, so they show in the media library.
rows = [[k, f"{DIR}/{v[1]}", v[2]] for k, v in MEDIA.items()]
code = f"""
require_once ABSPATH.'wp-admin/includes/image.php';
$up = wp_upload_dir(); $out = [];
foreach (json_decode(base64_decode('{base64.b64encode(json.dumps(rows).encode()).decode()}'), true) as [$key, $rel, $alt]) {{
  $abs = $up['basedir'].'/'.$rel;
  $ex = get_posts(['post_type'=>'attachment','numberposts'=>1,'post_status'=>'any','meta_key'=>'_wp_attached_file','meta_value'=>$rel]);
  $id = $ex ? $ex[0]->ID : wp_insert_attachment(['post_mime_type'=>wp_check_filetype($abs, ['svg'=>'image/svg+xml'] + get_allowed_mime_types())['type'],
    'post_title'=>pathinfo($rel, PATHINFO_FILENAME), 'post_status'=>'inherit'], $abs);
  if (!str_ends_with($rel, '.svg')) wp_update_attachment_metadata($id, wp_generate_attachment_metadata($id, $abs));
  update_post_meta($id, '_wp_attachment_image_alt', $alt);
  $out[$key] = ['id'=>$id, 'url'=>wp_get_attachment_url($id)];
}}
return $out;
"""
res = run("novamira/execute-php", {"code": code})
res = res["return_value"]
(HERE / "media.json").write_text(json.dumps(res, indent=1) + "\n")
print("\nregistered", len(res))

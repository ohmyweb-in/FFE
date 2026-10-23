# G3 media (ecosystem, siaw, messe-berlin). Keys g3-*, files ffe-g3-*. Format as media.py: key: (source, output, alt, prep).
# e-svg's sanitizer empties <filter> (the fe* primitives are dropped), and an empty filter hides the shape. ring.svg's 5% drop shadow
# moves to page CSS (ecosystem/siaw index.js); the file is cut here, without the filter, from a scratch copy.
import pathlib, re
_here = pathlib.Path(__file__).resolve().parent.parent
_ring = pathlib.Path(__file__).resolve().parents[3] / "src/assets/siaw/ring.svg"
(_here / ".tmp").mkdir(exist_ok=True)
(_here / ".tmp/g3-ring.svg").write_text(re.sub(r"<defs>.*?</defs>", "", re.sub(r' filter="url\(#[^)]*\)"', "", _ring.read_text()), flags=re.S))
MEDIA = {
    # Ecosystem Intro: 362×300 frame, cover + object-left (Figma fill 135.91% wide from the left edge).
    "g3-fruit-cups": ("ecosystem/fruit-cups.jpg", "ffe-g3-fruit-cups.jpg", "Cups of cut kiwi, pineapple and strawberries on a chilled shelf", ((0, 0, 1327, 1100), 724)),
    "g3-dots": ("ecosystem/dots.svg", "ffe-g3-dots.svg", "", None),
    # OnePlatform + OurRole cards (frames change ratio per breakpoint: object-position, no crop).
    "g3-card-fresh": ("siaw/card-fresh.jpg", "ffe-g3-card-fresh.jpg", "Worker sorting fresh vegetables at a packing station", 1040),
    "g3-card-agri": ("siaw/card-agri.jpg", "ffe-g3-card-agri.jpg", "Robotic arm tending leafy greens in a vertical farm", 1040),
    "g3-card-logistics": ("eco-logistics.jpg", "ffe-g3-card-logistics.jpg", "Refrigerated truck being loaded with fresh produce at a cold storage facility", 1040),
    "g3-ring": ("../../scripts/elementor/.tmp/g3-ring.svg", "ffe-g3-ring.svg", "", None),
    "g3-arrow": ("siaw/arrow.svg", "ffe-g3-arrow.svg", "", None),
    "g3-leaf": ("ecosystem/leaf.svg", "ffe-g3-leaf.svg", "", None),
    # Sectors.
    "g3-sprig": ("ecosystem/leaf-sprig.png", "ffe-g3-sprig.png", "", None),
    "g3-icon-sprout": ("ecosystem/icon-sprout.svg", "ffe-g3-icon-sprout.svg", "", None),
    "g3-icon-gear": ("ecosystem/icon-gear.svg", "ffe-g3-icon-gear.svg", "", None),
    "g3-icon-truck": ("ecosystem/icon-truck.svg", "ffe-g3-icon-truck.svg", "", None),
    # 96×78 thumbs: the small sources are already ~1.23:1 (copied as is); fruit-veg is 3:2, centre-cropped to 96:78.
    "g3-sec-fruit-veg": ("ecosystem/sectors/fruit-veg.jpg", "ffe-g3-sec-fruit-veg.jpg", "Fresh vegetables and fruit on a wooden table", ((138, 0, 1398, 1024), 192)),
    "g3-sec-meat": ("ecosystem/sectors/meat.jpg", "ffe-g3-sec-meat.jpg", "Raw beef steaks and chicken breasts", None),
    "g3-sec-seafood": ("ecosystem/sectors/seafood.jpg", "ffe-g3-sec-seafood.jpg", "Fresh fish, salmon and prawns on ice", None),
    "g3-sec-eggs": ("ecosystem/sectors/eggs.jpg", "ffe-g3-sec-eggs.jpg", "Milk bottle, eggs and cheese", None),
    "g3-sec-agritech": ("ecosystem/sectors/agritech.jpg", "ffe-g3-sec-agritech.jpg", "Sensor camera above greenhouse lettuce", None),
    "g3-sec-cooling": ("ecosystem/sectors/cooling.jpg", "ffe-g3-sec-cooling.jpg", "Industrial refrigeration condenser units", None),
    "g3-sec-preservation": ("ecosystem/sectors/preservation.jpg", "ffe-g3-sec-preservation.jpg", "Apples being washed on a processing line", None),
    "g3-sec-packaging": ("ecosystem/sectors/packaging.jpg", "ffe-g3-sec-packaging.jpg", "Salads in sustainable food containers", None),
    "g3-sec-transport": ("ecosystem/sectors/transport.jpg", "ffe-g3-sec-transport.jpg", "Refrigerated truck on a road", None),
    "g3-sec-cold-chain": ("ecosystem/sectors/cold-chain.jpg", "ffe-g3-sec-cold-chain.jpg", "Pallets of produce in a refrigerated container", None),
    "g3-sec-warehousing": ("ecosystem/sectors/warehousing.jpg", "ffe-g3-sec-warehousing.jpg", "Aisle of a cold storage warehouse", None),
    "g3-sec-supply-chain": ("ecosystem/sectors/supply-chain.jpg", "ffe-g3-sec-supply-chain.jpg", "Tablet showing a supply chain map", None),
    # Connects collage: 362×300 robotics (object-left, fill 140.63% wide) and 210×190 robot arm (fill 159.26% tall at −9.31% → 15.7% down).
    "g3-robotics": ("ecosystem/robotics.jpg", "ffe-g3-robotics.jpg", "Exhibitors talking beside a robotics demo stand", ((0, 0, 1354, 1122), 724)),
    "g3-robot-arm": ("ecosystem/robot-arm.jpg", "ffe-g3-robot-arm.jpg", "Robot arm picking tomatoes from a green wall", ((0, 64, 762, 753), 420)),
    "g3-arrow-sm": ("ecosystem/arrow-sm.svg", "ffe-g3-arrow-sm.svg", "", None),
    "g3-step-sprout": ("ecosystem/step-sprout.svg", "ffe-g3-step-sprout.svg", "", None),
    "g3-step-factory": ("ecosystem/step-factory.svg", "ffe-g3-step-factory.svg", "", None),
    "g3-step-box": ("ecosystem/step-box.svg", "ffe-g3-step-box.svg", "", None),
    "g3-step-warehouse": ("ecosystem/step-warehouse.svg", "ffe-g3-step-warehouse.svg", "", None),
    "g3-step-cart": ("ecosystem/step-cart.svg", "ffe-g3-step-cart.svg", "", None),
    # SIAW BiggerPicture (595px portrait source; frame crop varies → object-position 50% 74%).
    "g3-tomatoes": ("siaw/tomatoes.jpg", "ffe-g3-tomatoes.jpg", "Vine tomatoes moving along a blue conveyor in a packing line", None),
    # SIAW BroaderImpact: xl collage frame 526.88×424.43, cover right-aligned (fill 137.48% wide at −37.54%); below xl the full photo, centred.
    "g3-venue-xl": ("siaw/venue.jpg", "ffe-g3-venue-xl.jpg", "", ((520, 0, 1908, 1118), 1054)),
    "g3-venue": ("siaw/venue.jpg", "ffe-g3-venue.jpg", "", 1600),
    # Messe Berlin: 570×386 photo frame (cover, centred), logo overlay, line-art curve.
    "g3-messe": ("about/messe.jpg", "ffe-g3-messe.jpg", "Berlin Funkturm and the Messe Berlin exhibition grounds at dusk", ((48, 0, 2105, 1393), 1140)),
    "g3-messe-logo": ("about/messe-logo.png", "ffe-g3-messe-logo.png", "Messe Berlin", None),
    "g3-messe-curve": ("messe/curve.svg", "ffe-g3-messe-curve.svg", "", None),
    # Portfolio logos (125px circles; fills as in Sections.tsx LOGOS).
    "g3-pf-smart-health": ("messe/smart-health-asia.png", "ffe-g3-pf-smart-health.png", "Smart Health Asia", None),
    "g3-pf-itb-asia": ("messe/itb-asia.png", "ffe-g3-pf-itb-asia.png", "ITB Asia", None),
    "g3-pf-itb-india": ("messe/itb-india.png", "ffe-g3-pf-itb-india.png", "ITB India", 400),
    "g3-pf-mice": ("messe/mice-show-asia.png", "ffe-g3-pf-mice.png", "MICE Show Asia", 300),
    "g3-pf-travel-tech": ("messe/travel-tech-asia.png", "ffe-g3-pf-travel-tech.png", "Travel Tech Asia", None),
    "g3-pf-travel-meet": ("logo-travel-meet-asia.png", "ffe-g3-pf-travel-meet.png", "Travel Meet Asia", 300),
}

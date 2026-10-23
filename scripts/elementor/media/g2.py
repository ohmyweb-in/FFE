# G2 media (why-exhibit, why-visit, who-should-exhibit, who-should-visit). Same tuple format as media.py: key: (source, output, alt, prep).
MEDIA = {
    # Photos
    "g2-ex-buyer-meeting": ("exhibit/buyer-meeting.jpg", "ffe-g2-ex-buyer-meeting.jpg", "Journalists interviewing a speaker on the show floor", ((450, 0, 1568, 1118), 720)),
    "g2-ex-stand-chat": ("exhibit/stand-chat.jpg", "ffe-g2-ex-stand-chat.jpg", "Two visitors talking at an exhibitor stand", 700),
    "g2-ex-branding": ("exhibit/branding.jpg", "ffe-g2-ex-branding.jpg", "Two visitors at a vertical-farming stand", ((0, 113, 1834, 1061), 1200)),
    "g2-card-fresh": ("siaw/card-fresh.jpg", "ffe-g2-card-fresh.jpg", "Worker sorting fresh vegetables at a packing station", 1400),
    "g2-card-agri": ("siaw/card-agri.jpg", "ffe-g2-card-agri.jpg", "Robotic arm tending leafy greens in a vertical farm", 1400),
    "g2-eco-logistics": ("eco-logistics.jpg", "ffe-g2-eco-logistics.jpg", "Refrigerated truck being loaded with fresh produce at a cold storage facility", 1400),
    "g2-why-tech": ("why/tech-packing.jpg", "ffe-g2-why-tech.jpg", "Packaged fresh chicken moving along a packing line conveyor", 1976),
    "g2-why-networking": ("why/networking.jpg", "ffe-g2-why-networking.jpg", "Two visitors talking on the exhibition floor", 1744),
    "g2-who-tech": ("who/tech-processing.jpg", "ffe-g2-who-tech.jpg", "Workers in protective clothing on a food-processing line", 1400),
    "g2-visit-buyers": ("visit/buyers.jpg", "ffe-g2-visit-buyers.jpg", "Buyers meeting exhibitors at a stand", 1600),
    "g2-visit-retail": ("visit/retail.jpg", "ffe-g2-visit-retail.jpg", "Busy exhibition aisle with retail buyers at a produce stand", 1600),
    "g2-visit-foodservice": ("visit/foodservice.jpg", "ffe-g2-visit-foodservice.jpg", "Visitors sampling products at a fresh herbs stand", 1600),
    "g2-visit-logistics": ("visit/logistics.jpg", "ffe-g2-visit-logistics.jpg", "Packaged fresh vegetables in a display crate", 1600),
    # Line-art icons and the Showcase leaf (prep None: media.py's fill="none" fix keeps them unfilled under e-svg)
    **{f"g2-ex-b-{n}": (f"exhibit/b-{n}.svg", f"ffe-g2-ex-b-{n}.svg", "", None) for n in ["ship", "truck", "store", "cart", "utensils", "users", "globe", "monitor"]},
    **{f"g2-ex-g-{n}": (f"exhibit/g-{n}.svg", f"ffe-g2-ex-g-{n}.svg", "", None) for n in ["users", "chart", "handshake", "megaphone"]},
    "g2-ex-leaf": ("exhibit/leaf.svg", "ffe-g2-ex-leaf.svg", "", None),
    **{f"g2-eco-icon-{n}": (f"ecosystem/icon-{n}.svg", f"ffe-g2-eco-icon-{n}.svg", "", None) for n in ["sprout", "gear", "truck"]},
    **{f"g2-why-i-{n}": (f"why/i-{n}.svg", f"ffe-g2-why-i-{n}.svg", "", None) for n in ["apple", "meat", "fish", "milk", "network", "truck", "ship", "layers"]},
    **{f"g2-who-{n}": (f"who/{n}.svg", f"ffe-g2-who-{n}.svg", "", None) for n in
       ["f-basket", "f-apple", "f-meat", "f-fish", "f-milk", "t-gear", "t-thermo", "t-snow", "t-box", "t-warehouse", "t-leaf", "l-truck", "l-plane", "l-snow", "l-network"]},
    **{f"g2-visit-i-{n}": (f"visit/i-{n}.svg", f"ffe-g2-visit-i-{n}.svg", "", None) for n in ["store", "chef", "box"]},
    "g2-prog-s-users": ("programme/s-users.svg", "ffe-g2-prog-s-users.svg", "", None),
}

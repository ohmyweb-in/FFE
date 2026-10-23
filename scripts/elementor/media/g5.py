# Media for Build G5 (apply-to-exhibit, register-to-visit, register-to-visit/form). Run: python3 scripts/elementor/media.py g5
MEDIA = {
    # Enquiry "Why Exhibit" icons (34x34, in the 68px mint circles).
    "g5-i-users":     ("apply/i-users.svg",       "ffe-g5-i-users.svg",     "", None),
    "g5-i-chart":     ("apply/i-chart.svg",       "ffe-g5-i-chart.svg",     "", None),
    "g5-i-globe":     ("apply/i-globe.svg",       "ffe-g5-i-globe.svg",     "", None),
    "g5-i-megaphone": ("apply/i-megaphone.svg",   "ffe-g5-i-megaphone.svg", "", None),
    # Dark 24px calendar / pin (Enquiry Event Details, VisitorForm head).
    "g5-icon-cal":    ("apply/icon-calendar.svg", "ffe-g5-icon-cal.svg",    "", None),
    "g5-icon-pin":    ("apply/icon-pin.svg",      "ffe-g5-icon-pin.svg",    "", None),
    # Enquiry aside dots (75x75).
    "g5-dots":        ("contact/dots.svg",        "ffe-g5-dots.svg",        "", None),
    # Enquiry collage photo: 360x290 object-cover box over a 1986x1122 source = centre crop 1393x1122, at 2x.
    "g5-produce":     ("about/produce.jpg",       "ffe-g5-produce.jpg",     "", ((297, 0, 1690, 1122), 720)),
    # StayUpToDate benefit icons (28x28) and the leaf.
    "g5-r-bell":      ("register/i-bell.svg",      "ffe-g5-r-bell.svg",      "", None),
    "g5-r-megaphone": ("register/i-megaphone.svg", "ffe-g5-r-megaphone.svg", "", None),
    "g5-r-users":     ("register/i-users.svg",     "ffe-g5-r-users.svg",     "", None),
    "g5-r-news":      ("register/i-news.svg",      "ffe-g5-r-news.svg",      "", None),
    "g5-r-info":      ("register/i-info.svg",      "ffe-g5-r-info.svg",      "", None),
    "g5-r-leaf":      ("register/leaf.svg",        "ffe-g5-r-leaf.svg",      "", None),
}

# G4 media (contact, subscribe, news, plan-your-visit). Keys g4-*, files ffe-g4-*.
MEDIA = {
    # HelpCards / Subscribe benefits / MediaEnquiries icons (512px PNGs drawn at 24–42px; 2x of the largest use).
    "g4-help-general": ("contact/help-general.png", "ffe-g4-help-general.png", "", 84),
    "g4-help-exhibition": ("contact/help-exhibition.png", "ffe-g4-help-exhibition.png", "", 84),
    "g4-help-sponsorship": ("contact/help-sponsorship.png", "ffe-g4-help-sponsorship.png", "", 84),
    "g4-point-3": ("about/point-3.png", "ffe-g4-point-3.png", "", 84),           # HelpCards card 4 (42) + Subscribe "Networking" (36)
    "g4-point-2": ("about/point-2.png", "ffe-g4-point-2.png", "", 64),           # Subscribe "New exhibitors" (31) + MediaEnquiries (31 / 24)
    "g4-point-4": ("about/point-4.png", "ffe-g4-point-4.png", "", 72),           # Subscribe "Industry news" (36)
    "g4-b-programme": ("subscribe/b-programme.png", "ffe-g4-b-programme.png", "", 64),
    # SendMessage
    "g4-icon-mail": ("contact/icon-mail.svg", "ffe-g4-icon-mail.svg", "", None),
    "g4-dots-75": ("contact/dots.svg", "ffe-g4-dots-75.svg", "", None),
    "g4-produce": ("about/produce.jpg", "ffe-g4-produce.jpg", "", ((297, 0, 1689, 1122), 720)),   # 360×290 object-cover crop, fixed at every width
    # UsefulResources
    "g4-icon-calendar-26": ("contact/icon-calendar.svg", "ffe-g4-icon-calendar-26.svg", "", None),
    "g4-icon-users": ("contact/icon-users.svg", "ffe-g4-icon-users.svg", "", None),
    "g4-icon-file": ("contact/icon-file.svg", "ffe-g4-icon-file.svg", "", None),
    "g4-icon-chevron-right": ("contact/icon-chevron-right.svg", "ffe-g4-icon-chevron-right.svg", "", None),
    # JoinPanel
    "g4-leaf-contact": ("contact/leaf.svg", "ffe-g4-leaf-contact.svg", "", None),
    "g4-chevron-sm-accent": ("contact/chevron-sm-accent.svg", "ffe-g4-chevron-sm-accent.svg", "", "rot90"),
    # Subscribe
    "g4-card": ("subscribe/card.jpg", "ffe-g4-card.jpg", "Exhibitors in conversation at a digital crop-monitoring stand", 1280),  # crop varies per breakpoint: cover
    "g4-sb-dots": ("subscribe/dots.svg", "ffe-g4-sb-dots.svg", "", None),
    "g4-sb-leaf": ("subscribe/leaf.svg", "ffe-g4-sb-leaf.svg", "", None),
    # News StayUpdated
    "g4-sprig": ("news/leaf-sprig.png", "ffe-g4-sprig.png", "", 186),
    "g4-news-dots": ("news/dots.svg", "ffe-g4-news-dots.svg", "", None),
    # Plan Venue / Resources / WhereToStay
    "g4-pin": ("apply/icon-pin.svg", "ffe-g4-pin.svg", "", None),               # differs from exhibit/icon-pin.svg (icon-pin-24)
    "g4-plan-leaf": ("plan/leaf.svg", "ffe-g4-plan-leaf.svg", "", None),
    # Resource photos: the box keeps aspect 294/164 (inner 292×162 ≈ 1.80) at every width, so the Figma fill is pre-cut and shown with cover.
    "g4-res-visa": ("plan/visa.jpg", "ffe-g4-res-visa.jpg", "The Merlion and Marina Bay skyline", ((0, 61, 1668, 986), 800)),        # object-[50%_32.2%]
    "g4-res-mbs": ("plan/mbs-privileges.jpg", "ffe-g4-res-mbs.jpg", "Marina Bay Sands and the ArtScience Museum at dusk", ((217, 112, 1711, 945), 800)),  # crop(140.67,132.93,-14.49,-13.41)
    "g4-res-tips": ("plan/tips.jpg", "ffe-g4-res-tips.jpg", "Supertree Grove at Gardens by the Bay at night", ((0, 0, 1340, 743), 800)),  # object-top
    "g4-res-singapore": ("plan/visit-singapore.jpg", "ffe-g4-res-singapore.jpg", "Colourful shophouses in Chinatown, Singapore", ((0, 81, 1552, 943), 800)),  # cover centre
    # Hotel photos: the box ratio changes per breakpoint (331×220, 409×220, 338×200), so object-fit cover on the native file.
    "g4-hotel-mbs": ("plan/hotel-mbs.jpg", "ffe-g4-hotel-mbs.jpg", "Marina Bay Sands and the ArtScience Museum reflected in the bay at night", 960),
    "g4-hotel-cbd": ("plan/hotel-cbd.jpg", "ffe-g4-hotel-cbd.jpg", "Singapore city skyline across Marina Bay at dusk", None),  # only 331×220 in the repo
}

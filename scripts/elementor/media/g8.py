# G8 media (Gallery, 26 Oct): the Partner Event Launch Signing Ceremony album, the same files as src/assets/gallery (1600px + 800px thumbs, already optimised, copied as is).
D = "gallery/partner-event-launch-signing-ceremony"
ALT = [
    "Guests give a thumbs-up in front of the Partner Event Launch Signing Ceremony backdrop",
    "Signatories at the table during the Partner Event Launch Signing Ceremony",
    "Signing the partner agreement at the Fresh Food Expo Asia Pacific Partner Event Launch",
]
MEDIA = {}
for n, alt in enumerate(ALT, 1):
    MEDIA[f"g8-signing-{n}"] = (f"{D}/signing-{n}.jpg", f"ffe-g8-signing-{n}.jpg", alt, None)
    MEDIA[f"g8-signing-{n}-thumb"] = (f"{D}/signing-{n}-thumb.jpg", f"ffe-g8-signing-{n}-thumb.jpg", alt, None)

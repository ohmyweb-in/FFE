# G7 media (client changes, 26 Oct). Keys g7-*, files ffe-g7-*. Format as media.py: key: (source, output, alt, prep).
MEDIA = {
    # Ecosystem One Platform Agri card (OnePlatform.tsx, ecosystem/card-agri.jpg); SIAW keeps g3-card-agri.
    "g7-eco-agri": ("ecosystem/card-agri.jpg", "ffe-g7-eco-agri.jpg", "Robotic arm tending leafy greens in a vertical farm", 1040),
}
# Social share image (Open Graph / X card, 1200x630; the Next.js build had none): the top of the launch poster, logo, headline and dates.
MEDIA["g7-og"] = ("popup-poster.jpg", "ffe-g7-og.jpg", "Fresh Food Expo Asia Pacific, 16-18 November 2027, Sands Expo & Convention Centre, Singapore", ((0, 0, 1282, 673), (1200, 630)))

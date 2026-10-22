import type { Metadata, Viewport } from "next";
import { Fredoka, Outfit } from "next/font/google";
import "./globals.css";
import LaunchPopup from "@/components/LaunchPopup";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh Food Expo Asia Pacific (FFE APAC) | Asia Pacific's Premier Trade Fair for Fresh Food",
  description:
    "Connecting Fresh Food, Technology, Logistics & Distribution from Farm to Fork. 16-18 Nov. 2027, Sands Expo & Convention Centre, Singapore.",
};

export const viewport: Viewport = { themeColor: "#f4f8f4" };

// Runs before paint: marks JS as available so scroll-reveal styles only hide
// content when the observer can actually reveal it. If the observer hasn’t
// booted within 3s (script error, blocked JS), the class is removed again.
const revealBoot = `document.documentElement.classList.add('js');setTimeout(function(){if(!window.__revealReady)document.documentElement.classList.remove('js')},3000);`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} ${fredoka.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
      </head>
      <body>
        {children}
        <LaunchPopup />
      </body>
    </html>
  );
}

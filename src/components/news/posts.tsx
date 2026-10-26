import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import signing from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-2.jpg";
import signingThumb from "@/assets/gallery/partner-event-launch-signing-ceremony/signing-2-thumb.jpg";

export type Post = {
  slug: string;
  title: string;
  /** <title> and meta description (≤ 60 / 160 chars, as Rank Math on staging). */
  seo: [string, string];
  standfirst: string;
  excerpt: string;
  /** ISO date for <time>; `date` is how it reads on the page. */
  iso: string;
  date: string;
  category: string;
  img: StaticImageData;
  thumb: StaticImageData;
  alt: string;
  caption: ReactNode;
  body: ReactNode;
};

const GALLERY = "/gallery/partner-event-launch-signing-ceremony/";

/** Quote with its speaker (press release "X, title, said:" lines). */
function Quote({ name, role, children }: { name: string; role: string; children: ReactNode }) {
  return (
    <figure className="my-[36px] rounded-[22px] border-l-[5px] border-accent bg-white px-[24px] py-[26px] md:px-[36px] md:py-[32px]">
      <blockquote className="font-display text-[19px] leading-[29px] font-medium text-forest md:text-[21px] md:leading-[32px]">{children}</blockquote>
      <figcaption className="mt-[18px] text-[15px] leading-[22px] text-body">
        <span className="font-semibold text-forest">{name}</span>, {role}
      </figcaption>
    </figure>
  );
}

// Messe Berlin press release "Final 20261022" (PDF from the client, 26 Oct 2026), verbatim apart from the top banner.
export const POSTS: Post[] = [
  {
    slug: "messe-berlin-launches-fresh-food-expo-asia-pacific",
    title: "Messe Berlin launches Fresh Food Expo Asia Pacific in Singapore",
    seo: [
      "Messe Berlin launches Fresh Food Expo APAC in Singapore",
      "New B2B trade show for the fresh food industry: Fresh Food Expo Asia Pacific, 16–18 Nov 2027, Sands Expo, Singapore. Part of SIAW from 2027.",
    ],
    standfirst: "New international B2B trade show for the fresh food industry to join Singapore International Agri-Food Week from 2027",
    excerpt:
      "Messe Berlin today announced the launch of Fresh Food Expo Asia Pacific (FFE APAC), a new international B2B trade show bringing together the broader fresh food value chain across Asia Pacific.",
    iso: "2026-10-27",
    date: "27 OCT 2026",
    category: "Press Release",
    img: signing,
    thumb: signingThumb,
    alt: "Katrina Leung of Messe Berlin and Poh Chi Chuan of the Singapore Tourism Board sign the agreement at the Partner Event Launch Signing Ceremony",
    caption: (
      <>
        <strong>Seated, from left:</strong> Katrina Leung, Managing Director and Vice President Asia Pacific, Messe Berlin; and Poh Chi Chuan, Executive Director,
        Exhibitions and Conferences, Singapore Tourism Board. <strong>Standing, from left:</strong> Leong Der Yao, Deputy Chief Executive Officer (Corporate, Industry &amp;
        Technology), Singapore Food Agency; Ralph Graichen, Corporate Advisor, Temasek; and Jeannie Lim, Assistant Managing Director, Services &amp; Growth Enterprises,
        Enterprise Singapore.
      </>
    ),
    body: (
      <>
        <p>
          <em>Singapore, 27 October 2026</em> – Building on its global expertise in fresh produce, food and agriculture,{" "}
          <strong>Messe Berlin today announced the launch of Fresh Food Expo Asia Pacific (FFE APAC)</strong>, a new international B2B trade show bringing together the
          broader fresh food value chain across Asia Pacific.
        </p>
        <p>
          The inaugural FFE APAC will take place from <strong>16–18 November 2027 at Sands Expo &amp; Convention Centre, Singapore</strong>. The event will bring together the
          industry across three core sectors: <strong>Fresh Food, Agri &amp; Fresh Technology,</strong> and <strong>Logistics &amp; Distribution</strong>.
        </p>
        <p>
          FFE APAC builds on the international networks and industry expertise Messe Berlin has developed through events including FRUIT LOGISTICA in Berlin, the world’s
          leading trade show for the global fresh produce business, and Grüne Woche (Green Week), one of the world’s most established events for food, agriculture and
          horticulture.
        </p>
        <p>
          The launch was marked by a ceremony between Messe Berlin and the Singapore Tourism Board (STB), reflecting their continued cooperation in bringing international
          business events to Singapore. Fresh Food Expo Asia Pacific will be supported by the Singapore Food Agency (SFA), Temasek and Enterprise Singapore (EnterpriseSG) and
          will form part of Singapore International Agri-Food Week (SIAW) from 2027, following Messe Berlin’s formal inclusion in the SIAW Memorandum of Understanding (MOU).
        </p>

        <h2>A new international trade show for the fresh food value chain</h2>
        <p>
          Asia Pacific’s food industry is undergoing significant transformation, driven by food security priorities, changing consumer demand, technological innovation,
          sustainability requirements and the need for more resilient supply chains.
        </p>
        <p>
          FFE APAC will address these developments by providing a dedicated international business platform connecting producers, suppliers, buyers, distributors, retailers,
          foodservice companies, technology providers, logistics specialists, investors and other industry stakeholders from across Asia Pacific and around the world.
        </p>
        <p>The trade show will focus on three core sectors:</p>
        <ul>
          <li>
            <strong>Fresh Food</strong> – products spanning fresh produce, meat and poultry, seafood, dairy and more.
          </li>
          <li>
            <strong>Agri &amp; Fresh Technology</strong> – technologies and innovations spanning on-farm production, cold chain and ripening, freshness and shelf life, and
            processing and packaging.
          </li>
          <li>
            <strong>Logistics &amp; Distribution</strong> – services and solutions spanning air, land and sea freight, customs clearance, ports and warehousing, cold chain
            management, supply chain tracking, wholesale markets and distribution.
          </li>
        </ul>
        <p>
          Through its exhibition, business matching, industry content and international network, FFE APAC will connect companies with buyers, partners and business
          opportunities across the region.
        </p>
        <Quote name="Dr Mario Tobias" role="CEO of Messe Berlin">
          “Fresh Food Expo Asia Pacific marks an important next step for Messe Berlin’s Global Food Portfolio. We are taking the international networks and industry expertise
          we have built over many years and extending them into new segments of the fresh food industry. FFE APAC will bring different parts of the value chain together –
          from producers and buyers to technology and logistics providers – and create new opportunities for business across Asia Pacific. Our ambition is to develop a strong
          international meeting place that responds to the specific needs and opportunities of this dynamic market.”
        </Quote>

        <h2>Singapore as a gateway to Asia Pacific’s fresh food industry</h2>
        <p>
          Singapore’s position as an international business, trade and logistics hub, combined with its connectivity across Asia Pacific and its focus on food security,
          innovation and international partnerships, provides a strong foundation for FFE APAC as an international trade show serving the fresh food industry across Asia
          Pacific.
        </p>
        <p>
          FFE APAC will bring together industry, government, investors, innovators and international stakeholders, creating opportunities for business collaboration, trade,
          investment and innovation across the fresh food value chain.
        </p>
        <Quote name="Poh Chi Chuan" role="Executive Director, Exhibitions and Conferences, Singapore Tourism Board">
          “We are delighted to see Messe Berlin’s presence in Singapore grow from strength to strength. The launch of Fresh Food Expo Asia Pacific is a testament to
          Singapore’s reputation as a Global-Asia node for business — a place where global industries, thought leaders, decision-makers, and innovators converge to shape the
          future. We remain steadfast in our commitment to support Messe Berlin’s continued growth in Singapore, as we work towards our Tourism 2040 ambition to triple MICE
          tourism receipts and strengthen Singapore’s position as the World’s Best MICE City.”
        </Quote>
        <Quote name="Leong Der Yao" role="Deputy Chief Executive Officer (Corporate, Industry & Technology), Singapore Food Agency">
          “Resilient fresh food supply chains are increasingly important amid global challenges such as climate change and geopolitical developments. Fresh Food Expo Asia
          Pacific will provide a valuable platform for regulators and industry stakeholders to exchange ideas, explore innovative solutions, and forge partnerships that can
          strengthen food supply resilience.”
        </Quote>
        <Quote name="Jeannie Lim" role="Assistant Managing Director, Services & Growth Enterprises, Enterprise Singapore">
          “Asia Pacific’s agrifood sector presents significant growth opportunities for Singapore companies and international businesses. Fresh Food Expo Asia Pacific
          reinforces Singapore’s role as a trusted, neutral business and trading hub, underpinned by strong logistics capabilities and regional connectivity. We look forward to
          partnering with Messe Berlin to connect local businesses with global and regional businesses to explore innovation and investment opportunities across Asia Pacific,
          facilitating market access and expansion into the region.”
        </Quote>

        <h2>Building on Messe Berlin’s Global Food Portfolio</h2>
        <p>
          Fresh Food Expo is a new international Messe Berlin brand created to address the broader fresh food value chain, with FFE APAC as its Asia Pacific edition.
        </p>
        <p>
          The new brand complements Messe Berlin’s existing Global Food Portfolio. This includes FRUIT LOGISTICA in Berlin, the global meeting place for the fresh produce
          business; ASIA FRUIT LOGISTICA in Hong Kong, Asia’s leading international trade show for the fresh produce business; and the new FRUIT LOGISTICA Connect series,
          which brings the FRUIT LOGISTICA network and expertise into selected international markets, including FRUIT LOGISTICA Connect India in Mumbai from 2028. The
          portfolio also draws on Messe Berlin’s century of experience through Grüne Woche (Green Week) in Berlin, one of the world’s most established events for food,
          agriculture and horticulture.
        </p>
        <p>
          While FRUIT LOGISTICA remains focused on the global fresh produce business, Fresh Food Expo expands into additional fresh food categories and the technologies,
          infrastructure and services supporting their production, distribution and trade.
        </p>
        <p>
          FFE APAC will apply this broader concept to the specific market needs and opportunities of the Asia Pacific region, with the ambition of establishing a leading
          international trade show connecting the region’s fresh food industry with global markets.
        </p>
      </>
    ),
  },
];

export const PHOTOS_HREF = GALLERY;

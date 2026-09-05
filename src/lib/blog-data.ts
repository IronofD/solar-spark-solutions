export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  description: string;
  content: { heading?: string; paragraphs: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "solar-panel-cost-kerala-2026",
    title: "Solar Panel Installation Cost in Kerala (2026 Guide)",
    excerpt:
      "What does rooftop solar actually cost in Kerala in 2026? A clear breakdown of per-kW pricing, subsidies, and payback periods for homes and businesses.",
    date: "2026-08-20",
    readTime: "6 min read",
    category: "Pricing",
    description:
      "Solar panel installation cost in Kerala explained: per-kW pricing, PM Surya Ghar subsidy, KSEB net metering, and typical payback periods for 2026.",
    content: [
      {
        paragraphs: [
          "The most common question we hear at Java Solar Solutions is simple: how much does solar cost in Kerala? The honest answer depends on your roof size, your monthly KSEB bill, and the system capacity you choose — but there are reliable ranges you can plan around.",
        ],
      },
      {
        heading: "Typical per-kW pricing in Kerala",
        paragraphs: [
          "For a quality on-grid rooftop system using Tier-1 panels and a proven inverter, most Kerala homes pay in the range of ₹45,000 to ₹60,000 per kW installed, before subsidy. A typical 3 kW home system therefore lands roughly between ₹1.35 lakh and ₹1.8 lakh, while a 5 kW system usually falls between ₹2.25 lakh and ₹3 lakh.",
          "Commercial systems for shops, offices, and institutions are priced per project because mounting structures, cable runs, and three-phase connections vary widely. The per-kW cost generally drops as capacity grows.",
        ],
      },
      {
        heading: "Central subsidy for homes",
        paragraphs: [
          "Residential on-grid systems up to 3 kW are eligible for central financial assistance under the PM Surya Ghar: Muft Bijli Yojana, with partial support extending to 10 kW. The subsidy is credited after installation and inspection, and it can reduce the effective cost of a small home system by a significant share.",
          "We handle the subsidy application and KSEB net-metering paperwork for our customers as part of the installation.",
        ],
      },
      {
        heading: "Payback period",
        paragraphs: [
          "With KSEB's net-metering arrangement, units you export offset your bill. A well-sized home system in Kerala typically pays for itself in 4 to 6 years, after which the electricity it generates is effectively free for the remaining life of the panels — usually 25 years or more.",
        ],
      },
      {
        heading: "How to get an exact figure",
        paragraphs: [
          "Every roof is different. Share your average monthly KSEB bill and location with us, and we will prepare a free custom savings report with the exact system size, cost, subsidy, and payback for your property.",
        ],
      },
    ],
  },
  {
    slug: "kseb-net-metering-explained",
    title: "KSEB Net Metering Explained: How Solar Owners in Kerala Sell Power Back",
    excerpt:
      "Net metering lets your solar system export surplus power to the KSEB grid and offset your bill. Here's how it works, step by step.",
    date: "2026-07-28",
    readTime: "5 min read",
    category: "Guide",
    description:
      "How KSEB net metering works for rooftop solar in Kerala: application steps, billing, export credits, and what homeowners need to know before installing.",
    content: [
      {
        paragraphs: [
          "Net metering is the arrangement that makes rooftop solar so attractive in Kerala. When your panels produce more electricity than your home is using, the surplus flows into the KSEB grid. A bi-directional meter records both what you import and what you export, and your bill reflects the difference.",
        ],
      },
      {
        heading: "How billing works",
        paragraphs: [
          "At the end of each billing period, KSEB compares the units you imported with the units you exported. If you exported more than you used, the surplus is carried forward as a credit against future bills. Many of our customers see their bills drop to near zero during sunny months.",
        ],
      },
      {
        heading: "The application process",
        paragraphs: [
          "Connecting a solar system to the grid requires KSEB approval. The process involves submitting an application with your system details, a technical feasibility check, installation by an approved vendor, and finally inspection and commissioning with the bi-directional meter installed.",
          "This paperwork is where many homeowners get stuck. At Java Solar Solutions we manage the entire KSEB approval and commissioning process on your behalf, so you never have to visit an office or chase a file.",
        ],
      },
      {
        heading: "On-grid vs off-grid",
        paragraphs: [
          "Net metering applies to on-grid systems — the most popular choice in Kerala because they are the most affordable and need no batteries. Hybrid systems with battery backup are available for properties that experience frequent outages, at a higher cost.",
        ],
      },
    ],
  },
  {
    slug: "solar-during-kerala-monsoon",
    title: "Do Solar Panels Work During the Kerala Monsoon?",
    excerpt:
      "Kerala gets months of heavy rain. Here's what monsoon season actually means for solar generation, and why it doesn't stop your savings.",
    date: "2026-06-15",
    readTime: "4 min read",
    category: "Kerala Climate",
    description:
      "How solar panels perform during Kerala's monsoon: real generation figures, rain-resistant installation practices, and why annual savings still work out.",
    content: [
      {
        paragraphs: [
          "It's the most reasonable doubt a Kerala homeowner can have: we get some of the heaviest rainfall in India, so is solar even worth it here? The short answer is yes — and the numbers back it up.",
        ],
      },
      {
        heading: "Generation during monsoon months",
        paragraphs: [
          "Solar panels work on light, not heat, so they generate power even on cloudy days — typically 10% to 30% of their peak output. Kerala still averages strong annual sunshine hours, and system sizing accounts for the monsoon dip. A correctly sized system is designed around your annual consumption, not just summer production.",
        ],
      },
      {
        heading: "Built for heavy rain",
        paragraphs: [
          "Installation quality matters more in Kerala than almost anywhere else. Our mounting structures are engineered and anchored for high wind loads, all outdoor wiring runs in UV-stabilised conduit, and junction points are sealed to IP-rated weatherproof standards. Panels themselves are tested to withstand heavy rain and hail.",
          "Rain actually helps: it washes dust off the panels, which is why generation often improves right after a heavy shower.",
        ],
      },
      {
        heading: "The annual picture",
        paragraphs: [
          "What matters for your electricity bill is the full year, not a single rainy month. With net metering, the credits you build up during the sunny season offset the lower generation during the monsoon. That's why our customers across Kerala continue to save year-round.",
        ],
      },
    ],
  },
  {
    slug: "how-much-can-home-save-solar-kerala",
    title: "How Much Can a Kerala Home Really Save with Solar?",
    excerpt:
      "Real savings examples for typical Kerala households: what a 3 kW or 5 kW system does to a monthly KSEB bill, and how the 25-year math works.",
    date: "2026-05-30",
    readTime: "5 min read",
    category: "Savings",
    description:
      "How much a Kerala household can save with rooftop solar: example savings for 3 kW and 5 kW systems against typical KSEB bills, plus 25-year returns.",
    content: [
      {
        paragraphs: [
          "Savings from solar come down to one number: how much of your KSEB bill your system can offset. Here's how the math typically looks for Kerala homes.",
        ],
      },
      {
        heading: "Example: a 3 kW home system",
        paragraphs: [
          "A 3 kW system in Kerala generates roughly 12 to 13 units per day on average across the year — around 360 to 390 units a month. If your household uses about 300 to 400 units monthly, a 3 kW system can reduce your bill to little more than the fixed charges.",
        ],
      },
      {
        heading: "Example: a 5 kW home system",
        paragraphs: [
          "Larger homes with air conditioning, water heaters, or multiple fridges often need 5 kW. That generates roughly 600 to 650 units a month on average, which can cover even heavy household consumption and build up export credits during low-use months.",
        ],
      },
      {
        heading: "The 25-year view",
        paragraphs: [
          "Quality solar panels carry performance warranties of 25 years or more, and electricity tariffs tend to rise over time. After a typical 4 to 6 year payback, every unit your system generates is money saved. Over the system lifetime, total savings for a Kerala home commonly reach several lakhs of rupees.",
        ],
      },
      {
        heading: "Get your personal number",
        paragraphs: [
          "Your exact savings depend on your roof, your consumption pattern, and your tariff slab. Send us your average monthly bill and we'll prepare a free, no-obligation savings report for your property.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

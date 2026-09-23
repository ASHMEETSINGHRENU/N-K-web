export interface IDeveloperBrand {
  id: string;
  name: string;
  slug: string;
  category: 'master' | 'premium' | 'boutique';
  categoryLabel: string;
  monogram: string;
  tierBadge: string;
  flagships: string[];
  description: string;
  signatureStyle: string;
  image: string;
  citationUrl: string;
  offPlanFilter: string;
}

export const DUBAI_MASTER_DEVELOPERS: IDeveloperBrand[] = [
  // 1. Major Master-Developers
  {
    id: 'emaar',
    name: 'Emaar Properties',
    slug: 'emaar-properties',
    category: 'master',
    categoryLabel: 'Major Master-Developers',
    monogram: 'EM',
    tierBadge: 'Master-Planned Benchmark',
    flagships: ['Burj Khalifa', 'Dubai Mall', 'Dubai Hills Estate', 'Dubai Creek Harbour', 'Emaar Beachfront'],
    description:
      'Widely recognised as the most influential developer in Dubai, shaping master-planned communities and mixed-use districts that often serve as benchmarks for the wider market.',
    signatureStyle: 'Iconic Global Landmarks & Integrated Master-Cities',
    image: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Emaar Properties'
  },
  {
    id: 'nakheel',
    name: 'Nakheel',
    slug: 'nakheel',
    category: 'master',
    categoryLabel: 'Major Master-Developers',
    monogram: 'NK',
    tierBadge: 'Waterfront Master-Developer',
    flagships: ['Palm Jumeirah', 'Bluewaters Island', 'Palm Jebel Ali', 'Dubai Islands'],
    description:
      "Central to Dubai's waterfront development, delivering large-scale coastal and island-based residential communities that revolutionized global marine living.",
    signatureStyle: 'World-Renowned Coastal Archipelagos & Private Beaches',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Nakheel'
  },
  {
    id: 'damac',
    name: 'DAMAC Properties',
    slug: 'damac-properties',
    category: 'master',
    categoryLabel: 'Major Master-Developers',
    monogram: 'DM',
    tierBadge: 'Luxury Residential Giant',
    flagships: ['DAMAC Hills', 'DAMAC Hills 2', 'DAMAC Lagoons', 'Safa One & Two'],
    description:
      "A major participant in Dubai's luxury residential sector, delivering large-scale apartment and villa communities defined by high-fashion designer collaborations.",
    signatureStyle: 'Haute-Couture Branded Living & Mediterranean Lagoons',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'DAMAC Properties'
  },
  {
    id: 'meraas',
    name: 'Meraas',
    slug: 'meraas',
    category: 'master',
    categoryLabel: 'Major Master-Developers',
    monogram: 'MR',
    tierBadge: 'Urban Living Innovator',
    flagships: ['City Walk', 'Bluewaters Island', 'Port de La Mer', 'Nikki Beach Residences'],
    description:
      'Develops mixed-use districts that integrate residential, retail, and leisure components, profoundly influencing contemporary urban living patterns.',
    signatureStyle: 'Pedestrian European Boulevards & Island Waterfronts',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Meraas'
  },

  // 2. Premium / Quality-Focused Developers
  {
    id: 'sobha',
    name: 'Sobha Realty',
    slug: 'sobha-realty',
    category: 'premium',
    categoryLabel: 'Premium / Quality-Focused',
    monogram: 'SB',
    tierBadge: 'Backward-Integrated Quality',
    flagships: ['Sobha Hartland', 'Sobha Hartland II', 'Sobha Seahaven'],
    description:
      'Known for its vertically integrated development model and uncompromising emphasis on construction quality, primarily targeting end users and long-term residents.',
    signatureStyle: 'In-House German Precision & Forested Lagoon Enclaves',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Sobha Realty'
  },
  {
    id: 'mira',
    name: 'Mira Developments',
    slug: 'mira-developments',
    category: 'premium',
    categoryLabel: 'Premium / Quality-Focused',
    monogram: 'MI',
    tierBadge: 'Branded Luxury Specialist',
    flagships: ['Mira Villas designed by Bentley Home', 'Trussardi Residences'],
    description:
      'Represents branded and serviced residential projects, aligning real estate with internationally recognised luxury lifestyle and haute-design brands.',
    signatureStyle: 'Bespoke Italian Interiors & Turnkey Concierge Living',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Mira Developments'
  },
  {
    id: 'ellington',
    name: 'Ellington Properties',
    slug: 'ellington-properties',
    category: 'premium',
    categoryLabel: 'Premium / Quality-Focused',
    monogram: 'EL',
    tierBadge: 'Boutique Design-Led',
    flagships: ['Ocean House (Palm Jumeirah)', 'DT1 (Downtown)', 'Ellington Beach House'],
    description:
      'Boutique/design-led luxury developer renowned for curated aesthetic residences, resort-style infinity pools, and artisan architectural detailing.',
    signatureStyle: 'Art-Infused Architectural Detailing & Resort Amenities',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Ellington Properties'
  },
  {
    id: 'azizi',
    name: 'Azizi Developments',
    slug: 'azizi-developments',
    category: 'premium',
    categoryLabel: 'Premium / Quality-Focused',
    monogram: 'AZ',
    tierBadge: 'Large-Volume Residential',
    flagships: ['Azizi Riviera (Meydan)', 'Azizi Venice (Dubai South)', 'Mina (Palm Jumeirah)'],
    description:
      'Large-volume residential developer delivering dynamic urban communities with crystal lagoons and vibrant mixed-use retail boulevards.',
    signatureStyle: 'French-Mediterranean Waterfronts & Rapid Construction Delivery',
    image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Azizi Developments'
  },

  // 3. Other Notable & Emerging Boutique Developers
  {
    id: 'ithra',
    name: 'Ithra Dubai',
    slug: 'ithra-dubai',
    category: 'boutique',
    categoryLabel: 'Notable & Boutique Innovators',
    monogram: 'IT',
    tierBadge: 'Sovereign Icon Mastermind',
    flagships: ["One Za'abeel (The Link)", 'Deira Enrichment Project'],
    description:
      "Master developer behind historic structural marvels including One Za'abeel's record-breaking cantilever (The Link) and world-renowned One&Only private homes.",
    signatureStyle: 'Record-Breaking Cantilever Engineering & Sovereign Landmarks',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Ithra Dubai'
  },
  {
    id: 'deca',
    name: 'Deca Properties',
    slug: 'deca-properties',
    category: 'boutique',
    categoryLabel: 'Notable & Boutique Innovators',
    monogram: 'DC',
    tierBadge: 'Boutique Development Partner',
    flagships: ['Trinity (Arjan)', 'Tailored Investor Residences'],
    description:
      'Boutique end-to-end development partner delivering tailor-made residential projects with high investment efficiency, contemporary aesthetics, and turnkey execution.',
    signatureStyle: 'End-to-End Asset Development & Investor-Optimized Architecture',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Deca Properties'
  },
  {
    id: 'bamx',
    name: 'Bam Eskan / BAMX Properties',
    slug: 'bam-eskan-bamx',
    category: 'boutique',
    categoryLabel: 'Notable & Boutique Innovators',
    monogram: 'BX',
    tierBadge: 'Rising Boutique Pioneer',
    flagships: ['BAMX Residences', 'Minimalist Private Enclaves'],
    description:
      'Fast-rising boutique developer gaining strong market traction for minimalist luxury architecture, private sanctuaries, and precision craftsmanship.',
    signatureStyle: 'Minimalist European Geometry & Private Boutique Serenity',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Bam Eskan'
  },
  {
    id: 'cledor',
    name: 'Cledor',
    slug: 'cledor',
    category: 'boutique',
    categoryLabel: 'Notable & Boutique Innovators',
    monogram: 'CL',
    tierBadge: 'Design-Forward Boutique',
    flagships: ['Cledor Private Townhouses', 'Organic Modernist Villas'],
    description:
      'Emerging boutique developer gaining traction through design-forward townhouses and private villas, focusing on indoor-outdoor serenity and natural light.',
    signatureStyle: 'Biophilic Aesthetics & Natural Light Integration',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Cledor'
  },
  {
    id: 'algouta',
    name: 'Algouta Properties',
    slug: 'algouta-properties',
    category: 'boutique',
    categoryLabel: 'Notable & Boutique Innovators',
    monogram: 'AG',
    tierBadge: 'Bespoke Family Estates',
    flagships: ['Algouta Prime Villas', 'Custom Private Mansions'],
    description:
      'Boutique luxury developer crafting bespoke family estates and private residential compounds designed for generational permanence and complete privacy.',
    signatureStyle: 'Generational Custom Mansions & Sovereign Estate Privacy',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Algouta Properties'
  },
  {
    id: 'soho',
    name: 'Soho Development',
    slug: 'soho-development',
    category: 'boutique',
    categoryLabel: 'Notable & Boutique Innovators',
    monogram: 'SH',
    tierBadge: 'Industrial Chic & Lofts',
    flagships: ['Soho Lofts', 'Soho Palm Residences'],
    description:
      'Boutique developer inspired by cosmopolitan loft living, combining exposed raw textures, floor-to-ceiling glass, and vibrant urban exclusivity.',
    signatureStyle: 'New York Loft Aesthetics & Industrial Chic Luxury',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    citationUrl: 'https://resident.com/resource-guide/2026/01/21/dubai-names-top-10-real-estate-developers-in-2026',
    offPlanFilter: 'Soho Development'
  }
];

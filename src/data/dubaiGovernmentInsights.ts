export interface DubaiKpis {
  totalPipelineValueAED: number;
  totalPipelineValueBillion: number;
  totalProjects: number;
  activeProjects: number;
  pendingProjects: number;
  totalUnits: number;
  totalVillas: number;
  totalBuildings: number;
  readyPct: number;
  offplanPct: number;
  licensedBrokers: number;
  registeredDevelopers: number;
  totalLandParcels: number;
  commercialParcels: number;
  residentialParcels: number;
  dataDate: string;
}

export interface DeliveryForecastYear {
  year: string;
  projectsCount: number;
  estimatedValueAED: number;
  estimatedValueBillion: number;
  unitsCount: number;
  percentageOfPipeline: number;
}

export interface DeveloperMetric {
  name: string;
  projectsCount: number;
  capitalValueAED: number;
  capitalValueBillion: number;
  sharePct: number;
}

export interface AreaHotspot {
  name: string;
  capitalValueBillion: number;
  projectsCount: number;
  type: string;
}

export interface ValuationRecord {
  area: string;
  type: string;
  subType: string;
  valueAED: number;
  valueMillion: number;
  areaSqM: number;
  date: string;
}

export interface OfficialInsightArticle {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage: string;
  readingTimeMinutes: number;
  publishedDate: string;
  author: {
    name: string;
    role: string;
  };
  keyStats: { label: string; value: string }[];
  tags: string[];
  content: string;
}

export const DUBAI_GOVERNMENT_KPIS: DubaiKpis = {
  totalPipelineValueAED: 97570000000,
  totalPipelineValueBillion: 97.57,
  totalProjects: 332,
  activeProjects: 252,
  pendingProjects: 77,
  totalUnits: 57860,
  totalVillas: 6384,
  totalBuildings: 12273,
  readyPct: 51,
  offplanPct: 49,
  licensedBrokers: 43388,
  registeredDevelopers: 194,
  totalLandParcels: 262455,
  commercialParcels: 149642,
  residentialParcels: 60035,
  dataDate: 'September 2026 Official DLD Registry'
};

export const DELIVERY_FORECAST: DeliveryForecastYear[] = [
  {
    year: '2027',
    projectsCount: 37,
    estimatedValueAED: 14200000000,
    estimatedValueBillion: 14.2,
    unitsCount: 6420,
    percentageOfPipeline: 14.5
  },
  {
    year: '2028',
    projectsCount: 128,
    estimatedValueAED: 39800000000,
    estimatedValueBillion: 39.8,
    unitsCount: 23150,
    percentageOfPipeline: 40.8
  },
  {
    year: '2029',
    projectsCount: 100,
    estimatedValueAED: 28500000000,
    estimatedValueBillion: 28.5,
    unitsCount: 17800,
    percentageOfPipeline: 29.2
  },
  {
    year: '2030',
    projectsCount: 54,
    estimatedValueAED: 12100000000,
    estimatedValueBillion: 12.1,
    unitsCount: 8900,
    percentageOfPipeline: 12.4
  },
  {
    year: '2031+',
    projectsCount: 13,
    estimatedValueAED: 2970000000,
    estimatedValueBillion: 2.97,
    unitsCount: 1590,
    percentageOfPipeline: 3.1
  }
];

export const TOP_DEVELOPERS_CAPITAL: DeveloperMetric[] = [
  {
    name: 'Emaar Development P.J.S.C.',
    projectsCount: 19,
    capitalValueAED: 13450000000,
    capitalValueBillion: 13.45,
    sharePct: 13.8
  },
  {
    name: 'Binghatti Developers FZE',
    projectsCount: 16,
    capitalValueAED: 8800000000,
    capitalValueBillion: 8.8,
    sharePct: 9.0
  },
  {
    name: 'One Central Development FZE',
    projectsCount: 1,
    capitalValueAED: 6476900000,
    capitalValueBillion: 6.48,
    sharePct: 6.6
  },
  {
    name: 'Sobha Real Estate L.L.C',
    projectsCount: 6,
    capitalValueAED: 3660000000,
    capitalValueBillion: 3.66,
    sharePct: 3.8
  },
  {
    name: 'Danube Properties Development',
    projectsCount: 5,
    capitalValueAED: 3260000000,
    capitalValueBillion: 3.26,
    sharePct: 3.3
  },
  {
    name: 'Dubai Creek Harbour L.L.C',
    projectsCount: 4,
    capitalValueAED: 2480000000,
    capitalValueBillion: 2.48,
    sharePct: 2.5
  },
  {
    name: 'Dubai South Properties DWC',
    projectsCount: 7,
    capitalValueAED: 2030000000,
    capitalValueBillion: 2.03,
    sharePct: 2.1
  },
  {
    name: 'DAMAC Prime Development L.L.C',
    projectsCount: 10,
    capitalValueAED: 1980000000,
    capitalValueBillion: 1.98,
    sharePct: 2.0
  }
];

export const AREA_GROWTH_HOTSPOTS: AreaHotspot[] = [
  { name: 'Business Bay', capitalValueBillion: 4.34, projectsCount: 14, type: 'Downtown Financial & Canal' },
  { name: 'Madinat Al Mataar (Dubai South)', capitalValueBillion: 4.11, projectsCount: 35, type: 'Aerotropolis & Al Maktoum Airport' },
  { name: 'Al Rowaiyah First', capitalValueBillion: 3.88, projectsCount: 18, type: 'Urban Expansion Master Corridor' },
  { name: 'Nad Al Shiba First (Meydan)', capitalValueBillion: 3.48, projectsCount: 11, type: 'Equestrian & Prime Villa Enclave' },
  { name: 'Madinat Dubai Almelaheyah', capitalValueBillion: 2.67, projectsCount: 9, type: 'Maritime Coastal City' },
  { name: 'Al Thanyah Fifth', capitalValueBillion: 2.58, projectsCount: 8, type: 'Prime Suburban & Lake Residences' },
  { name: 'Jabal Ali First', capitalValueBillion: 2.40, projectsCount: 12, type: 'Coastal & Palm Jebel Ali Gate' },
  { name: 'Palm Deira (Dubai Islands)', capitalValueBillion: 2.15, projectsCount: 18, type: 'Island Resort & Waterfront Masterplan' }
];

export const TOP_BENCHMARK_VALUATIONS: ValuationRecord[] = [
  { area: 'Burj Khalifa District', type: 'Land', subType: 'Commercial Plot', valueAED: 404000000, valueMillion: 404.0, areaSqM: 4691.6, date: '2026-09-08' },
  { area: 'Saih Alsalam Enclave', type: 'Land', subType: 'Agricultural & Reserve', valueAED: 374270000, valueMillion: 374.3, areaSqM: 1390830.8, date: '2026-09-02' },
  { area: 'Al Raffa Heritage Hub', type: 'Land', subType: 'Commercial Complex', valueAED: 360000000, valueMillion: 360.0, areaSqM: 4125.6, date: '2026-09-07' },
  { area: 'Oud Al Muteena', type: 'Land', subType: 'Strategic Land Parcel', valueAED: 282010000, valueMillion: 282.0, areaSqM: 174664.1, date: '2026-09-10' },
  { area: 'Ras Al Khor Industrial First', type: 'Land', subType: 'Industrial Logistics Plot', valueAED: 260120000, valueMillion: 260.1, areaSqM: 172615.2, date: '2026-09-14' },
  { area: 'Business Bay Prime Canal', type: 'Land', subType: 'Commercial Tower Plot', valueAED: 247500000, valueMillion: 247.5, areaSqM: 1393.5, date: '2026-09-07' },
  { area: 'Marsa Dubai (Dubai Marina)', type: 'Land', subType: 'Superyacht Waterfront Plot', valueAED: 214650000, valueMillion: 214.7, areaSqM: 6647.2, date: '2026-09-09' },
  { area: 'Wadi Al Safa 4', type: 'Land', subType: 'Residential Villa Master Plot', valueAED: 166670000, valueMillion: 166.7, areaSqM: 77420.7, date: '2026-09-08' },
  { area: 'Al Khairan First (Dubai Creek)', type: 'Land', subType: 'Residential Waterfront Plot', valueAED: 165590000, valueMillion: 165.6, areaSqM: 11698.7, date: '2026-09-07' }
];

export const TOP_REAL_ESTATE_AGENCIES = [
  { name: 'White & White Real Estate L.L.C', brokersCount: 505, sharePct: 1.16 },
  { name: 'fäm Real Estate Broker (Branch)', brokersCount: 436, sharePct: 1.00 },
  { name: 'Driven Properties L.L.C', brokersCount: 400, sharePct: 0.92 },
  { name: 'On Plan Real Estate L.L.C', brokersCount: 369, sharePct: 0.85 },
  { name: 'Harbor Real Estate Broker L.L.C', brokersCount: 365, sharePct: 0.84 }
];

export const OFFICIAL_DUBAI_INSIGHTS: OfficialInsightArticle[] = [
  {
    slug: 'dubai-government-pipeline-report-97b-capital-inflow',
    title: 'Dubai Government 2026 Pipeline: AED 97.5B Capital Inflow Across 332 Mega-Projects',
    category: 'Market Report',
    excerpt: 'Official Dubai Land Department registry confirms 332 active developments totaling AED 97.57 Billion, with 75.9% of schemes actively under construction across prime corridors.',
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',
    readingTimeMinutes: 7,
    publishedDate: '16 September 2026',
    author: {
      name: 'Alexander Sterling',
      role: 'Head of Quantitative Research, Nestandkey'
    },
    keyStats: [
      { label: 'Total Pipeline Capital', value: 'AED 97.57 Billion' },
      { label: 'Active Projects', value: '252 (75.9%)' },
      { label: 'Total Tracked Units', value: '57,860 Units' },
      { label: 'Luxury Villas', value: '6,384 Homes' }
    ],
    tags: ['Government Data', 'DLD Registry', 'Capital Investment', 'Mega Projects'],
    content: `
### 1. The Official Record: A Landmark AED 97.57 Billion Pipeline
Official open datasets released by the Dubai Land Department (DLD) as of September 2026 establish that Dubai’s real estate development trajectory is operating at historic velocity. With **332 tracked mega-developments** backed by certified escrow accounts, aggregate committed capital stands at **AED 97,570,000,000**.

Unlike speculative expansion cycles of preceding decades, current capital deployment is heavily institutionalized:
* **252 Projects (75.9%)** are in active physical construction with ongoing DLD on-site inspections.
* **77 Projects (23.2%)** are navigating final pre-launch statutory clearances.
* **Only 2 Projects (<0.6%)** have faced cancellation, demonstrating the unprecedented resilience of Dubai's escrow security framework (Law No. 8 of 2007).

### 2. Supply Architecture: 57,860 Units and 6,384 Luxury Villas
The certified pipeline accounts for **57,860 residential and commercial units**, complemented by **6,384 standalone and semi-detached luxury villas**. 

This asset distribution reveals a targeted strategy: while apartment density is expanding around strategic infrastructure hubs, the villa supply remains intentionally controlled. High-net-worth investors competing for single-family estates continue to face limited supply across ultra-prime master communities like Palm Jumeirah, Emirates Hills, and Meydan.

### 3. Institutional Capital and Escrow Governance
Under Dubai Law, every dirham committed to these 332 projects is held in dedicated bank escrow accounts supervised directly by RERA. Developers can draw down funds strictly upon meeting verified engineering milestones certified by municipal engineering auditors. This safeguards international investors against project delays and liquidity shortfalls.
    `
  },
  {
    slug: 'the-handover-wave-2027-2030-delivery-forecast',
    title: 'The Handover Wave: Tracking 57,860 Units Scheduled for 2027–2030 Delivery',
    category: 'Supply & Delivery',
    excerpt: 'Detailed analysis of scheduled project handovers reveals a peak delivery crest in 2028 with 128 projects worth AED 39.8B, followed by structural stabilization through 2030.',
    coverImage: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1600&q=85',
    readingTimeMinutes: 6,
    publishedDate: '16 September 2026',
    author: {
      name: 'Dr. Tariq Al-Hashimi',
      role: 'Director of Macro Real Estate Economics'
    },
    keyStats: [
      { label: '2028 Peak Handovers', value: '128 Projects' },
      { label: '2028 Capital Delivery', value: 'AED 39.8 Billion' },
      { label: '2029 Delivery', value: '100 Projects' },
      { label: 'Ready vs Off-Plan Mix', value: '51% Ready / 49% Off-Plan' }
    ],
    tags: ['Handover Schedule', 'Supply Forecast', 'Off-Plan', 'Market Equilibrium'],
    content: `
### 1. Delivery Wave Timeline: 2027 to 2032
DLD project tracking datasets provide an exact chronological map of when inventory will enter the physical market:

* **2027 (Initial Inflow):** 37 projects totaling **AED 14.2 Billion** and 6,420 units.
* **2028 (The Peak Handover Crest):** 128 projects representing **AED 39.8 Billion** (40.8% of the entire pipeline) will complete handover. This represents the peak of post-pandemic capital mobilization.
* **2029 (Stabilization Horizon):** 100 projects totaling **AED 28.5 Billion** and 17,800 units.
* **2030 (Long-Cycle Completions):** 54 projects totaling **AED 12.1 Billion** entering completion.
* **2031 & Beyond:** 13 mega-phased schemes totaling **AED 2.97 Billion**.

### 2. Supply Absorption Dynamics: Ready vs. Off-Plan Parity
The DLD building registry encompasses **12,273 registered buildings and villas**, displaying a healthy equilibrium:
* **Ready (Completed):** 6,252 structures (51.0%)
* **Off-Plan (Under Construction):** 6,021 structures (49.0%)

This balanced 51/49 ratio ensures that while construction continues aggressively, the secondary resale market retains healthy transaction velocity without the oversupply risks observed in previous cycles.

### 3. What This Means for Prime Capital Appreciation
Prime locations (Downtown Dubai, Palm Jumeirah, Dubai Canal) account for less than 18% of the upcoming handover inventory, with the remainder distributed across suburban expansion corridors (Dubai South, Al Rowaiyah, Dubailand). Consequently, prime central assets will continue to experience premium rental yields and low vacancy rates.
    `
  },
  {
    slug: 'developer-leadership-index-emaar-binghatti-sobha',
    title: 'Developer Leadership Index: How Emaar, Binghatti, and Sobha Direct 40% of Capital',
    category: 'Developer Analysis',
    excerpt: 'An audit of 194 licensed master developers demonstrates capital concentration, with top tier master developers commanding over AED 40 Billion in active schemes.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    readingTimeMinutes: 6,
    publishedDate: '15 September 2026',
    author: {
      name: 'Victoria Davenport',
      role: 'Senior Property Analyst'
    },
    keyStats: [
      { label: 'Emaar Development', value: 'AED 13.45B (19 Projects)' },
      { label: 'Binghatti Developers', value: 'AED 8.80B (16 Projects)' },
      { label: 'One Central Development', value: 'AED 6.48B (1 Project)' },
      { label: 'Total Registered Developers', value: '194 Master Developers' }
    ],
    tags: ['Master Developers', 'Emaar', 'Binghatti', 'Sobha', 'Capital Share'],
    content: `
### 1. Capital Concentration Among Elite Developers
Across 194 developers registered with the Dubai Land Department, investment capital is highly concentrated among proven market leaders with multi-decade delivery records:

1. **EMAAR Development P.J.S.C.:** Leads the emirate with **AED 13.45 Billion** across 19 flagship schemes, including major expansions in Dubai Creek Harbour, The Oasis, and Emaar South.
2. **Binghatti Developers FZE:** Holds **AED 8.80 Billion** across 16 active projects, capitalizing on high-profile branded collaborations (Bugatti, Mercedes-Benz Places, Jacob & Co).
3. **One Central Development FZE:** Commands **AED 6.48 Billion** with landmark commercial and luxury hospitality integrations.
4. **Sobha Real Estate:** Directs **AED 3.66 Billion**, driven by Sobha Hartland II and Business Bay sky towers.
5. **Danube Properties Development:** Accounts for **AED 3.26 Billion**, pioneering flexible payment mechanisms.
6. **Dubai Creek Harbour LLC:** Represents **AED 2.48 Billion** in waterfront mega-structures.
7. **Dubai South Properties:** Encompasses **AED 2.03 Billion** linked to airport connectivity.
8. **DAMAC Prime Development:** Manages **AED 1.98 Billion** across 10 strategic residential phases.

### 2. The Era of Branded Architecture
A key finding from the developers registry is the transition toward branded residential partnerships. Over 35% of Binghatti's and DAMAC's capital commitments are co-branded with global luxury marques, commanding a verified 28% pricing premium over adjacent non-branded towers.
    `
  },
  {
    slug: 'dubai-land-registry-and-freehold-expansion',
    title: 'Dubai Land Registry & Freehold Expansion: 262,455 Parcels Mapped',
    category: 'Legal & Land',
    excerpt: 'DLD land registry records show 129,433 freehold parcels alongside 149,642 commercial plots, underscoring Dubai’s strategic zoning and long-term urban master planning.',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    readingTimeMinutes: 5,
    publishedDate: '14 September 2026',
    author: {
      name: 'Alexander Sterling',
      role: 'Head of Quantitative Research, Nestandkey'
    },
    keyStats: [
      { label: 'Total Land Parcels', value: '262,455 Plots' },
      { label: 'Freehold Land Parcels', value: '129,433 (49.3%)' },
      { label: 'Commercial Zoning', value: '149,642 (57.0%)' },
      { label: 'Residential Zoning', value: '60,035 (22.9%)' }
    ],
    tags: ['Land Registry', 'Freehold', 'Zoning', 'Urban Planning'],
    content: `
### 1. Spatial Structure: 262,455 Registered Parcels
The Dubai Land Department land database contains **262,455 recorded land parcels** distributed between the historical Deira zone (68,641 parcels) and modern Dubai South/Bur Dubai expansion zones (193,778 parcels).

### 2. Freehold vs. Non-Freehold Distribution
* **Freehold Parcels (Foreign Ownership Authorized):** 129,433 parcels (49.3%)
* **Non-Freehold / GCC Restricted:** 132,987 parcels (50.7%)

The designation of nearly half of all registered plots as Freehold ensures perpetual tenure security for global investors, expatriate residents, and foreign corporate family offices.

### 3. Zoning Allocation: Prioritizing Commerce and Lifestyle
* **Commercial Parcels:** 149,642 (57.0%)
* **Residential Parcels:** 60,035 (22.9%)
* **Industrial & Logistics:** 11,305 (4.3%)
* **Civic & Public Facilities:** 7,890 (3.0%)

This robust commercial allotment reflects Dubai’s 2040 Urban Master Plan, ensuring that residential communities are directly supported by high-density office districts, lifestyle pavilions, and international schooling.
    `
  },
  {
    slug: 'official-dld-benchmark-valuations-prime-pricing',
    title: 'Official DLD Benchmark Valuations: Land & Super-Prime Pricing Signals',
    category: 'Valuations & Pricing',
    excerpt: 'Analyzing 267 recent official DLD valuation procedures reveals landmark transactions, including a single AED 404M commercial parcel in the Burj Khalifa district.',
    coverImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=85',
    readingTimeMinutes: 5,
    publishedDate: '14 September 2026',
    author: {
      name: 'Victoria Davenport',
      role: 'Senior Property Analyst'
    },
    keyStats: [
      { label: 'Top Land Valuation', value: 'AED 404.0 Million' },
      { label: 'Burj Khalifa Plot Area', value: '4,691 sq. meters' },
      { label: 'Business Bay Plot', value: 'AED 247.5 Million' },
      { label: 'Marina Waterfront Plot', value: 'AED 214.7 Million' }
    ],
    tags: ['DLD Valuations', 'Burj Khalifa', 'Prime Land', 'Price Benchmarks'],
    content: `
### 1. The Highest Official Valuations on Record
Official DLD valuation procedures conducted under strict RERA valuation guidelines benchmark the true replacement and transaction value of Dubai’s finest real estate. Recent standout valuations include:

1. **Burj Khalifa Commercial Land:** **AED 404,000,000** for 4,691.6 square meters (~AED 86,100 per sq.m), reflecting the unmatched scarcity of plots facing the world's tallest tower.
2. **Saih Alsalam Eco-Reserve Land:** **AED 374,270,000** for 1.39 million sq.m.
3. **Al Raffa Prime Commercial:** **AED 360,000,000** for 4,125 sq.m.
4. **Business Bay Waterfront Plot:** **AED 247,500,000** for 1,393 sq.m (~AED 177,600 per sq.m of prime canal frontage).
5. **Marsa Dubai (Dubai Marina):** **AED 214,650,000** for 6,647 sq.m overlooking the superyacht basin.
6. **Wadi Al Safa 4 (Villa Sector):** **AED 166,670,000** for 77,420 sq.m of master villa land.
7. **Al Khairan First (Dubai Creek):** **AED 165,590,000** for 11,698 sq.m.

### 2. Implications for Institutional Real Estate Funds
These valuation records demonstrate that land in prime central Dubai has detached from suburban indices, commanding ultra-prime valuations driven by family offices and sovereign funds acquiring irreplaceable trophy land parcels.
    `
  },
  {
    slug: 'dubai-brokerage-ecosystem-43000-licensed-agents',
    title: 'Inside Dubai’s Brokerage Ecosystem: 43,388 Licensed RERA Agents',
    category: 'Industry Insights',
    excerpt: 'DLD’s broker registry highlights 43,388 certified professionals, market consolidation among top tier agencies, and rising female participation across luxury advisories.',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1600&q=85',
    readingTimeMinutes: 4,
    publishedDate: '13 September 2026',
    author: {
      name: 'Alexander Sterling',
      role: 'Head of Quantitative Research, Nestandkey'
    },
    keyStats: [
      { label: 'Certified Brokers', value: '43,388 Agents' },
      { label: 'Female Representation', value: '14,647 (33.8%)' },
      { label: 'Top Brokerage Fleet', value: '505 Agents (White & White)' },
      { label: 'Agency Consolidation', value: 'Top 5 hold 2,075 Agents' }
    ],
    tags: ['Brokers', 'RERA Certification', 'Market Advisory', 'Real Estate Workforce'],
    content: `
### 1. A Professionalized Advisory Workforce
Dubai’s real estate transaction volume is powered by **43,388 certified real estate brokers** licensed under the Real Estate Regulatory Agency (RERA). Every licensed broker is registered in the official DLD registry, complete with identity verification, background clearance, and accredited BRN certification.

### 2. Gender Diversity in High-End Real Estate
The registry reveals growing diversity across Dubai's brokerage sector:
* **Male Brokers:** 28,734 (66.2%)
* **Female Brokers:** 14,647 (33.8%)

Women advisors hold predominant leadership roles in prime and super-prime sectors, particularly across Palm Jumeirah, Downtown penthouses, and branded residences.

### 3. Agency Network Strength
Leading advisory brokerages maintain institutional fleets to serve international high-net-worth buyers:
* **White & White Real Estate:** 505 certified brokers
* **fäm Real Estate Broker:** 436 certified brokers
* **Driven Properties:** 400 certified brokers
* **On Plan Real Estate:** 369 certified brokers
* **Harbor Real Estate:** 365 certified brokers

Nestandkey’s boutique private advisory works hand-in-hand with this ecosystem to offer verified, off-market, and turnkey portfolio access for our global clients.
    `
  }
];

export interface IDubaiCommunityMeta {
  name: string;
  slug: string;
  tagline: string;
  avgPricePerSqFt: number;
  highlightImage: string;
  description: string;
}

export const DUBAI_COMMUNITIES: IDubaiCommunityMeta[] = [
  {
    name: 'Palm Jumeirah',
    slug: 'palm-jumeirah',
    tagline: 'World-renowned archipelago offering beachfront super-mansions and waterfront penthouses',
    avgPricePerSqFt: 4850,
    highlightImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    description: 'The epitome of island luxury, featuring bespoke frond villas, branded residences, and private beaches.'
  },
  {
    name: 'Downtown Dubai',
    slug: 'downtown-dubai',
    tagline: 'The iconic heart of Dubai surrounding the majestic Burj Khalifa and Dubai Mall',
    avgPricePerSqFt: 3650,
    highlightImage: 'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=1600&q=80',
    description: 'Center of cosmopolitan prestige with panoramic skyline penthouses, opera district residences, and urban sophistication.'
  },
  {
    name: 'Dubai Hills Estate',
    slug: 'dubai-hills-estate',
    tagline: 'The green heart of Dubai with championship 18-hole golf fairways and private parkland villas',
    avgPricePerSqFt: 2950,
    highlightImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
    description: 'Master-planned luxury community offering championship golf courses, private clubhouse estates, and pristine green boulevards.'
  },
  {
    name: 'Emirates Hills',
    slug: 'emirates-hills',
    tagline: 'The Beverly Hills of Dubai, home to ultra-exclusive ambassadorial mansions',
    avgPricePerSqFt: 4200,
    highlightImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    description: 'Gated enclave of custom architectural masterworks overlooking Montgomerie Championship Golf Course.'
  },
  {
    name: 'Dubai Marina',
    slug: 'dubai-marina',
    tagline: 'Superyacht marina lifestyle framed by iconic high-rise architectural marvels',
    avgPricePerSqFt: 2750,
    highlightImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    description: 'Riviera-style waterfront living with promenade fine dining, private berths, and soaring duplex penthouses.'
  },
  {
    name: 'Jumeirah Bay Island',
    slug: 'jumeirah-bay-island',
    tagline: 'Ultra-prime seahorse-shaped island home to the Bulgari Resort & Private Mansions',
    avgPricePerSqFt: 7800,
    highlightImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    description: 'The pinnacle of private luxury in the Middle East, commanding historic price records for custom island mansions.'
  },
  {
    name: 'Dubai Creek Harbour',
    slug: 'dubai-creek-harbour',
    tagline: 'Next-generation waterfront city offering serene marina vistas and Ras Al Khor flamingo sanctuary',
    avgPricePerSqFt: 2400,
    highlightImage: 'https://images.unsplash.com/photo-1546412414-e1885259563a?auto=format&fit=crop&w=1600&q=80',
    description: 'Sustainable luxury combining historic creek tranquility with visionary high-rise waterfront architecture.'
  },
  {
    name: 'Business Bay',
    slug: 'business-bay',
    tagline: 'Dubai Canal waterfront enclave blending ultra-luxury residences with vibrant financial epicenters',
    avgPricePerSqFt: 2600,
    highlightImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
    description: 'Direct canal-facing architectural residences by Zaha Hadid, Foster + Partners, and Dorchester Collection.'
  },
  {
    name: 'Damac Lagoons',
    slug: 'damac-lagoons',
    tagline: 'Mediterranean-inspired master community framed by azure lagoons and pristine sandy beaches',
    avgPricePerSqFt: 1850,
    highlightImage: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80',
    description: 'Waterfront living featuring Mediterranean clusters, crystal lagoons, inland white beaches, and island-style clubhouses.'
  },
  {
    name: 'Villanova',
    slug: 'villanova',
    tagline: 'Vibrant Mediterranean family community surrounded by verdant linear parks and walking trails',
    avgPricePerSqFt: 1450,
    highlightImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    description: 'Peaceful suburban master development by Dubai Properties offering Mediterranean townhouses, lush landscaped parks, and community centers.'
  },
  {
    name: 'Town Square',
    slug: 'town-square',
    tagline: 'Energetic modern master community centered around a sprawling 50,000 sqm central park',
    avgPricePerSqFt: 1550,
    highlightImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    description: 'Progressive lifestyle hub by Nshama featuring modern apartments, central parks, retail boulevards, jogging loops, and cycling trails.'
  },
  {
    name: 'Dubai South',
    slug: 'dubai-south',
    tagline: 'Futuristic aerotropolis master development featuring golf course villas and Parkside townhouses',
    avgPricePerSqFt: 1100,
    highlightImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=80',
    description: 'Dynamic master development by Emaar South and Dubai South offering lush parks, championship golf courses, and tranquil family living.'
  },
  {
    name: 'Tilal Al Ghaf',
    slug: 'tilal-al-ghaf',
    tagline: 'Resort-style lagoon community centered around the pristine crystalline Lagoon Al Ghaf',
    avgPricePerSqFt: 2200,
    highlightImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    description: 'Prestigious lifestyle destination by Majid Al Futtaim featuring luxury villas, private sandy beaches, and water sports.'
  },
  {
    name: 'Motor City',
    slug: 'motor-city',
    tagline: 'Vibrant motorsport-themed community offering spacious commercial suites and lifestyle residences',
    avgPricePerSqFt: 1250,
    highlightImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    description: 'Dynamic master development by Union Properties featuring business towers, motorsport parklands, and pedestrian-friendly commercial arcades.'
  }
];

export const DUBAI_DEVELOPERS = [
  { name: 'Emaar Properties', slug: 'emaar-properties', flagship: 'Downtown Dubai & Dubai Hills' },
  { name: 'Nakheel', slug: 'nakheel', flagship: 'Palm Jumeirah & Palm Jebel Ali' },
  { name: 'Omniyat', slug: 'omniyat', flagship: 'One at Palm Jumeirah & The Lana Residences' },
  { name: 'Meraas', slug: 'meraas', flagship: 'Bluewaters Island & Jumeirah Bay' },
  { name: 'Sobha Realty', slug: 'sobha-realty', flagship: 'Sobha Hartland' },
  { name: 'Ellington Properties', slug: 'ellington-properties', flagship: 'DT1 & Ocean House' },
  { name: 'DAMAC Properties', slug: 'damac-properties', flagship: 'Damac Lagoons & Cavalli Couture' },
  { name: 'Select Group', slug: 'select-group', flagship: 'Six Senses Residences' },
  { name: 'Dubai Properties', slug: 'dubai-properties', flagship: 'Villanova & Mudon' },
  { name: 'Nshama', slug: 'nshama', flagship: 'Town Square Dubai' },
  { name: 'Majid Al Futtaim', slug: 'majid-al-futtaim', flagship: 'Tilal Al Ghaf & Al Zahia' },
  { name: 'Union Properties', slug: 'union-properties', flagship: 'Motor City & Uptown Mirdif' }
];

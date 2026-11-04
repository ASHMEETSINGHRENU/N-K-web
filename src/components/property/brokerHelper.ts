export interface BrokerDisplayInfo {
  name: string;
  title: string;
  agency: string;
  photoUrl: string;
  phone?: string;
  reraNumber?: string;
  brn?: string;
  experienceYears?: number;
  whatsappNumber?: string;
  rating?: number;
}

/**
 * Extracts and normalizes broker display information from a property document.
 * Handles populated `assignedBroker` with or without nested `user`, as well as
 * fallback mappings for standard luxury advisors.
 */
export function getBrokerDisplayInfo(property: any): BrokerDisplayInfo {
  const b = property?.assignedBroker || property?.broker;

  // Resolve human advisor name
  let name = b?.user?.name || b?.name || '';
  if (!name && b?.title) {
    if (b.title.includes('DAMAC Lagoons') || b.title.includes('Santorini')) name = 'Elliot Branch';
    else if (b.title.includes('Villanova') || b.title.includes('The Villa')) name = 'Colin Donachie';
    else if (b.title.includes('Town Square')) name = 'Rob Cummins';
    else if (b.title.includes('Dubai South') || b.title.includes('Emaar South') || b.title.includes('Parkside')) name = 'Stecy Belle';
    else if (b.title.includes('Tilal Al Ghaf') || b.title.includes('Harmony')) name = 'Jack Smillie';
    else if (b.title.includes('Citadel') || b.user?.email?.includes('aziz')) name = 'Aziz Mallick';
    else if (b.title.includes('Marina Plaza') || b.user?.email?.includes('hamdi')) name = 'Hamdi Bulugma';
    else if (b.title.includes('Executive Bay') || b.user?.email?.includes('arman')) name = 'Arman Kiomarsi';
    else if (b.title.includes('Control Tower') || b.title.includes('Motor City') || b.user?.email?.includes('hanada')) name = 'Hanada';
    else if (b.title.includes('Commercial')) name = 'Drew Thomson';
    else if (b.title.includes('Prime Residences')) name = 'Omar Farooq';
    else if (b.title.includes('Branded Residences')) name = 'Elena Rostova';
    else if (b.title.includes('Golf Course') || b.title.includes('Villa Specialist')) name = 'Tariq Mansoor';
    else name = b.title;
  }
  if (!name) name = 'Alexander Sterling';

  // Resolve professional title
  let title = b?.title || b?.brokerProfile?.title || '';
  if (!title) {
    title = 'Senior Private Client Advisor';
  }

  const agency = b?.agencyName || 'Nestandkey Luxury Real Estate LLC';
  const photoUrl =
    b?.photoUrl ||
    b?.user?.avatar ||
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80';
  const phone = b?.phone || b?.user?.phone || '+971 58 509 7719';
  const reraNumber = b?.reraNumber || b?.brokerProfile?.reraNumber || 'RERA-48291';
  const brn = b?.brn || b?.brokerProfile?.brn || 'BRN-31920';
  const experienceYears = b?.experienceYears || b?.brokerProfile?.experienceYears || 10;
  const whatsappNumber = b?.whatsappNumber || b?.brokerProfile?.whatsappNumber || '971506653587';
  const rating = b?.rating || b?.brokerProfile?.rating || 4.98;

  return {
    name,
    title,
    agency,
    photoUrl,
    phone,
    reraNumber,
    brn,
    experienceYears,
    whatsappNumber,
    rating
  };
}

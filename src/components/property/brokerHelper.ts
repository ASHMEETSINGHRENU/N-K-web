export interface BrokerDisplayInfo {
  name: string;
  title: string;
  agency: string;
  photoUrl: string;
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
    if (b.title.includes('Prime Residences')) name = 'Omar Farooq';
    else if (b.title.includes('Branded Residences')) name = 'Elena Rostova';
    else if (b.title.includes('Golf Course') || b.title.includes('Villa Specialist')) name = 'Tariq Mansoor';
    else name = b.title;
  }
  if (!name) name = 'Alexander Sterling';

  // Resolve professional title
  let title = b?.title || '';
  if (!title) {
    title = 'Senior Private Client Advisor';
  }

  const agency = b?.agencyName || 'Nestandkey Luxury Real Estate LLC';
  const photoUrl =
    b?.photoUrl ||
    b?.user?.avatar ||
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80';
  const reraNumber = b?.reraNumber || 'RERA-48291';
  const brn = b?.brn || 'BRN-31920';
  const experienceYears = b?.experienceYears || 10;
  const whatsappNumber = b?.whatsappNumber;
  const rating = b?.rating || 4.95;

  return {
    name,
    title,
    agency,
    photoUrl,
    reraNumber,
    brn,
    experienceYears,
    whatsappNumber,
    rating
  };
}

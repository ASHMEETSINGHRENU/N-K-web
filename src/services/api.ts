import { PROPERTIES_DATA, PropertyItem } from '../data/propertiesData';

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? 'https://n-k-server-1.onrender.com/api/v1' : '/api/v1');

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('nestandkey_token');
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}

function filterPropertiesLocal(params: Record<string, any> = {}) {
  let list = [...PROPERTIES_DATA];

  if (params.purpose) {
    const p = String(params.purpose).toUpperCase();
    if (p === 'OFF_PLAN') {
      list = list.filter(
        item =>
          item.purpose === 'OFF_PLAN' ||
          item.completionStatus === 'OFF_PLAN' ||
          item.completionStatus === 'UNDER_CONSTRUCTION' ||
          item.isNewLaunch
      );
    } else if (p === 'BUY') {
      list = list.filter(item => item.purpose === 'BUY');
    } else if (p === 'RENT') {
      list = list.filter(item => item.purpose === 'RENT');
    } else if (p === 'COMMERCIAL_RENT') {
      list = list.filter(
        item =>
          item.purpose === 'COMMERCIAL_RENT' ||
          (item.purpose === 'RENT' &&
            (item.propertyType.toLowerCase().includes('office') ||
              item.propertyType.toLowerCase().includes('commercial')))
      );
    } else if (p === 'COMMERCIAL_BUY') {
      list = list.filter(
        item =>
          item.purpose === 'COMMERCIAL_BUY' ||
          (item.purpose === 'BUY' &&
            (item.propertyType.toLowerCase().includes('office') ||
              item.propertyType.toLowerCase().includes('commercial')))
      );
    }
  }

  if (params.community) {
    const c = String(params.community).toLowerCase().trim();
    list = list.filter(
      item =>
        item.community.toLowerCase().includes(c) ||
        c.includes(item.community.toLowerCase())
    );
  }

  if (params.propertyType) {
    const pt = String(params.propertyType).toLowerCase().trim();
    list = list.filter(
      item =>
        item.propertyType.toLowerCase().includes(pt) ||
        pt.includes(item.propertyType.toLowerCase())
    );
  }

  if (params.bedrooms) {
    const bed = String(params.bedrooms).trim();
    if (bed.toLowerCase() === 'studio') {
      list = list.filter(item => item.bedrooms === 0);
    } else if (bed === '7+' || bed === '7') {
      list = list.filter(item => item.bedrooms >= 7);
    } else if (!isNaN(Number(bed))) {
      list = list.filter(item => item.bedrooms === Number(bed));
    }
  }

  if (params.bathrooms) {
    const bath = String(params.bathrooms).trim();
    if (!isNaN(Number(bath))) {
      list = list.filter(item => item.bathrooms >= Number(bath));
    }
  }

  if (params.minPrice) {
    const minP = Number(params.minPrice);
    if (!isNaN(minP)) {
      list = list.filter(item => item.priceAED >= minP);
    }
  }

  if (params.maxPrice) {
    const maxP = Number(params.maxPrice);
    if (!isNaN(maxP)) {
      list = list.filter(item => item.priceAED <= maxP);
    }
  }

  if (params.minArea) {
    const minA = Number(params.minArea);
    if (!isNaN(minA)) {
      list = list.filter(item => item.builtUpAreaSqFt >= minA);
    }
  }

  if (params.maxArea) {
    const maxA = Number(params.maxArea);
    if (!isNaN(maxA)) {
      list = list.filter(item => item.builtUpAreaSqFt <= maxA);
    }
  }

  if (params.completionStatus) {
    const cs = String(params.completionStatus).toUpperCase().trim();
    if (cs === 'READY') {
      list = list.filter(item => item.completionStatus === 'READY');
    } else if (cs === 'OFF_PLAN') {
      list = list.filter(
        item =>
          item.completionStatus === 'OFF_PLAN' ||
          item.completionStatus === 'UNDER_CONSTRUCTION'
      );
    } else {
      list = list.filter(item => item.completionStatus === cs);
    }
  }

  if (params.developer) {
    const dev = String(params.developer).toLowerCase().trim();
    list = list.filter(
      item => item.developer && item.developer.toLowerCase().includes(dev)
    );
  }

  if (params.furnishing) {
    const fur = String(params.furnishing).toUpperCase().trim();
    list = list.filter(item => item.furnishing === fur);
  }

  if (params.rentalFrequency) {
    const rf = String(params.rentalFrequency).toUpperCase().trim();
    list = list.filter(item => !item.rentalFrequency || item.rentalFrequency === rf);
  }

  if (params.agent) {
    const ag = String(params.agent).toLowerCase().trim();
    list = list.filter(item =>
      item.assignedBroker?.name?.toLowerCase().includes(ag)
    );
  }

  if (params.amenities) {
    const amenityFilters = String(params.amenities)
      .split(',')
      .map(a => a.trim().toLowerCase())
      .filter(Boolean);
    if (amenityFilters.length > 0) {
      list = list.filter(item =>
        amenityFilters.every(af =>
          item.amenities.some(am => am.toLowerCase().includes(af))
        )
      );
    }
  }

  if (params.search) {
    const q = String(params.search).toLowerCase().trim();
    list = list.filter(
      item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.referenceNumber.toLowerCase().includes(q) ||
        item.community.toLowerCase().includes(q) ||
        (item.subCommunity && item.subCommunity.toLowerCase().includes(q)) ||
        (item.developer && item.developer.toLowerCase().includes(q)) ||
        item.propertyType.toLowerCase().includes(q) ||
        item.assignedBroker?.name?.toLowerCase().includes(q)
    );
  }

  // Sorting
  const sort = params.sort || 'price_desc';
  if (sort === 'price_asc') {
    list.sort((a, b) => a.priceAED - b.priceAED);
  } else if (sort === 'price_desc') {
    list.sort((a, b) => b.priceAED - a.priceAED);
  } else if (sort === 'beds_desc') {
    list.sort((a, b) => b.bedrooms - a.bedrooms);
  } else if (sort === 'area_desc') {
    list.sort((a, b) => b.builtUpAreaSqFt - a.builtUpAreaSqFt);
  }

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 20;
  const total = list.length;
  const pages = Math.ceil(total / limit) || 1;
  const paginatedList = list.slice((page - 1) * limit, page * limit);

  return {
    success: true,
    properties: paginatedList,
    pagination: {
      total,
      page,
      limit,
      pages
    }
  };
}

export const api = {
  getProperties: async (params: Record<string, any> = {}) => {
    // Exclusively serve verified properties data with all old BUY listings removed
    return filterPropertiesLocal(params);
  },
  getFeaturedProperties: async () => {
    return {
      success: true,
      properties: PROPERTIES_DATA.filter(p => p.isFeatured)
    };
  },
  getNewLaunches: async () => {
    return {
      success: true,
      properties: PROPERTIES_DATA.filter(
        p =>
          p.isNewLaunch ||
          p.completionStatus === 'OFF_PLAN' ||
          p.completionStatus === 'UNDER_CONSTRUCTION'
      )
    };
  },
  getPropertyBySlug: async (slug: string) => {
    const found = PROPERTIES_DATA.find(
      p =>
        p.slug === slug ||
        p._id === slug ||
        p.referenceNumber.toLowerCase() === slug.toLowerCase()
    );
    if (found) {
      const similarProperties = PROPERTIES_DATA.filter(
        p =>
          p.slug !== found.slug &&
          (p.purpose === found.purpose || p.propertyType === found.propertyType)
      ).slice(0, 3);
      return {
        success: true,
        property: found,
        similarProperties
      };
    }
    try {
      return await fetchApi<{ success: boolean; property: any; similarProperties: any[] }>(
        `/properties/${slug}`
      );
    } catch (err) {
      throw new Error('Property not found');
    }
  },
  getCommunities: () => fetchApi<{ success: boolean; communities: any[] }>('/cms/communities'),
  getCommunityBySlug: (slug: string) => fetchApi<{ success: boolean; community: any }>(`/cms/communities/${slug}`),
  getDevelopers: () => fetchApi<{ success: boolean; developers: any[] }>('/cms/developers'),
  getDeveloperBySlug: (slug: string) => fetchApi<{ success: boolean; developer: any }>(`/cms/developers/${slug}`),
  getLocations: () => fetchApi<{ success: boolean; locations: any[] }>('/cms/locations'),
  getInsights: (category?: string) =>
    fetchApi<{ success: boolean; insights: any[] }>(`/insights${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getInsightBySlug: (slug: string) => fetchApi<{ success: boolean; insight: any; related: any[] }>(`/insights/${slug}`),
  getWebsiteContent: () => fetchApi<{ success: boolean; content: any }>('/cms/website'),
  submitLead: async (leadData: any) => {
    try {
      return await fetchApi<{ success: boolean; message: string; leadReference: string }>('/leads', {
        method: 'POST',
        body: JSON.stringify(leadData)
      });
    } catch (err: any) {
      console.warn('Backend /leads unavailable or offline, recording inquiry locally:', err);
      const fallbackRef = `CS-REF-${Math.floor(100000 + Math.random() * 900000)}`;
      try {
        const queue = JSON.parse(localStorage.getItem('nestandkey_pending_leads') || '[]');
        queue.push({
          ...leadData,
          leadReference: fallbackRef,
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('nestandkey_pending_leads', JSON.stringify(queue));
      } catch (_) {}

      return {
        success: true,
        message: 'Your inquiry has been received by our private advisory desk. A specialist will be in touch shortly.',
        leadReference: fallbackRef
      };
    }
  },
  // Auth endpoints
  login: (credentials: { email: string; password: string }) =>
    fetchApi<{ success: boolean; token: string; user: any; message?: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
  register: (data: { name: string; email: string; password: string; phone?: string; role?: string }) =>
    fetchApi<{ success: boolean; token: string; user: any; message?: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
  getMe: () =>
    fetchApi<{ success: boolean; user: any }>('/auth/me'),
  updateProfile: (data: { name?: string; phone?: string; avatar?: string }) =>
    fetchApi<{ success: boolean; message: string; user: any }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  changePassword: (passwords: { currentPassword: string; newPassword: string }) =>
    fetchApi<{ success: boolean; message: string }>('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(passwords)
    }),
  // Client Inquiries & Leads
  getMyLeads: () =>
    fetchApi<{ success: boolean; count: number; leads: any[] }>('/leads/my'),
  // Notifications
  getNotifications: () =>
    fetchApi<{ success: boolean; count: number; unreadCount: number; notifications: any[] }>('/notifications'),
  markNotificationAsRead: (id: string) =>
    fetchApi<{ success: boolean; notification: any }>(`/notifications/${id}/read`, {
      method: 'PATCH'
    }),
  markAllNotificationsAsRead: () =>
    fetchApi<{ success: boolean; message: string }>('/notifications/read-all', {
      method: 'PATCH'
    })
};


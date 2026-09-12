const BASE_URL = '/api/v1';

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

export const api = {
  getProperties: (params: Record<string, any> = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        query.append(key, String(val));
      }
    });
    return fetchApi<{ success: boolean; properties: any[]; pagination: any }>(`/properties?${query.toString()}`);
  },
  getFeaturedProperties: () => fetchApi<{ success: boolean; properties: any[] }>('/properties/featured'),
  getNewLaunches: () => fetchApi<{ success: boolean; properties: any[] }>('/properties/new-launches'),
  getPropertyBySlug: (slug: string) =>
    fetchApi<{ success: boolean; property: any; similarProperties: any[] }>(`/properties/${slug}`),
  getCommunities: () => fetchApi<{ success: boolean; communities: any[] }>('/cms/communities'),
  getCommunityBySlug: (slug: string) => fetchApi<{ success: boolean; community: any }>(`/cms/communities/${slug}`),
  getDevelopers: () => fetchApi<{ success: boolean; developers: any[] }>('/cms/developers'),
  getDeveloperBySlug: (slug: string) => fetchApi<{ success: boolean; developer: any }>(`/cms/developers/${slug}`),
  getLocations: () => fetchApi<{ success: boolean; locations: any[] }>('/cms/locations'),
  getInsights: (category?: string) =>
    fetchApi<{ success: boolean; insights: any[] }>(`/insights${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getInsightBySlug: (slug: string) => fetchApi<{ success: boolean; insight: any; related: any[] }>(`/insights/${slug}`),
  getWebsiteContent: () => fetchApi<{ success: boolean; content: any }>('/cms/website'),
  submitLead: (leadData: any) =>
    fetchApi<{ success: boolean; message: string; leadReference: string }>('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData)
    })
};

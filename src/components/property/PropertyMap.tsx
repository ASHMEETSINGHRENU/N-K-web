import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  X,
  Compass,
  ArrowUpRight,
  Bed,
  Bath,
  Layers,
  Sparkles,
  Navigation
} from 'lucide-react';
import { formatAED, formatSqFt } from '@nestandkey/utils';

// Source: Google Maps Platform Code Assist
// Internal attribution identifier
const USAGE_ATTRIBUTION = 'gmp_git_agentskills_v1';

interface PropertyMapProps {
  properties: any[];
  hoveredPropertyId?: string | null;
  selectedPropertyId?: string | null;
  onPropertySelect?: (property: any) => void;
  onPropertyHover?: (id: string | null) => void;
  onInquire?: (property: any) => void;
  className?: string;
}

// Dubai prime enclave centers
const DUBAI_COMMUNITY_COORDINATES: Record<string, { lat: number; lng: number; zoom?: number }> = {
  'palm jumeirah': { lat: 25.1185, lng: 55.1325, zoom: 13 },
  'jumeirah bay island': { lat: 25.2155, lng: 55.2415, zoom: 14 },
  'emirates hills': { lat: 25.0746, lng: 55.1683, zoom: 13 },
  'downtown dubai': { lat: 25.1972, lng: 55.2744, zoom: 14 },
  'dubai hills estate': { lat: 25.1112, lng: 55.2592, zoom: 13 },
  'jumeirah golf estates': { lat: 25.0215, lng: 55.1945, zoom: 13 },
  'dubai creek harbour': { lat: 25.1994, lng: 55.3524, zoom: 14 },
  'dubai marina': { lat: 25.0805, lng: 55.1403, zoom: 14 },
  'business bay': { lat: 25.1857, lng: 55.2708, zoom: 14 },
  'difc': { lat: 25.2117, lng: 55.2818, zoom: 14 },
  'bluewaters island': { lat: 25.0792, lng: 55.1221, zoom: 14 },
  'al barari': { lat: 25.0978, lng: 55.3120, zoom: 13 }
};

// Key landmarks for distance & connectivity calculations
const DUBAI_LANDMARKS = [
  { name: 'Burj Khalifa', lat: 25.1972, lng: 55.2744 },
  { name: 'Dubai Int. Airport (DXB)', lat: 25.2532, lng: 55.3657 },
  { name: 'Burj Al Arab', lat: 25.1412, lng: 55.1852 }
];

export function getPropertyCoordinates(property: any): { lat: number; lng: number } {
  if (property?.coordinates?.lat && property?.coordinates?.lng) {
    return property.coordinates;
  }
  const commKey = (property?.community || '').toLowerCase().trim();
  const base = DUBAI_COMMUNITY_COORDINATES[commKey] || { lat: 25.1500, lng: 55.2200 };

  const seed = (property?._id || property?.slug || 'prop')
    .split('')
    .reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  const latOffset = (((seed % 23) - 11) / 23) * 0.009;
  const lngOffset = ((((seed * 7) % 23) - 11) / 23) * 0.009;

  return {
    lat: base.lat + latOffset,
    lng: base.lng + lngOffset
  };
}

export function formatMarkerPrice(priceAED: number): string {
  if (!priceAED) return 'AED 0';
  if (priceAED >= 1000000) {
    const m = priceAED / 1000000;
    return `AED ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (priceAED >= 1000) {
    return `AED ${(priceAED / 1000).toFixed(0)}K`;
  }
  return `AED ${priceAED}`;
}

// Haversine distance in kilometers
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  hoveredPropertyId,
  selectedPropertyId,
  onPropertySelect,
  onPropertyHover,
  onInquire,
  className = ''
}) => {
  const [activePopupProperty, setActivePopupProperty] = useState<any | null>(null);
  const [mapLayer, setMapLayer] = useState<'roadmap' | 'satellite'>('roadmap');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedEnclave, setSelectedEnclave] = useState<string>('all');

  const containerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersMapRef = useRef<Map<string, L.Marker>>(new Map());
  const connectivityLineRef = useRef<L.Polyline | null>(null);

  // High-Resolution Google Maps Tile URLs
  const GOOGLE_ROADMAP_URL =
    'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2';
  const GOOGLE_SATELLITE_HYBRID_URL =
    'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}&scale=2';

  // Compute Enclaves present in current properties
  const availableEnclaves = useMemo(() => {
    const set = new Set<string>();
    properties.forEach((p) => {
      if (p.community) set.add(p.community);
    });
    return Array.from(set).slice(0, 6);
  }, [properties]);

  // Initialize Leaflet Map with Google Maps Tiles
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (leafletMapRef.current) return;

    // Dubai default center
    const defaultCenter: [number, number] = [25.1385, 55.2025];
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
      maxZoom: 19,
      minZoom: 9
    });

    // Add High-Quality Google Maps Tile Layer
    const tileLayer = L.tileLayer(GOOGLE_ROADMAP_URL, {
      maxZoom: 19,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    leafletMapRef.current = map;

    // Invalidate size on resize
    const handleResize = () => {
      map.invalidateSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      map.remove();
      leafletMapRef.current = null;
    };
  }, []);

  // Switch Google Maps Layer (Roadmap vs Satellite)
  useEffect(() => {
    if (!leafletMapRef.current || !tileLayerRef.current) return;
    const url =
      mapLayer === 'satellite'
        ? GOOGLE_SATELLITE_HYBRID_URL
        : GOOGLE_ROADMAP_URL;

    tileLayerRef.current.setUrl(url);
  }, [mapLayer]);

  // Synchronize Markers on Map
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Clear existing markers
    markersMapRef.current.forEach((marker) => marker.remove());
    markersMapRef.current.clear();

    if (properties.length === 0) return;

    const bounds = L.latLngBounds([]);

    properties.forEach((prop) => {
      const coords = getPropertyCoordinates(prop);
      const isSelected = selectedPropertyId === prop._id;
      const isHovered = hoveredPropertyId === prop._id;

      bounds.extend([coords.lat, coords.lng]);

      const priceLabel = formatMarkerPrice(prop.priceAED);

      // Create Custom Luxury Crestshore Pin HTML (Navy, Warm White & Champagne Brass)
      const iconHtml = `
        <div class="crestshore-pin-wrapper group transition-all duration-300 ${
          isSelected || isHovered ? 'scale-110 z-50' : 'hover:scale-105 z-20'
        }" style="transform-origin: center bottom;">
          <div class="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-tight shadow-xl flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
            isSelected || isHovered
              ? 'bg-[#B08D57] text-[#102A43] ring-4 ring-[#B08D57]/40 shadow-2xl border-2 border-[#FFFDF8]'
              : 'bg-[#102A43] text-[#F7F3EA] border border-[#B08D57]/60 hover:bg-[#1E3A5F] hover:text-[#D8C3A5]'
          }">
            <svg class="w-3 h-3 ${isSelected || isHovered ? 'text-[#102A43]' : 'text-[#B08D57]'}" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <span>${priceLabel}</span>
          </div>
          <div class="w-2 h-2 rotate-45 mx-auto -mt-1 shadow-sm ${
            isSelected || isHovered ? 'bg-[#B08D57]' : 'bg-[#102A43]'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-crestshore-pin',
        html: iconHtml,
        iconSize: [110, 36],
        iconAnchor: [55, 34]
      });

      const marker = L.marker([coords.lat, coords.lng], {
        icon: customIcon,
        zIndexOffset: isSelected || isHovered ? 1000 : 100
      }).addTo(map);

      // Marker Interactions
      marker.on('click', () => {
        setActivePopupProperty(prop);
        if (onPropertySelect) onPropertySelect(prop);

        // Center on clicked pin
        map.flyTo([coords.lat, coords.lng], Math.max(map.getZoom(), 13), {
          duration: 0.8
        });
      });

      marker.on('mouseover', () => {
        if (onPropertyHover) onPropertyHover(prop._id);
      });

      marker.on('mouseout', () => {
        if (onPropertyHover) onPropertyHover(null);
      });

      markersMapRef.current.set(prop._id, marker);
    });

    // Auto fit bounds on initial load if multiple properties exist
    if (bounds.isValid() && !selectedPropertyId) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [properties, selectedPropertyId, hoveredPropertyId]);

  // React to hovered or selected property from the external list
  useEffect(() => {
    const targetId = hoveredPropertyId || selectedPropertyId;
    if (!targetId || !leafletMapRef.current) return;

    const prop = properties.find((p) => p._id === targetId);
    if (!prop) return;

    const coords = getPropertyCoordinates(prop);
    const map = leafletMapRef.current;

    // Pan smoothly if selected
    if (selectedPropertyId === targetId) {
      map.panTo([coords.lat, coords.lng], { animate: true, duration: 0.6 });
      setActivePopupProperty(prop);
    }
  }, [hoveredPropertyId, selectedPropertyId, properties]);

  // Handle Connectivity Lines to Dubai Hubs for selected property
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;

    // Clear old line
    if (connectivityLineRef.current) {
      connectivityLineRef.current.remove();
      connectivityLineRef.current = null;
    }

    if (!activePopupProperty) return;

    const coords = getPropertyCoordinates(activePopupProperty);
    // Draw fine Champagne Brass radial connectivity line to Downtown / Burj Khalifa
    const hub = DUBAI_LANDMARKS[0];
    const polyline = L.polyline(
      [
        [coords.lat, coords.lng],
        [hub.lat, hub.lng]
      ],
      {
        color: '#B08D57',
        weight: 2,
        opacity: 0.75,
        dashArray: '6, 6'
      }
    ).addTo(map);

    connectivityLineRef.current = polyline;

    return () => {
      if (connectivityLineRef.current) {
        connectivityLineRef.current.remove();
        connectivityLineRef.current = null;
      }
    };
  }, [activePopupProperty]);

  // Zoom controls
  const handleZoomIn = () => leafletMapRef.current?.zoomIn();
  const handleZoomOut = () => leafletMapRef.current?.zoomOut();

  // Reset to full Dubai view
  const handleResetDubai = () => {
    if (!leafletMapRef.current) return;
    setSelectedEnclave('all');
    setActivePopupProperty(null);
    leafletMapRef.current.flyTo([25.1385, 55.2025], 11, { duration: 1 });
  };

  // Fly to Enclave
  const handleSelectEnclave = (name: string) => {
    setSelectedEnclave(name);
    if (!leafletMapRef.current) return;
    const key = name.toLowerCase().trim();
    const target = DUBAI_COMMUNITY_COORDINATES[key];
    if (target) {
      leafletMapRef.current.flyTo([target.lat, target.lng], target.zoom || 13, {
        duration: 1.2
      });
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
    setTimeout(() => leafletMapRef.current?.invalidateSize(), 200);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[520px] bg-[#F7F3EA] border border-[#E9E1D4] overflow-hidden select-none font-ui ${className}`}
    >
      {/* Real Google Maps Tile Canvas */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-10"
        style={{ minHeight: '520px' }}
      />

      {/* Top Header Controls Strip: Enclaves & Google Map Indicator */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: Google Maps High-Definition Badge */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="bg-[#102A43]/95 backdrop-blur-md text-[#F7F3EA] px-3.5 py-1.5 rounded-sm text-[11px] font-mono uppercase tracking-wider border border-[#B08D57]/50 shadow-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5D7A65] animate-pulse" />
            <span className="font-semibold">Google Maps HD</span>
            <span className="text-[#D8C3A5] font-normal">• {properties.length} Estates</span>
          </div>

          {/* Quick Enclave Jump Pills */}
          <div className="hidden xl:flex items-center gap-1.5 bg-[#FFFDF8]/90 backdrop-blur-md p-1 rounded-sm border border-[#E9E1D4] shadow-md">
            <button
              onClick={handleResetDubai}
              className={`px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded-xs transition-colors ${
                selectedEnclave === 'all'
                  ? 'bg-[#102A43] text-[#F7F3EA] font-semibold'
                  : 'text-[#6B7280] hover:text-[#102A43]'
              }`}
            >
              All Dubai
            </button>
            {availableEnclaves.map((enc) => (
              <button
                key={enc}
                onClick={() => handleSelectEnclave(enc)}
                className={`px-2 py-0.5 text-[10px] uppercase font-mono tracking-wider rounded-xs transition-colors ${
                  selectedEnclave === enc
                    ? 'bg-[#102A43] text-[#F7F3EA] font-semibold'
                    : 'text-[#6B7280] hover:text-[#102A43]'
                }`}
              >
                {enc}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Map View Layer Switcher & Fullscreen */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Satellite / Road Map Toggle */}
          <button
            onClick={() =>
              setMapLayer((prev) => (prev === 'roadmap' ? 'satellite' : 'roadmap'))
            }
            className="bg-[#FFFDF8]/95 backdrop-blur-md hover:bg-[#FFFDF8] text-[#102A43] px-3 py-1.5 rounded-sm text-[11px] font-semibold uppercase tracking-wider border border-[#E9E1D4] hover:border-[#B08D57] shadow-md flex items-center gap-1.5 transition-all"
            title="Toggle Google Maps Satellite / Vector View"
          >
            <Layers className="w-3.5 h-3.5 text-[#B08D57]" />
            <span>{mapLayer === 'roadmap' ? 'Satellite' : 'Street Map'}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-sm bg-[#FFFDF8]/95 hover:bg-[#FFFDF8] text-[#102A43] border border-[#E9E1D4] hover:border-[#B08D57] shadow-md flex items-center justify-center transition-all"
            title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen Map'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#B08D57]" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#B08D57]" />
            )}
          </button>
        </div>
      </div>

      {/* Floating Zoom & Compass Controls */}
      <div className="absolute bottom-6 right-4 z-30 flex flex-col gap-2 shadow-xl">
        <button
          onClick={handleZoomIn}
          className="w-9 h-9 rounded-sm bg-[#FFFDF8] hover:bg-[#F7F3EA] text-[#102A43] border border-[#E9E1D4] hover:border-[#B08D57] flex items-center justify-center transition-colors shadow-sm"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-[#102A43]" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-9 h-9 rounded-sm bg-[#FFFDF8] hover:bg-[#F7F3EA] text-[#102A43] border border-[#E9E1D4] hover:border-[#B08D57] flex items-center justify-center transition-colors shadow-sm"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-[#102A43]" />
        </button>
        <button
          onClick={handleResetDubai}
          className="w-9 h-9 rounded-sm bg-[#102A43] hover:bg-[#1E3A5F] text-[#F7F3EA] border border-[#1E3A5F] flex items-center justify-center transition-colors shadow-sm"
          title="Recenter Entire Dubai Coastline"
        >
          <Compass className="w-4 h-4 text-[#D8C3A5]" />
        </button>
      </div>

      {/* Connected Property Luxury Preview Card (Warm White, Deep Navy, Champagne Brass) */}
      {activePopupProperty && (
        <div className="absolute bottom-6 left-4 right-16 sm:right-auto sm:w-88 z-40 bg-[#FFFDF8] border border-[#E9E1D4] shadow-2xl rounded-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Image & Badge Header */}
          <div className="relative aspect-[16/9] w-full bg-[#102A43] overflow-hidden">
            <img
              src={activePopupProperty.featuredImage}
              alt={activePopupProperty.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B2135]/80 via-transparent to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setActivePopupProperty(null)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#102A43]/80 text-[#F7F3EA] hover:bg-[#102A43] hover:text-[#B08D57] flex items-center justify-center transition-colors z-10"
              title="Close Preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Type badge */}
            <div className="absolute top-2.5 left-2.5 bg-[#102A43]/90 text-[#F7F3EA] text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 border border-[#1E3A5F]">
              {activePopupProperty.propertyType}
            </div>

            {/* Price Badge on Image */}
            <div className="absolute bottom-2.5 left-2.5 text-[#F7F3EA]">
              <span className="font-ui text-lg font-bold text-[#F7F3EA] tracking-tight">
                {formatAED(activePopupProperty.priceAED)}
              </span>
              {activePopupProperty.purpose === 'RENT' && (
                <span className="text-[10px] text-[#E9E1D4]/80 ml-1">/ yr</span>
              )}
            </div>
          </div>

          {/* Details Body */}
          <div className="p-4 space-y-2.5 bg-[#FFFDF8]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#B08D57] uppercase tracking-wider font-mono font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#B08D57]" />
                {activePopupProperty.community}, Dubai
              </span>
              <span className="text-[9px] bg-[#5D7A65]/15 text-[#5D7A65] border border-[#5D7A65]/30 px-1.5 py-0.2 rounded-xs font-mono font-semibold">
                RERA Verified
              </span>
            </div>

            <h4 className="font-display text-lg font-normal text-[#102A43] line-clamp-1 leading-snug">
              {activePopupProperty.title}
            </h4>

            {/* Connectivity to Downtown Hub Indicator */}
            {(() => {
              const coords = getPropertyCoordinates(activePopupProperty);
              const distToDowntown = calculateDistanceKm(
                coords.lat,
                coords.lng,
                DUBAI_LANDMARKS[0].lat,
                DUBAI_LANDMARKS[0].lng
              );
              const approxMins = Math.round(distToDowntown * 1.4);
              return (
                <div className="flex items-center gap-2 py-1.5 px-2 bg-[#F7F3EA] border border-[#E9E1D4] text-[10px] text-[#3E4852] font-mono rounded-xs">
                  <Navigation className="w-3 h-3 text-[#B08D57] shrink-0" />
                  <span>
                    ~{approxMins} mins drive to Burj Khalifa / Downtown ({distToDowntown.toFixed(1)} km)
                  </span>
                </div>
              );
            })()}

            {/* Specifications */}
            <div className="flex items-center justify-between pt-1 text-xs text-[#6B7280]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-[#B08D57]" />
                  {activePopupProperty.bedrooms} Beds
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Bath className="w-3.5 h-3.5 text-[#B08D57]" />
                  {activePopupProperty.bathrooms} Baths
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#102A43] font-semibold">
                {formatSqFt(activePopupProperty.builtUpAreaSqFt)}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <Link
                to={`/property/${activePopupProperty.slug}`}
                className="flex-1 text-center bg-[#102A43] hover:bg-[#1E3A5F] text-[#F7F3EA] py-2 text-[10px] uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-sm"
              >
                View Residence
              </Link>
              {onInquire && (
                <button
                  onClick={() => onInquire(activePopupProperty)}
                  className="px-3.5 py-2 border border-[#B08D57] text-[#102A43] hover:bg-[#B08D57] hover:text-[#102A43] text-[10px] uppercase tracking-wider font-semibold transition-colors rounded-xs"
                >
                  Enquire
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyMap;

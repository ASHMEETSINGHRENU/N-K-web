import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  Maximize2,
  X,
  Compass,
  ArrowUpRight,
  Bed,
  Bath,
  Layers,
  Sparkles
} from 'lucide-react';
import { formatAED, formatSqFt } from '@nestandkey/utils';

interface PropertyMapProps {
  properties: any[];
  hoveredPropertyId?: string | null;
  selectedPropertyId?: string | null;
  onPropertySelect?: (property: any) => void;
  onPropertyHover?: (id: string | null) => void;
  onInquire?: (property: any) => void;
  className?: string;
}

// Coordinate mapping for Dubai prime communities & landmarks
const DUBAI_COMMUNITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  'palm jumeirah': { lat: 25.1185, lng: 55.1325 },
  'jumeirah bay island': { lat: 25.2155, lng: 55.2415 },
  'emirates hills': { lat: 25.0746, lng: 55.1683 },
  'downtown dubai': { lat: 25.1972, lng: 55.2744 },
  'dubai hills estate': { lat: 25.1112, lng: 55.2592 },
  'jumeirah golf estates': { lat: 25.0215, lng: 55.1945 },
  'dubai creek harbour': { lat: 25.1994, lng: 55.3524 },
  'dubai marina': { lat: 25.0805, lng: 55.1403 },
  'business bay': { lat: 25.1857, lng: 55.2708 },
  'difc': { lat: 25.2117, lng: 55.2818 },
  'bluewaters island': { lat: 25.0792, lng: 55.1221 },
  'al barari': { lat: 25.0978, lng: 55.3120 }
};

export function getPropertyCoordinates(property: any): { lat: number; lng: number } {
  if (property?.coordinates?.lat && property?.coordinates?.lng) {
    return property.coordinates;
  }
  const commKey = (property?.community || '').toLowerCase().trim();
  const base = DUBAI_COMMUNITY_COORDINATES[commKey] || { lat: 25.1500, lng: 55.2200 };

  // Stable pseudo-random offset based on property ID or slug so pins in same community don't stack perfectly
  const seed = (property?._id || property?.slug || 'prop')
    .split('')
    .reduce((acc: number, c: string) => acc + c.charCodeAt(0), 0);
  const latOffset = (((seed % 23) - 11) / 23) * 0.007;
  const lngOffset = ((((seed * 7) % 23) - 11) / 23) * 0.007;

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
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [isUsingGoogleMaps, setIsUsingGoogleMaps] = useState(false);

  // Fallback vector map state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const googleMapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Compute bounding box
  const bounds = useMemo(() => {
    if (!properties.length) return null;
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    properties.forEach((p) => {
      const c = getPropertyCoordinates(p);
      if (c.lat < minLat) minLat = c.lat;
      if (c.lat > maxLat) maxLat = c.lat;
      if (c.lng < minLng) minLng = c.lng;
      if (c.lng > maxLng) maxLng = c.lng;
    });
    return { minLat, maxLat, minLng, maxLng };
  }, [properties]);

  // Attempt to load Google Maps JS API if API key exists
  useEffect(() => {
    const apiKey =
      (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY ||
      (window as any).GOOGLE_MAPS_API_KEY ||
      '';

    if (!apiKey) {
      // Graceful fallback to interactive luxury canvas map
      setGoogleMapsLoaded(false);
      setIsUsingGoogleMaps(false);
      return;
    }

    if ((window as any).google?.maps) {
      setGoogleMapsLoaded(true);
      setIsUsingGoogleMaps(true);
      return;
    }

    const scriptId = 'google-maps-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,marker&v=weekly`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleMapsLoaded(true);
        setIsUsingGoogleMaps(true);
      };
      script.onerror = () => {
        console.warn('Google Maps script failed to load. Falling back to luxury interactive map.');
        setGoogleMapsLoaded(false);
        setIsUsingGoogleMaps(false);
      };
      document.head.appendChild(script);
    }
  }, []);

  // Initialize and synchronize Google Maps instance if loaded
  useEffect(() => {
    if (!isUsingGoogleMaps || !googleMapRef.current || !(window as any).google?.maps) {
      return;
    }

    const gmaps = (window as any).google.maps;

    if (!mapInstanceRef.current) {
      const center = bounds
        ? { lat: (bounds.minLat + bounds.maxLat) / 2, lng: (bounds.minLng + bounds.maxLng) / 2 }
        : { lat: 25.15, lng: 55.22 };

      mapInstanceRef.current = new gmaps.Map(googleMapRef.current, {
        center,
        zoom: 11,
        mapTypeId: mapType,
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
        styles: [
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#DCE6EE' }] },
          { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#F7F5F0' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#FFFFFF' }] },
          { featureType: 'poi', elementType: 'all', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', elementType: 'all', stylers: [{ visibility: 'simplified' }] }
        ]
      });
    } else {
      mapInstanceRef.current.setMapTypeId(mapType);
    }

    // Clear old markers
    markersRef.current.forEach((m) => m.setMap && m.setMap(null));
    markersRef.current = [];

    // Create markers for properties
    const gBounds = new gmaps.LatLngBounds();
    properties.forEach((prop) => {
      const coords = getPropertyCoordinates(prop);
      const position = new gmaps.LatLng(coords.lat, coords.lng);
      gBounds.extend(position);

      const isSelected = selectedPropertyId === prop._id;
      const isHovered = hoveredPropertyId === prop._id;

      // Create Custom Price Marker via Overlay
      const marker = new gmaps.Marker({
        position,
        map: mapInstanceRef.current,
        title: `${prop.title} - ${formatMarkerPrice(prop.priceAED)}`,
        icon: {
          path: gmaps.SymbolPath.CIRCLE,
          scale: isSelected || isHovered ? 12 : 9,
          fillColor: isSelected || isHovered ? '#C5A880' : '#18181A',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2
        }
      });

      marker.addListener('click', () => {
        setActivePopupProperty(prop);
        if (onPropertySelect) onPropertySelect(prop);
      });

      marker.addListener('mouseover', () => {
        if (onPropertyHover) onPropertyHover(prop._id);
      });

      marker.addListener('mouseout', () => {
        if (onPropertyHover) onPropertyHover(null);
      });

      markersRef.current.push(marker);
    });

    if (properties.length > 0) {
      mapInstanceRef.current.fitBounds(gBounds, { top: 60, right: 60, bottom: 60, left: 60 });
    }
  }, [isUsingGoogleMaps, properties, mapType]);

  // Keep map centered on hovered or selected property
  useEffect(() => {
    const targetId = hoveredPropertyId || selectedPropertyId;
    if (!targetId) return;

    const prop = properties.find((p) => p._id === targetId);
    if (!prop) return;

    const coords = getPropertyCoordinates(prop);

    if (isUsingGoogleMaps && mapInstanceRef.current && (window as any).google?.maps) {
      mapInstanceRef.current.panTo({ lat: coords.lat, lng: coords.lng });
    }
  }, [hoveredPropertyId, selectedPropertyId, isUsingGoogleMaps, properties]);

  // Handle fallback canvas dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.5, Math.max(0.7, prev + delta)));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setActivePopupProperty(null);
  };

  // Convert lat/lng to normalized SVG/Canvas coordinates (Dubai region: Lat 24.95-25.32, Lng 55.05-55.45)
  const projectCoords = (lat: number, lng: number) => {
    const minLat = 24.98;
    const maxLat = 25.26;
    const minLng = 55.08;
    const maxLng = 55.42;

    const x = ((lng - minLng) / (maxLng - minLng)) * 1000;
    const y = (1 - (lat - minLat) / (maxLat - minLat)) * 750;
    return { x, y };
  };

  return (
    <div
      className={`relative w-full h-full min-h-[500px] bg-[#EEF2F6] border border-[#E5E0D8] overflow-hidden select-none ${className}`}
    >
      {/* Real Google Maps Container */}
      <div
        ref={googleMapRef}
        className={`w-full h-full ${isUsingGoogleMaps ? 'block' : 'hidden'}`}
      />

      {/* Fallback Luxury Interactive Vector Canvas Map */}
      {!isUsingGoogleMaps && (
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full h-full cursor-grab active:cursor-grabbing relative overflow-hidden"
        >
          {/* Transformable Canvas Layer */}
          <div
            style={{
              transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
            className="w-full h-full absolute inset-0"
          >
            {/* Dubai Coastline & Geographic Shapes */}
            <svg
              viewBox="0 0 1000 750"
              className="w-full h-full pointer-events-none"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.04))' }}
            >
              {/* Arabian Gulf Water Background */}
              <rect width="1000" height="750" fill="#D7E4EE" />

              {/* Mainland Dubai Coastline */}
              <path
                d="M -50,750 L 150,560 L 250,500 L 380,440 L 460,370 L 580,280 L 680,220 L 820,160 L 1050,110 L 1050,750 Z"
                fill="#FAF8F5"
                stroke="#E5E0D8"
                strokeWidth="2"
              />

              {/* Coastal Shallows */}
              <path
                d="M -50,750 L 140,550 L 240,490 L 370,430 L 450,360 L 570,270 L 670,210 L 810,150 L 1050,100"
                fill="none"
                stroke="#CCE0ED"
                strokeWidth="12"
                opacity="0.5"
              />

              {/* Palm Jumeirah Island Geometry */}
              <g transform="translate(190, 410) rotate(-22)">
                <ellipse cx="60" cy="50" rx="55" ry="40" fill="#FAF8F5" stroke="#E2DCD3" strokeWidth="1.5" />
                <path d="M 60,95 L 60,25" stroke="#E2DCD3" strokeWidth="4" />
                {/* Fronds */}
                <path d="M 30,35 Q 60,45 90,35 M 25,48 Q 60,58 95,48 M 25,62 Q 60,70 95,62 M 35,75 Q 60,82 85,75" stroke="#D8D0C5" strokeWidth="2.5" fill="none" />
                {/* Crescent */}
                <path d="M 0,55 A 65 50 0 0 1 120,55" fill="none" stroke="#FAF8F5" strokeWidth="8" />
                <path d="M 0,55 A 65 50 0 0 1 120,55" fill="none" stroke="#E2DCD3" strokeWidth="1.5" />
              </g>

              {/* Jumeirah Bay Island (Seahorse shape) */}
              <path
                d="M 460,310 C 475,300 495,305 490,320 C 485,335 465,340 455,330 Z"
                fill="#FAF8F5"
                stroke="#E2DCD3"
                strokeWidth="1.5"
              />

              {/* Dubai Marina & Bluewaters */}
              <path
                d="M 120,560 L 220,510"
                stroke="#CCE0ED"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle cx="95" cy="555" r="14" fill="#FAF8F5" stroke="#E2DCD3" strokeWidth="1.5" />

              {/* Major Highway Corridors (Sheikh Zayed Road E11 & Al Khail E44) */}
              <path
                d="M 0,690 Q 300,500 600,280 T 1000,60"
                fill="none"
                stroke="#EDE7DD"
                strokeWidth="5"
                strokeDasharray="6 4"
              />
              <path
                d="M 80,740 Q 350,540 680,310 T 1000,120"
                fill="none"
                stroke="#EDE7DD"
                strokeWidth="4"
              />

              {/* Community Boundary Labels */}
              <text x="180" y="495" fill="#A8A29E" fontSize="11" fontFamily="sans-serif" letterSpacing="0.1em" fontWeight="600">
                PALM JUMEIRAH
              </text>
              <text x="440" y="295" fill="#A8A29E" fontSize="10" fontFamily="sans-serif" letterSpacing="0.1em" fontWeight="600">
                JUMEIRAH BAY
              </text>
              <text x="560" y="345" fill="#A8A29E" fontSize="11" fontFamily="sans-serif" letterSpacing="0.1em" fontWeight="600">
                DOWNTOWN DUBAI
              </text>
              <text x="460" y="475" fill="#A8A29E" fontSize="11" fontFamily="sans-serif" letterSpacing="0.1em" fontWeight="600">
                DUBAI HILLS ESTATE
              </text>
              <text x="260" y="585" fill="#A8A29E" fontSize="10" fontFamily="sans-serif" letterSpacing="0.1em" fontWeight="600">
                EMIRATES HILLS
              </text>
              <text x="110" y="595" fill="#A8A29E" fontSize="10" fontFamily="sans-serif" letterSpacing="0.1em" fontWeight="600">
                DUBAI MARINA
              </text>
              <text x="680" y="320" fill="#A8A29E" fontSize="10" fontFamily="sans-serif" letterSpacing="0.1em" fontWeight="600">
                CREEK HARBOUR
              </text>
            </svg>

            {/* Interactive Property Markers */}
            <div className="absolute inset-0">
              {properties.map((prop) => {
                const coords = getPropertyCoordinates(prop);
                const pos = projectCoords(coords.lat, coords.lng);

                const isSelected = selectedPropertyId === prop._id || activePopupProperty?._id === prop._id;
                const isHovered = hoveredPropertyId === prop._id;

                const leftPercent = (pos.x / 1000) * 100;
                const topPercent = (pos.y / 750) * 100;

                return (
                  <div
                    key={prop._id}
                    style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 z-20 ${
                      isSelected || isHovered ? 'scale-110 z-40' : 'hover:scale-105'
                    }`}
                    onMouseEnter={() => onPropertyHover && onPropertyHover(prop._id)}
                    onMouseLeave={() => onPropertyHover && onPropertyHover(null)}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePopupProperty(prop);
                      if (onPropertySelect) onPropertySelect(prop);
                    }}
                  >
                    {/* Price Marker Badge */}
                    <div
                      className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-tight shadow-lg border transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                        isSelected || isHovered
                          ? 'bg-[#C5A880] text-[#18181A] border-[#FFFFFF] shadow-xl ring-2 ring-[#C5A880]/60'
                          : 'bg-[#18181A] text-[#F7F5F0] border-[#C5A880]/40 hover:bg-[#C5A880] hover:text-[#18181A]'
                      }`}
                    >
                      <MapPin className="w-2.5 h-2.5 shrink-0" />
                      <span>{formatMarkerPrice(prop.priceAED)}</span>
                    </div>

                    {/* Small Pin Pointer */}
                    <div
                      className={`w-1.5 h-1.5 rotate-45 mx-auto -mt-1 ${
                        isSelected || isHovered ? 'bg-[#C5A880]' : 'bg-[#18181A]'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Top Map Status & Layer Controls */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <div className="bg-[#18181A]/90 backdrop-blur-md text-[#F7F5F0] px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-widest border border-[#C5A880]/30 shadow-md flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{properties.length} Dubai Coordinates</span>
        </div>

        {/* Map Type Switcher */}
        <button
          onClick={() => setMapType((prev) => (prev === 'roadmap' ? 'satellite' : 'roadmap'))}
          className="bg-[#FDFCF9]/90 backdrop-blur-md hover:bg-[#FDFCF9] text-[#18181A] px-2.5 py-1.5 rounded text-[10px] font-medium uppercase tracking-wider border border-[#E5E0D8] shadow-md flex items-center gap-1.5 transition-colors"
          title="Toggle Satellite / Street View"
        >
          <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>{mapType === 'roadmap' ? 'Satellite' : 'Street'}</span>
        </button>
      </div>

      {/* Floating Zoom & Center Controls */}
      <div className="absolute bottom-4 right-4 z-30 flex flex-col gap-1.5 shadow-lg">
        <button
          onClick={() => handleZoom(0.25)}
          className="w-8 h-8 rounded bg-[#FDFCF9] hover:bg-[#F7F5F0] text-[#18181A] border border-[#E5E0D8] flex items-center justify-center transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom(-0.25)}
          className="w-8 h-8 rounded bg-[#FDFCF9] hover:bg-[#F7F5F0] text-[#18181A] border border-[#E5E0D8] flex items-center justify-center transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetView}
          className="w-8 h-8 rounded bg-[#FDFCF9] hover:bg-[#F7F5F0] text-[#18181A] border border-[#E5E0D8] flex items-center justify-center transition-colors"
          title="Recenter Dubai Coastline"
        >
          <Compass className="w-4 h-4 text-[#C5A880]" />
        </button>
      </div>

      {/* Synchronized Property Preview Card Popup */}
      {activePopupProperty && (
        <div className="absolute bottom-4 left-4 right-14 sm:right-auto sm:w-80 z-40 bg-[#FDFCF9] border border-[#E5E0D8] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="relative aspect-[16/9] w-full bg-[#18181A] overflow-hidden">
            <img
              src={activePopupProperty.featuredImage}
              alt={activePopupProperty.title}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setActivePopupProperty(null)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-[#0B0B0C]/70 text-[#F7F5F0] hover:bg-[#0B0B0C] flex items-center justify-center transition-colors"
              title="Close Preview"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-2.5 left-2.5 bg-[#0B0B0C]/80 text-[#C5A880] text-[9px] uppercase tracking-widest font-mono px-2 py-0.5 border border-[#C5A880]/30">
              {activePopupProperty.propertyType}
            </div>
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-medium text-[#18181A]">
                {formatAED(activePopupProperty.priceAED)}
              </span>
              <span className="text-[10px] text-[#71717A] uppercase tracking-wider font-mono">
                {activePopupProperty.community}
              </span>
            </div>

            <h4 className="font-serif text-xs font-normal text-[#18181A] line-clamp-1 leading-snug">
              {activePopupProperty.title}
            </h4>

            <div className="flex items-center gap-3 pt-2 border-t border-[#E5E0D8] text-[11px] text-[#52525B]">
              <span className="flex items-center gap-1">
                <Bed className="w-3 h-3 text-[#C5A880]" />
                {activePopupProperty.bedrooms} Beds
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Bath className="w-3 h-3 text-[#C5A880]" />
                {activePopupProperty.bathrooms} Baths
              </span>
              <span>•</span>
              <span>{formatSqFt(activePopupProperty.builtUpAreaSqFt)}</span>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Link
                to={`/property/${activePopupProperty.slug}`}
                className="flex-1 text-center bg-[#18181A] hover:bg-[#0B0B0C] text-[#F7F5F0] hover:text-[#C5A880] py-2 text-[10px] uppercase tracking-widest font-medium transition-colors"
              >
                View Residence
              </Link>
              {onInquire && (
                <button
                  onClick={() => onInquire(activePopupProperty)}
                  className="px-3 py-2 border border-[#C5A880] text-[#18181A] hover:bg-[#C5A880] text-[10px] uppercase tracking-wider font-semibold transition-colors"
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

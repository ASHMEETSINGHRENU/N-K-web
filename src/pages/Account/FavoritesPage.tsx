import React, { useState, useEffect } from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { api } from '../../services/api';
import { PropertyCard } from '../../components/property/PropertyCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useFavorites();
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      setIsLoading(true);
      try {
        const res = await api.getProperties();
        const all = res.properties || [];
        const filtered = all.filter((p: any) => favorites.includes(p._id));
        setProperties(filtered);
      } catch (err) {
        console.error('Failed to load favorites:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadFavorites();
  }, [favorites]);

  return (
    <div className="pt-28 pb-24 bg-[#F7F3EA] min-h-screen font-ui">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E9E1D4] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B08D57] font-semibold block mb-2">
              Personal Vault
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-[#102A43] font-normal">
              Saved Residences ({properties.length})
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-[#FFFDF8] animate-pulse border border-[#E9E1D4]" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 bg-[#FFFDF8] border border-[#E9E1D4] p-8 shadow-sm">
            <Heart className="w-12 h-12 text-[#B08D57]/40 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-[#102A43] mb-2 font-normal">
              No Saved Residences Yet
            </h3>
            <p className="text-xs text-[#6B7280] max-w-sm mx-auto mb-6">
              Browse our curated Dubai luxury properties and click the heart icon on any residence to save it to your private portfolio.
            </p>
            <Link
              to="/properties"
              className="bg-[#102A43] hover:bg-[#0B2135] text-[#FFFDF8] hover:text-[#D8C3A5] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop._id} property={prop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default FavoritesPage;

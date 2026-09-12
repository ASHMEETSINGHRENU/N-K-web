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
    <div className="pt-28 pb-24 bg-[#FDFCF9] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12 pb-6 border-b border-[#E5E0D8] flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-semibold block mb-2">
              Personal Vault
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#18181A] font-light">
              Saved Residences ({properties.length})
            </h1>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-[#F7F5F0] animate-pulse border border-[#E5E0D8]" />
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 bg-[#F7F5F0] border border-[#E5E0D8] p-8">
            <Heart className="w-12 h-12 text-[#C5A880]/40 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-[#18181A] mb-2 font-light">
              No Saved Residences Yet
            </h3>
            <p className="text-xs text-[#71717A] max-w-sm mx-auto mb-6">
              Browse our curated Dubai luxury properties and click the heart icon on any residence to save it to your private portfolio.
            </p>
            <Link
              to="/properties"
              className="bg-[#18181A] text-[#F7F5F0] hover:text-[#C5A880] px-6 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all inline-flex items-center gap-2"
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

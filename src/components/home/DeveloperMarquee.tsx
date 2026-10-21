import React from 'react';
import { Link } from 'react-router-dom';

type DeveloperWordmark = {
  id: string;
  name: string;
  label: string;
  href: string;
};

/**
 * Official logo files are not in the project. These are typographic wordmarks,
 * not redrawn trademarks.
 */
const DEVELOPERS: DeveloperWordmark[] = [
  { id: 'emaar', name: 'Emaar', label: 'Emaar Properties', href: '/developers/emaar-properties' },
  { id: 'damac', name: 'DAMAC', label: 'DAMAC Properties', href: '/developers/damac-properties' },
  { id: 'nakheel', name: 'Nakheel', label: 'Nakheel', href: '/developers/nakheel' },
  { id: 'dubai-properties', name: 'Dubai Properties', label: 'Dubai Properties', href: '/developers' },
  { id: 'sobha', name: 'Sobha', label: 'Sobha Realty', href: '/developers/sobha-realty' },
  { id: 'meraas', name: 'Meraas', label: 'Meraas', href: '/developers/meraas' },
  { id: 'binghatti', name: 'Binghatti', label: 'Binghatti', href: '/developers' },
  { id: 'ellington', name: 'Ellington', label: 'Ellington Properties', href: '/developers/ellington-properties' },
  { id: 'select-group', name: 'Select Group', label: 'Select Group', href: '/developers' },
  { id: 'omniyat', name: 'Omniyat', label: 'Omniyat', href: '/developers/omniyat' },
  { id: 'danube', name: 'Danube', label: 'Danube Properties', href: '/developers' },
  { id: 'azizi', name: 'Azizi', label: 'Azizi Developments', href: '/developers/azizi-developments' },
  { id: 'aldar', name: 'Aldar', label: 'Aldar Properties', href: '/developers' },
  { id: 'mag', name: 'MAG', label: 'MAG Property Development', href: '/developers' },
  { id: 'samana', name: 'Samana', label: 'Samana Developers', href: '/developers' },
  { id: 'wasl', name: 'Wasl', label: 'Wasl', href: '/developers' },
  { id: 'imtiaz', name: 'Imtiaz', label: 'Imtiaz Developments', href: '/developers' },
  { id: 'deyaar', name: 'Deyaar', label: 'Deyaar Development', href: '/developers' }
];

function Wordmark({ brand }: { brand: DeveloperWordmark }) {
  return (
    <Link
      to={brand.href}
      aria-label={brand.label}
      className="shrink-0 whitespace-nowrap font-display text-[1.65rem] leading-none tracking-[0.14em] text-[#102A43] transition-colors hover:text-[#B08D57] sm:text-3xl"
    >
      {brand.name}
    </Link>
  );
}

function Sequence({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {DEVELOPERS.map((brand) => (
        <li key={`${brand.id}-${hidden ? 'copy' : 'origin'}`} className="flex items-center">
          <span className="px-7 sm:px-10">
            {hidden ? (
              <span className="shrink-0 whitespace-nowrap font-display text-[1.65rem] leading-none tracking-[0.14em] text-[#102A43] sm:text-3xl">
                {brand.name}
              </span>
            ) : (
              <Wordmark brand={brand} />
            )}
          </span>
          <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-[#B08D57]" />
        </li>
      ))}
    </ul>
  );
}

export const DeveloperMarquee: React.FC = () => {
  return (
    <section aria-label="Dubai developers" className="bg-[#F7F3EA] border-y border-[#E9E1D4]">
      <p className="crest-kicker pt-8 text-center text-[#B08D57]">Developers</p>

      <div className="mx-auto hidden max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-4 px-5 py-8 motion-reduce:flex">
        {DEVELOPERS.map((brand) => (
          <Wordmark key={brand.id} brand={brand} />
        ))}
      </div>

      <div className="overflow-hidden py-7 motion-reduce:hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="developer-marquee-track flex w-max">
          <Sequence />
          <Sequence hidden />
        </div>
      </div>
    </section>
  );
};

export default DeveloperMarquee;

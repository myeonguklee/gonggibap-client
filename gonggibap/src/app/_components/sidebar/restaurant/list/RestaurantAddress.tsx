import { MapPinned } from 'lucide-react';

export function RestaurantAddress({ address }: { address: string }) {
  return (
    <>
      <address className="hidden md:flex items-center gap-1 not-italic text-single-line">
        <MapPinned size="1rem" />
        {address.split(' ').slice(2).join(' ')}
      </address>
      <address className="md:hidden flex items-center gap-1 not-italic text-single-line">
        <MapPinned size="1rem" />
        {address}
      </address>
    </>
  );
}

import { MapPinned } from 'lucide-react';

export function RestaurantAddress({ address }: { address: string }) {
  return (
    <>
      <address className="hidden items-center gap-1 not-italic text-single-line md:flex">
        <MapPinned size="1rem" />
        {address.split(' ').slice(2).join(' ')}
      </address>
      <address className="flex items-center gap-1 not-italic text-single-line md:hidden">
        <MapPinned size="1rem" />
        {address}
      </address>
    </>
  );
}

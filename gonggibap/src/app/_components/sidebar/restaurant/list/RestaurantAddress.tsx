import { MapPinned } from "lucide-react";

export const RestaurantAddress = ({ address }: { address: string }) => (
  <address className="flex items-center gap-1 not-italic text-single-line">
    <MapPinned size="1rem" />
    {address.split(" ").slice(2).join(" ")}
  </address>
);

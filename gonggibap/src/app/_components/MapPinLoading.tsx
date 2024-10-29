import { MapPin } from 'lucide-react';

export const MapPinLoading = () => {
  const pins = [0, 150, 300].map((delay, index) => (
    <div 
      key={index} 
      className="mx-2 animate-bounce"
      style={{ animationDelay: `${delay}ms` }}
    >
      <MapPin 
        size={28} 
        color="#FF7058" 
        strokeWidth={2}
        fill="#FF7058"
      />
    </div>
  ));

  return (
    <div className="w-full h-full flex-center p-4">
      {pins}
    </div>
  );
};
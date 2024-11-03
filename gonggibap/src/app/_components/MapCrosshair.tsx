export const MapCrosshair = () => {
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
      <div className="relative w-4 h-4">
        <div
          className="absolute left-1/2 top-0 h-full bg-gray-500 -translate-x-1/2"
          style={{ width: '1px' }}
        />
        <div
          className="absolute top-1/2 left-0 w-full bg-gray-500 -translate-y-1/2"
          style={{ height: '1px' }}
        />
      </div>
    </div>
  );
};

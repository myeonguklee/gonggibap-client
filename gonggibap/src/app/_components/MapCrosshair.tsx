export const MapCrosshair = () => {
  return (
    <div className="pointer-events-none fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
      <div className="relative size-4">
        <div
          className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-gray-500"
          style={{ width: '1px' }}
        />
        <div
          className="absolute left-0 top-1/2 w-full -translate-y-1/2 bg-gray-500"
          style={{ height: '1px' }}
        />
      </div>
    </div>
  );
};

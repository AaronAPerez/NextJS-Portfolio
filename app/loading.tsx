export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="flex flex-col items-center gap-4">
        {/* Animated gradient loader */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-spin"
            style={{
              maskImage: 'radial-gradient(transparent 40%, black 40%)',
              WebkitMaskImage: 'radial-gradient(transparent 40%, black 40%)'
            }}
          />
        </div>
        <p className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          Loading Portfolio...
        </p>
      </div>
    </div>
  );
}

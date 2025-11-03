import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-chick-yellow via-chick-golden to-chick-sunset py-8 px-4 border-b-4 border-chick-orange shadow-lg">
      <div className="max-w-7xl mx-auto text-center">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
          Chick Central 🍗
        </h1>
        
        {/* Tagline */}
        <p className="text-2xl md:text-3xl font-bold text-white mb-4 drop-shadow-md">
          Flavored wings that hit different! 🔥
        </p>
        
        {/* Features */}
        <div className="flex flex-wrap justify-center items-center gap-3 text-white font-semibold text-sm md:text-base mb-3">
          <span className="bg-chick-orange px-4 py-2 rounded-full shadow-md">
            8 saucy flavors
          </span>
          <span className="text-white text-xl">|</span>
          <span className="bg-chick-orange px-4 py-2 rounded-full shadow-md">
            Rice meals & ala carte
          </span>
          <span className="text-white text-xl">|</span>
          <span className="bg-chick-orange px-4 py-2 rounded-full shadow-md">
            Pang-masa sarap 💯
          </span>
        </div>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white font-medium italic drop-shadow-md">
          Serving joy, one bite at a time
        </p>
      </div>
    </div>
  );
};

export default Hero;

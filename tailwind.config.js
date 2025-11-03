/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        chick: {
          // Primary yellows (matching logo)
          yellow: '#FFD700',      // Bright golden yellow (logo background)
          golden: '#FFC107',      // Vibrant golden
          sunset: '#FFB300',      // Warm sunset
          
          // Accent colors
          orange: '#FF9800',      // Warm orange accent
          red: '#E53935',         // Chicken red (comb/wattle)
          
          // Brown tones (matching logo banner)
          brown: '#6B4423',       // Chocolate brown (logo banner)
          darkBrown: '#5D4037',   // Rich dark brown
          lightBrown: '#8D6E63',  // Light brown accent
          dark: '#3E2723',        // Deep brown
          
          // Neutral tones
          cream: '#FFFBF0',       // Soft cream (egg white)
          beige: '#FFF8E1',       // Light beige
          white: '#FFFFFF',       // Pure white
          
          // Supporting colors
          sage: '#9CAF88',        // Fresh herbs
          charcoal: '#212121',    // Deep charcoal
        },
        // Keep ramen for backwards compatibility
        ramen: {
          red: '#E63946',
          dark: '#2D1B00',
          charcoal: '#1A1A1A',
          cream: '#FFF8E7',
          beige: '#F4E4C1',
          gold: '#F5A623',
          sesame: '#D4C5A9',
          seaweed: '#1F2937',
          kimchi: '#FF6B35'
        },
        cream: {
          100: '#FFF8E7',  // Light cream (matches chick-cream)
          200: '#F4E4C1',  // Medium cream (matches chick-beige)
        }
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'system-ui', 'sans-serif'],
        'noto-kr': ['Noto Serif KR', 'serif'],
        'playfair': ['Playfair Display', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-4px)' },
          '60%': { transform: 'translateY(-2px)' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
};
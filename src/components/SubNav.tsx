import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <div className="sticky top-16 z-40 bg-chick-beige/95 backdrop-blur-md border-b-2 border-chick-golden shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 overflow-x-auto py-4 scrollbar-hide">
          {loading ? (
            <div className="flex space-x-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-9 w-20 bg-chick-cream rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick('all')}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 shadow-md ${
                  selectedCategory === 'all'
                    ? 'bg-chick-orange text-white border-chick-orange scale-105'
                    : 'bg-white text-chick-dark border-chick-golden hover:border-chick-orange hover:scale-105'
                }`}
              >
                🔥 All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCategoryClick(c.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border-2 flex items-center space-x-1.5 shadow-md ${
                    selectedCategory === c.id
                      ? 'bg-chick-orange text-white border-chick-orange scale-105'
                      : 'bg-white text-chick-dark border-chick-golden hover:border-chick-orange hover:scale-105'
                  }`}
                >
                  <span className="text-base">{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;



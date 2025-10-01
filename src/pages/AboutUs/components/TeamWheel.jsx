import { useEffect, useState, useRef } from 'react';
import { cn } from './lib/utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export function TeamWheel({ items, activeItem, onItemChange, offsetTop = 0, offsetBottom = 0 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolling = useRef(false);

  // Set initial index
  useEffect(() => {
    const index = items.findIndex(item => item.id === activeItem);
    if (index !== -1) setCurrentIndex(index);
  }, [activeItem, items]);

  // Update window dimensions
  useEffect(() => {
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle wheel
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;

      let newIndex = currentIndex;
      if (e.deltaY > 0) newIndex = (currentIndex + 1) % items.length;
      else newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;

      setCurrentIndex(newIndex);
      onItemChange(items[newIndex].id);

      setTimeout(() => { isScrolling.current = false; }, 300);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, items, onItemChange]);

  // Vertical semicircle positions
  const getItemPosition = (index) => {
    const totalItems = items.length;
    const angle = (Math.PI / (totalItems - 1)) * index;

    const radius = dimensions.width < 640 ? 120 : 220;
    const centerX = dimensions.width < 640 ? 70 : 140;
    const centerY = dimensions.width < 640 ? radius + 40 : 320;

    const x = centerX + radius * Math.sin(angle);
    const y = centerY - radius * Math.cos(angle);
    return { x, y };
  };

  const getItemSize = () => {
    if (dimensions.width < 480) return 12;
    if (dimensions.width < 768) return 14;
    return 16;
  };

  const iconSize = getItemSize() + 8;
  const isMobile = dimensions.width < 640;
  const colorMap = {
    'warrior-gold': {
      text: 'text-yellow-400',
      bg: 'bg-yellow-400',
      border: 'border-yellow-400',
      shadow: 'shadow-yellow-400/30'
    },
    'warrior-blue': {
      text: 'text-blue-400',
      bg: 'bg-blue-400',
      border: 'border-blue-400',
      shadow: 'shadow-blue-400/30'
    },
    'warrior-crimson': {
      text: 'text-red-500',
      bg: 'bg-red-500',
      border: 'border-red-500',
      shadow: 'shadow-red-500/30'
    }
  };

  return (
    <>
      {/* FAB button for mobile */}
      {isMobile && (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="fixed left-0 transform -translate-x-1/2 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg z-50 text-background"
          style={{
            top: '50%',
            height: 48,
            width: 48,
          }}
        >
          {mobileOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      )}

      {/* Wheel container */}
      {(!isMobile || mobileOpen) && (
        <div
          className={cn(
            "relative transition-all duration-500",
            isMobile ? "w-full" : "w-72"
          )}
        >
          <div className="relative w-full h-full py-8">

            {items.map((item, index) => {
              const { x, y } = getItemPosition(index);
              const isActive = index === currentIndex;
              const Icon = item.icon;
              const size = getItemSize();
              const colors = colorMap[item.color] || colorMap['warrior-gold'];

              return (
                <div
                  key={item.id}
                  className={cn(
                    `absolute rounded-full border-2 transition-all duration-500 flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 w-${size} h-${size}`,
                    isActive
                      ? `${colors.bg.replace('bg-','bg-')}\/20 ${colors.border} scale-105`
                      : "bg-neutral-800/50 border-neutral-600 hover:border-yellow-400/50 hover:scale-105"
                  )}
                  style={{ left: x, top: y }}
                  onClick={() => {
                    setCurrentIndex(index);
                    onItemChange(item.id);
                  }}
                >
                  <Icon
                    size={isActive ? iconSize : iconSize - 4}
                    className={cn(
                      "transition-all duration-300",
                      isActive ? colors.text : "text-muted-foreground"
                    )}
                  />
                  {!isMobile && (
                    <div
                      className={cn(
                        "absolute left-20 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-xs font-inter font-medium transition-all duration-300",
                        isActive ? colors.text : "text-muted-foreground"
                      )}
                    >
                      {item.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                  )}
                </div>
              );
            })}

            <div
              className="absolute rounded-full border-2 transition-all duration-500 pointer-events-none"
              style={{
                width: dimensions.width < 480 ? 20 : 24,
                height: dimensions.width < 480 ? 20 : 24,
                left: getItemPosition(currentIndex).x,
                top: getItemPosition(currentIndex).y,
                borderColor: 'rgba(255, 215, 0, 0.3)',
                background: 'rgba(255, 215, 0, 0.1)',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}

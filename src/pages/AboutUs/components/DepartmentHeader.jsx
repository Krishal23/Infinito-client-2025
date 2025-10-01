import { Badge } from '../../../components/Admin/ui/badge';
import { cn } from './lib/utils';


export function DepartmentHeader({ 
  name, 
  description, 
  memberCount, 
  icon: Icon, 
  accentColor 
}) {
  const colorMap = {
    'warrior-gold': {
      text: 'text-yellow-400',
      bg: 'bg-yellow-400',
      border: 'border-yellow-400',
    },
    'warrior-blue': {
      text: 'text-blue-400',
      bg: 'bg-blue-400',
      border: 'border-blue-400',
    },
    'warrior-crimson': {
      text: 'text-red-500',
      bg: 'bg-red-500',
      border: 'border-red-500',
    }
  };
  const colors = colorMap[accentColor] || colorMap['warrior-gold'];
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-imperial opacity-50 rounded-lg" />
      
      <div className="relative bg-imperial-shadow border border-imperial-mist rounded-lg p-8 shadow-imperial">
        <div className="flex items-center gap-6">
          <div className={cn(
            "w-20 h-20 rounded-full bg-imperial-steel border-2",
            `${colors.border} flex items-center justify-center`,
            "shadow-warrior"
          )}>
            <Icon size={32} className={colors.text} />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-imperial font-bold text-foreground">
                {name}
              </h1>
              <Badge
                variant="secondary"
                className={cn(
                  "text-sm font-inter font-semibold",
                  `${colors.bg.replace('bg-','bg-')}\/10 ${colors.text} ${colors.border}`
                )}
              >
                {memberCount} Warriors
              </Badge>
            </div>
            <p className="text-muted-foreground font-inter text-lg">
              {description}
            </p>
          </div>
        </div>
        
        {/* Decorative Border */}
        <div className={cn(
          "absolute bottom-0 left-8 right-8 h-1 rounded-full",
          "bg-gradient-to-r from-transparent to-transparent",
        )} />
      </div>
    </div>
  );
}
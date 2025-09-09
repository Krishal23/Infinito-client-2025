import { Badge } from '../../../components/Admin/ui/badge';
import { cn } from './lib/utils';


export function DepartmentHeader({ 
  name, 
  description, 
  memberCount, 
  icon: Icon, 
  accentColor 
}) {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-imperial opacity-50 rounded-lg" />
      
      <div className="relative bg-imperial-shadow border border-imperial-mist rounded-lg p-8 shadow-imperial">
        <div className="flex items-center gap-6">
          <div className={cn(
            "w-20 h-20 rounded-full bg-imperial-steel border-2",
            `border-${accentColor}/30 flex items-center justify-center`,
            "shadow-warrior"
          )}>
            <Icon size={32} className={`text-${accentColor}`} />
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
                  `bg-${accentColor}/10 text-${accentColor} border-${accentColor}/30`
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
          `bg-gradient-to-r from-transparent via-${accentColor}/50 to-transparent`
        )} />
      </div>
    </div>
  );
}
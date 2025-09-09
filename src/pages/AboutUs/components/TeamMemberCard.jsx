import { Badge } from '../../../components/Admin/ui/badge';
import { Card } from '../../../components/Admin/ui/card';
import { cn } from './lib/utils';


export function TeamMemberCard({ member, accentColor = 'warrior-gold' }) {
  const statusColors = {
    active: 'bg-green-500',
    busy: 'bg-amber-500',
    offline: 'bg-gray-500'
  };

  return (
    <Card className="bg-imperial-shadow border-imperial-mist hover:border-warrior-gold/30 transition-all duration-300 group shadow-imperial hover:shadow-warrior p-6">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar */}
        <div className="relative">
          <div className={cn(
            "w-24 h-24 rounded-full bg-imperial-steel border-2 border-imperial-mist",
            "flex items-center justify-center text-2xl font-imperial font-bold text-warrior-gold",
            "group-hover:border-warrior-gold/50 transition-all duration-300"
          )}>
            {member.image ? (
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              member.name.split(' ').map(n => n[0]).join('').toUpperCase()
            )}
          </div>
          <div className={cn(
            "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-imperial-shadow",
            statusColors[member.status]
          )} />
        </div>

        {/* Info */}
        <div className="space-y-2">
          <h3 className="font-imperial font-semibold text-lg text-foreground">
            {member.name}
          </h3>
          <p className="text-warrior-gold font-inter font-medium text-sm">
            {member.role}
          </p>
          <p className="text-muted-foreground font-inter text-xs">
            {member.department}
          </p>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {member.skills.slice(0, 3).map((skill, index) => (
            <Badge 
              key={index}
              variant="secondary"
              className="text-xs bg-imperial-steel/50 text-muted-foreground border-imperial-mist"
            >
              {skill}
            </Badge>
          ))}
          {member.skills.length > 3 && (
            <Badge 
              variant="secondary"
              className="text-xs bg-warrior-gold/10 text-warrior-gold border-warrior-gold/30"
            >
              +{member.skills.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
import { useState } from 'react';
import { TeamWheel } from './components/TeamWheel.jsx';
import { TeamMemberCard } from './components/TeamMemberCard.jsx';
import { DepartmentHeader } from './components/DepartmentHeader.jsx';
import { teamMembers, departmentInfo } from './data/teamMembers.js';
import { 
  Users, 
  Megaphone, 
  Calendar, 
  UserCheck, 
  Camera, 
  Tv, 
  Trophy, 
  Palette, 
  Code, 
  Coffee 
} from 'lucide-react';

const wheelItems = [
  { id: 'coordinators', name: 'FEST COORDINATORS', icon: Users, color: 'warrior-gold' },
  { id: 'marketing', name: 'MARKETING & SPONSORSHIP', icon: Megaphone, color: 'warrior-blue' },
  { id: 'events', name: 'EVENTS & PLANNING', icon: Calendar, color: 'warrior-crimson' },
  { id: 'registration', name: 'REGISTRATION', icon: UserCheck, color: 'warrior-gold' },
  { id: 'media', name: 'MEDIA & PR', icon: Camera, color: 'warrior-blue' },
  { id: 'tv', name: 'TV TEAM', icon: Tv, color: 'warrior-crimson' },
  { id: 'sports', name: 'SPORTS', icon: Trophy, color: 'warrior-gold' },
  { id: 'creative', name: 'CREATIVE & DESIGN', icon: Palette, color: 'warrior-blue' },
  { id: 'development', name: 'WEB & APP DEVELOPMENT', icon: Code, color: 'warrior-crimson' },
  { id: 'hospitality', name: 'HOSPITALITY & LOGISTICS', icon: Coffee, color: 'warrior-gold' },
];

const departmentIcons = {
  coordinators: Users,
  marketing: Megaphone,
  events: Calendar,
  registration: UserCheck,
  media: Camera,
  tv: Tv,
  sports: Trophy,
  creative: Palette,
  development: Code,
  hospitality: Coffee,
};

const Index = () => {
  const [activeDepartment, setActiveDepartment] = useState('events');

  const currentDepartment = departmentInfo[activeDepartment];
  const departmentMembers = teamMembers.filter(member => member.departmentId === activeDepartment);
  const DepartmentIcon = departmentIcons[activeDepartment ];
  
  return (
    <div className="flex min-h-screen bg-background">
      <TeamWheel 
        items={wheelItems}
        activeItem={activeDepartment}
        onItemChange={setActiveDepartment}
      />
      
      {/* <main className="flex-1 ml-96 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <DepartmentHeader
            name={currentDepartment.name}
            description={currentDepartment.description}
            memberCount={departmentMembers.length}
            icon={DepartmentIcon}
            accentColor={currentDepartment.color}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {departmentMembers.map((member) => (
              <TeamMemberCard 
                key={member.id} 
                member={member}
                accentColor={currentDepartment.color}
              />
            ))}
            
            {departmentMembers.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-16">
                <div className="text-center">
                  <DepartmentIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-imperial font-semibold text-foreground mb-2">
                    No Warriors Assigned
                  </h3>
                  <p className="text-muted-foreground font-inter">
                    This department is awaiting brave souls to join the Imperio Gurerio legion.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main> */}
    </div>
  );
};

export default Index;
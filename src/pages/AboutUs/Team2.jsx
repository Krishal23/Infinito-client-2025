import { useEffect, useState } from 'react';
import { TeamWheel } from './components/TeamWheel.jsx';
import { TeamMemberCard } from './components/TeamMemberCard.jsx';
import { DepartmentHeader } from './components/DepartmentHeader.jsx';
import { teamMembers as defaultMembers, departmentInfo } from './data/teamMembers.js';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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

///first update for adding someone

const wheelItems = [
  { id: 'events', name: 'EVENTS & MANAGEMENT', icon: Calendar, color: 'warrior-crimson' },
  { id: 'marketing', name: 'SPONSORSHIP', icon: Megaphone, color: 'warrior-blue' },
  { id: 'creative', name: 'CREATIVES & DESIGN', icon: Palette, color: 'warrior-blue' },
  { id: 'media', name: 'MEDIA & PR', icon: Camera, color: 'warrior-blue' },
  { id: 'sports', name: 'E-SPORTS', icon: Trophy, color: 'warrior-gold' },
  { id: 'hospitality', name: 'HOSPITALITY', icon: Coffee, color: 'warrior-gold' },
  { id: 'development', name: 'WEB & APP', icon: Code, color: 'warrior-crimson' },
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
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [perPageOverrides, setPerPageOverrides] = useState({});

  // load overrides from localStorage if present
  let overrides = [];
  try { overrides = JSON.parse(localStorage.getItem('teamMembersOverrides') || '[]'); } catch {}
  const allMembers = overrides.length ? overrides : defaultMembers;

  const currentDepartment = departmentInfo[activeDepartment];
  const departmentMembers = allMembers.filter(member => member.departmentId === activeDepartment);
  const DepartmentIcon = departmentIcons[activeDepartment ];
  
  // Keep compute for potential overrides, though we now show a vertical scroll
  useEffect(() => {
    const compute = () => (window.innerWidth >= 1024 ? 6 : 4);
    const initial = compute();
    try {
      const stored = JSON.parse(localStorage.getItem('teamMembersPerPage') || '{}');
      setPerPageOverrides(stored || {});
      const override = stored?.[activeDepartment];
      setItemsPerPage(Math.max(1, Math.min(6, override ?? initial)));
    } catch {
      setItemsPerPage(initial);
    }
    const onResize = () => setItemsPerPage(compute());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeDepartment]);
  
  
  return (
    <div 
      className="min-h-screen text-white flex flex-col bg-black"
      style={{
        backgroundImage: 'url("/bg2.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />
      <div className="flex flex-1 pt-16"> 
      <TeamWheel 
        items={wheelItems}
        activeItem={activeDepartment}
          onItemChange={setActiveDepartment}
          offsetTop={0}
          offsetBottom={0}
        />
      <main className="flex-1 w-full p-6 md:p-8 pb-24 min-h-[calc(100vh-64px)]">
        <div className="w-full max-w-7xl mx-auto lg:pl-56 xl:pl-64 space-y-8">
          {/* Classic header (title only) */}
          <div className="bg-neutral-900/60 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-2">
              <DepartmentIcon size={28} className="text-yellow-400" />
              <h2 className="text-2xl md:text-3xl font-imperial font-semibold tracking-wide">{currentDepartment.name}</h2>
            </div>
          </div>

          {/* Horizontal scroller without scrollbar; ~3 cards visible on desktop */}
          {departmentMembers.length > 0 ? (
            <div className="mt-6">
              {departmentMembers.length === 1 ? (
                // Single card - center it
                <div className="flex justify-center">
                  <div className="w-full max-w-sm">
                    <TeamMemberCard member={departmentMembers[0]} accentColor={currentDepartment.color} />
                  </div>
                </div>
              ) : departmentMembers.length === 2 ? (
                // Two cards - side by side, centered
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                    {departmentMembers.map((member) => (
                      <TeamMemberCard key={member.id} member={member} accentColor={currentDepartment.color} />
                    ))}
                  </div>
                </div>
              ) : departmentMembers.length === 3 ? (
                // Three cards - centered
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
                    {departmentMembers.map((member) => (
                      <TeamMemberCard key={member.id} member={member} accentColor={currentDepartment.color} />
                    ))}
                  </div>
                </div>
              ) : departmentMembers.length === 5 ? (
                // Five cards - 3 on top, 2 on bottom (centered)
                <div className="flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
                    {departmentMembers.slice(0, 3).map((member) => (
                      <TeamMemberCard key={member.id} member={member} accentColor={currentDepartment.color} />
                    ))}
                    <div className="hidden lg:block"></div> {/* Empty space for symmetry */}
                    {departmentMembers.slice(3, 4).map((member) => (
                      <div key={member.id} className="lg:col-start-2">
                        <TeamMemberCard member={member} accentColor={currentDepartment.color} />
                      </div>
                    ))}
                    {departmentMembers.slice(4, 5).map((member) => (
                      <div key={member.id} className="lg:col-start-3">
                        <TeamMemberCard member={member} accentColor={currentDepartment.color} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                // 6+ cards - standard grid
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {departmentMembers.map((member) => (
                    <TeamMemberCard key={member.id} member={member} accentColor={currentDepartment.color} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <DepartmentIcon size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-imperial font-semibold text-foreground mb-2">No Members Yet</h3>
                <p className="text-muted-foreground font-inter">Add your team to this department to display them here.</p>
              </div>
            </div>
          )}
        </div>
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
import { Badge } from '../../../components/Admin/ui/badge';
import { cn } from './lib/utils';
import { Linkedin, Instagram, Mail, Phone } from 'lucide-react';


export function TeamMemberCard({ member, accentColor = 'warrior-gold' }) {
  const iconClass = "w-5 h-5";
  const placeholder = 'https://i.postimg.cc/0Q4vQbqM/placeholder-person.jpg';

  const formatName = (raw) => {
    if (!raw) return '';
    const collapsed = String(raw).trim().replace(/\s+/g, ' ');
    return collapsed
      .toLowerCase()
      .split(' ')
      .map(w => w ? w[0].toUpperCase() + w.slice(1) : '')
      .join(' ');
  };
  const displayName = formatName(member.name);

  return (
    <div className="overflow-hidden bg-neutral-900 border border-neutral-700 hover:border-yellow-500/40 transition-all duration-300 group rounded-lg w-full h-80 flex flex-col">
      {/* Photo with graceful fallback to initials */}
      <div className="w-full h-64 bg-neutral-800 border-b border-neutral-700 relative flex items-center justify-center flex-shrink-0">
        <div className="absolute inset-0 flex items-center justify-center text-2xl font-imperial">
          {displayName.split(' ').map(n => n && n[0]).filter(Boolean).join('')}
        </div>
        <img
          src={(member.image && /^(https?:)?\/\//.test(member.image)) ? member.image : (member.image?.startsWith('/') ? member.image : placeholder)}
          alt={displayName}
          className="w-full h-full object-cover relative z-10"
          onError={(e) => { e.currentTarget.src = placeholder; }}
        />
      </div>

      {/* Name */}
      <div className="px-4 py-0.5 text-center flex-shrink-0">
        <h3 className="font-imperial text-lg font-semibold">{displayName}</h3>
      </div>

      {/* Social/Contact Row */}
      <div className="px-4 pb-4 flex-1 flex items-end">
        <div className="flex items-center justify-center gap-4 text-neutral-300 w-full">
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin className={iconClass} />
            </a>
          )}
          {member.instagram && (
            <a href={member.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <Instagram className={iconClass} />
            </a>
          )}
          {member.email && (
            <a href={`mailto:${member.email}`} aria-label="Email" className="hover:text-white">
              <Mail className={iconClass} />
            </a>
          )}
          {member.phone && (
            <a href={`tel:${member.phone}`} aria-label="Phone" className="hover:text-white">
              <Phone className={iconClass} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
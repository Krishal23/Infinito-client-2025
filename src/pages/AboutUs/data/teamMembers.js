
export const teamMembers = [
  // Events & Management (6 members)
  { id: '1',  name: 'Ashish Yadav',        department: 'Events & Management',        departmentId: 'events',      image: 'https://i.postimg.cc/gkZxLBCy/cd398a52-49ac-4bd7-b9cb-5c8de7811864-1489dee5-c8c2-4e82-889e-5992c5233e69-2.jpg', skills: [], status: 'active' },
  { id: '2',  name: 'Jitendra Choudhary',  department: 'Events & Management',        departmentId: 'events',      image: 'https://i.postimg.cc/3xRYkLtg/IMG-2157.jpg', skills: [], status: 'active' },
  { id: '5',  name: 'Rishabh Singraur',    department: 'Events & Management',        departmentId: 'events',      image: 'https://i.postimg.cc/ydMVNK1R/IMG-3102.jpg', skills: [], status: 'active' },
  { id: '14', name: 'Swati Yadav',         department: 'Events & Management',        departmentId: 'events',      image: 'https://postimg.cc/m17QPyqW/16d948a1', skills: [], status: 'active' },
  { id: '16', name: 'Rahul Kumar',         department: 'Events & Management',        departmentId: 'events',      image: 'https://i.postimg.cc/ydpW1ntN/IMG-20231110-205357-330-3.jpg', skills: [], status: 'active' },
  { id: '20', name: 'Rahul Raj',           department: 'Events & Management',        departmentId: 'events',      image: 'https://i.postimg.cc/Bbjy0VzH/20241006-234831.jpg', skills: [], status: 'active' },

  // Sponsorship (5 members)
  { id: '3',  name: 'Ashwani Kumar',       department: 'Sponsorship',                departmentId: 'marketing',   image: 'IMG_20231212_101258_268', skills: [], status: 'active' },
  { id: '6',  name: 'Shivam Modi',         department: 'Sponsorship',                departmentId: 'marketing',   image: 'https://postimg.cc/XXdwKz1C', skills: [], status: 'active' },
  { id: '7',  name: 'Kanika Shrivastava',  department: 'Sponsorship',                departmentId: 'marketing',   image: 'https://i.postimg.cc/W1WCqbrN/p3.jpg', skills: [], status: 'active' },
  { id: '10', name: 'Piyush Jatoliya',     department: 'Sponsorship',                departmentId: 'marketing',   image: 'https://postimg.cc/hX0Ddj89', skills: [], status: 'active' },
  { id: '11', name: 'Aditya Chandra',      department: 'Sponsorship',                departmentId: 'marketing',   image: 'https://i.postimg.cc/t49wZDMQ/IMG-20250810-135420.jpg', skills: [], status: 'active' },

  // Registration (3 members)
  { id: '8',  name: 'Kavya Jalumuru',      department: 'Registration',               departmentId: 'registration',image: 'https://i.postimg.cc/j2c8GPVr/Whats-App-Image-2025-09-15-at-10-25-00.jpg', skills: [], status: 'active' },
  { id: '13', name: 'Akash Kumar',         department: 'Registration',               departmentId: 'registration',image: 'https://postimages.org/', skills: [], status: 'active' },
  { id: '19', name: 'Lucky Mishra',        department: 'Registration',               departmentId: 'registration',image: 'https://i.postimg.cc/YCqt5HDw/IMG-20250917-195358.jpg', skills: [], status: 'active' },

  // TV Team (2 members)
  { id: '9',  name: 'Mandeep Singh',       department: 'TV Team',                    departmentId: 'tv',          image: 'https://i.postimg.cc/jdxpkRWy/for-website.jpg', skills: [], status: 'active' },
  { id: '17', name: 'Shivansh Sinha',      department: 'TV Team',                    departmentId: 'tv',          image: 'https://i.postimg.cc/0N1bQ7W2/IMG-2476.jpg', skills: [], status: 'active' },

  // Creatives & Design (1 member)
  { id: '4',  name: 'Aryan Vats',          department: 'Creatives & Design',         departmentId: 'creative',    image: 'https://postimg.cc/V5MQftPj', skills: [], status: 'active' },

  // Media & PR (1 member)
  { id: '12', name: 'Shivesh Chauhan',     department: 'Media & Public Relations',   departmentId: 'media',       image: 'https://postimg.cc/TpX6YXTx', skills: [], status: 'active' },

  // E-Sports (2 members)
  { id: '15', name: 'Saksham Srivastava',  department: 'E-sports',                   departmentId: 'sports',      image: 'https://i.postimg.cc/xj3v5byY/Whats-App-Image-2025-09-17-at-00-47-21-eea4fcbe.jpg', skills: [], status: 'active' },
  { id: '24', name: 'Ayush Kumar',         department: 'E-sports',                   departmentId: 'sports',      image: 'https://postimg.cc/6TTqFRJX', skills: [], status: 'active' },

  // Hospitality (2 members)
  { id: '21', name: 'Atharv Bagde',        department: 'Hospitality',                departmentId: 'hospitality', image: 'https://postimg.cc/grTSWD3C', skills: [], status: 'active' },
  { id: '22', name: 'Somya Shourya',       department: 'Hospitality',                departmentId: 'hospitality', image: 'https://postimg.cc/T5fD8BCC', skills: [], status: 'active' },
];

export const departmentInfo = {
  coordinators: {
    name: 'FEST COORDINATORS',
    description: 'Elite leadership corps orchestrating the grand vision of Legacy 25',
    color: 'warrior-gold'
  },
  marketing: {
    name: 'SPONSORSHIP',
    description: 'Strategic alliance builders forging partnerships and expanding our empire',
    color: 'warrior-blue'
  },
  events: {
    name: 'EVENTS & MANAGEMENT',
    description: 'Master tacticians designing unforgettable experiences and epic gatherings',
    color: 'warrior-crimson'
  },
  registration: {
    // removed REGISTRATION from UI
  },
  media: {
    name: 'MEDIA & PR',
    description: 'Imperial chroniclers capturing and sharing our legendary moments',
    color: 'warrior-blue'
  },
  tv: {
    // removed TV TEAM from UI
  },
  sports: {
    name: 'E-SPORTS',
    description: 'Athletic commanders leading competitive battles and tournaments',
    color: 'warrior-gold'
  },
  creative: {
    name: 'CREATIVE & DESIGN',
    description: 'Artistic visionaries crafting the aesthetic empire of Legacy 25',
    color: 'warrior-blue'
  },
  development: {
    name: 'WEB & APP',
    description: 'Building and maintaining the festival website and apps with performance and polish',
    color: 'warrior-crimson'
  },
  hospitality: {
    name: 'HOSPITALITY & LOGISTICS',
    description: 'Service excellence warriors ensuring comfort and smooth operations',
    color: 'warrior-gold'
  }
};
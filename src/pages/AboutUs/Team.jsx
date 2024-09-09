import styles from './Team.module.css';
// import image from "../assets/langchain_logo.jpeg";
import pawan from '../assets/pawan.png';
import ritik from '../assets/ritik sharma.png';
import aryan from '../assets/aryan.jpg';
import himanshu from '../assets/himanshu.jpg';
import mayank from '../assets/mayank.png';
import harsh from '../assets/harsh.png';
import rudra from '../assets/rudra.png';
import aaditya from '../assets/aaditya.png';
import akhilesh from '../assets/akhilesh.png';
// import gaurav from '../assets/gaurav verma.png';
import manish from '../assets/manish.png';
// import saumya from '../assets/saumya.png';
import tanishq from '../assets/tanishq.png';
import jagriti from '../assets/jagriti.png';
import phutela from '../assets/phutela.png';
import sakshi from '../assets/sakshi.png';
import abhinav from '../assets/abhinav.png';
import arti from '../assets/arti.png';
import ansh from '../assets/ansh.png';
import dolly from '../assets/dolly.png';
import pullah from '../assets/pulah.png';
import gaurav from '../assets/GauravKumar.jpg'
import anirudh from '../assets/anirudh.png';
import bhavik from '../assets/bhavik.png';
import rishi from '../assets/rishi.jpg';
import shani from '../assets/shani.jpg';
import aman from '../assets/aman.png';
import arun from '../assets/arun.jpg';
import sanchay from '../assets/sanchay.jpg';
import mojammi from '../assets/mojammi.jpg';
import sumit from '../assets/sumit.png';
import mohit from '../assets/mohit.jpg';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import shyam from '../assets/shyam.jpg';
import raunak from '../assets/raunak.jpg';
import balwant from '../assets/balwant.jpg';

const teamMembers = [
  {
    role: 'Overall Fest Coordinator',
    name: 'Balwant Meena',

    position: 'Fest Coordinator',
    image: balwant,
  },
  {
    role: 'Managing Lead Coordinator',
    name: 'Anirudh Singh',
    position: 'Managing Lead',
    image: anirudh,
  },

  // Media & Public Relations Coordinators
  // {
  //   role: "Media & Public Relations",
  //   name: "Piyush Sanyalwal",
  //   position: "Media & Public Relations",
  //   image: image,
  // },
  {
    role: 'Media & Public Relations Coordinators',
    name: 'Arun Mishra',
    position: 'Media & Public Relations',
    image: arun,
  },
  {
    role: 'Media & Public Relations Coordinators',
    name: 'Raunak Bansod',
    position: 'Media & Public Relations',
    image: raunak,
  },
  {
    role: 'Media & Public Relations Coordinators',
    name: 'Mohit Saini',
    position: 'Media & Public Relations',
    image: mohit,
  },
  {
    role: 'Media & Public Relations Coordinators',
    name: 'Shani Kasaudhan',
    position: 'Media & Public Relations',
    image: shani,
  },
  {
    role: 'Media & Public Relations Coordinators',
    name: 'Dolly Singh',
    position: 'Media & Public Relations',
    image: dolly,
  },
  // Creatives & Design Coordinators
  {
    role: 'Creatives & Design Coordinators',
    name: 'Ansh Singh',
    position: 'Creatives & Design',
    image: ansh,
  },
  {
    role: 'Creatives & Design Coordinators',
    name: 'Arti Dewangan',
    position: 'Creatives & Design',
    image: arti,
  },
  // TV Team Coordinators
  // {
  //   role: "TV Team",
  //   name: "Vikram Balai",
  //   position: "TV Team",
  //   image: image,
  // },
  {
    role: 'TV Team Coordinators',
    name: 'Abhinav Vanamala',
    position: 'TV Team',
    image: abhinav,
  },
  // Sponsorship Coordinators
  {
    role: 'Sponsorship Coordinators',
    name: 'Sakshi Sinha',
    position: 'Sponsorship',
    image: sakshi,
  },
  {
    role: 'Sponsorship Coordinators',
    name: 'Rishi Panwar',
    position: 'Sponsorship',
    image: rishi,
  },
  {
    role: 'Sponsorship Coordinators',
    name: 'Ansh Phutela',
    position: 'Sponsorship',
    image: phutela,
  },
  {
    role: 'Sponsorship Coordinators',
    name: 'Jagriti Kanwar',
    position: 'Sponsorship',
    image: jagriti,
  },

  {
    role: 'Sponsorship Coordinators',
    name: 'Tanishq Sharma',
    position: 'Sponsorship',
    image: tanishq,
  },
  {
    role: 'Sponsorship Coordinators',
    name: 'Mojammi Warsi',
    position: 'Sponsorship',
    image: mojammi,
  },

  // {
  //   role: "Sponsorship Coordinators",
  //   name: "Saumya Pratap Singh",
  //   position: "Sponsorship",
  //   image: saumya,
  // },
  // Events & Management Coordinators
  {
    role: 'Events & Management Coordinators',
    name: 'Pulah Panara',
    position: 'Events Lead',
    image: pullah,
  },
  {
    role: 'Events & Management Coordinators',
    name: 'Gaurav Kumar',
    position: 'Events Lead',
    image: gaurav,
  },
  {
    role: 'Events & Management Coordinators',
    name: 'Shyam Sundar',
    position: 'Events Lead',
    image: shyam,
  },
  {
    role: 'Events & Management Coordinators',
    name: 'Aman Kumar',
    position: 'Events & Management',
    image: aman,
  },

  {
    role: 'Events & Management Coordinators',
    name: 'Manish Kumar',
    position: 'Events & Management',
    image: manish,
  },
  // {
  //   role: 'Events & Management Coordinators',
  //   name: 'Gaurav Verma',
  //   position: 'Events & Management',
  //   image: gaurav,
  // },
  {
    role: 'Events & Management Coordinators',
    name: 'Akhilesh Ingole',
    position: 'Events & Management',
    image: akhilesh,
  },
  {
    role: 'Events & Management Coordinators',
    name: 'Aaditya Kaswan',
    position: 'Events & Management',
    image: aaditya,
  },
  // Web Development Coordinators
  {
    role: 'Web Development Coordinators',
    name: 'Rudra Goyal',
    position: 'Web Development',
    image: rudra,
  },

  {
    role: 'Web Development Coordinators',
    name: 'Pawan Singh',
    position: 'Web Development',
    image: pawan,
  },
  // Registration Coordinators
  {
    role: 'Registration Coordinators',
    name: 'Harsh Mittal',
    position: 'Registration',
    image: harsh,
  },
  {
    role: 'Registration Coordinators',
    name: 'Mayank Sen',
    position: 'Registration',
    image: mayank,
  },
  {
    role: 'Registration Coordinators',
    name: 'Himanshu Chakravarty',
    position: 'Registration',
    image: himanshu,
  },
  // E-sports Coordinators
  {
    role: 'E-sports Coordinators',
    name: 'Aryan',
    position: 'E-sports',
    image: aryan,
  },
  {
    role: 'E-sports Coordinators',
    name: 'Sumit Suhan',
    position: 'E-sports',
    image: sumit,
  },
  {
    role: 'E-sports Coordinators',
    name: 'Rittik Sharma',
    position: 'E-sports',
    image: ritik,
  },
  // Hospitality Coordinators
  {
    role: 'Hospitality Coordinators',
    name: 'Bhavik Netam',
    position: 'Hospitality',
    image: bhavik,
  },
  {
    role: 'Hospitality Coordinators',
    name: 'Sanchay Rathore',
    position: 'Hospitality',
    image: sanchay,
  },

  // {
  //   role: "Hospitality",
  //   name: "Sougata Saha",
  //   position: "Hospitality",
  //   image: image,
  // },
  // Other members as needed...
];

// Group members by their roles
const groupByRole = (members) => {
  return members.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = [];
    }
    acc[member.role].push(member);
    return acc;
  }, {});
};

const Team = () => {
  const groupedMembers = groupByRole(teamMembers);

  return (
    <div className="main">
      <div>
        <Navbar />
      </div>
      <div className={styles.teamContainer}>
        <h1 className={styles.heading}>Meet Our Team</h1>

        {Object.keys(groupedMembers).map((role, index) => {
          const membersCount = groupedMembers[role].length;
          let gridClass = styles.teamGrid;

          if (membersCount === 1) {
            gridClass += ` ${styles.oneCard}`;
          } else if (membersCount === 2) {
            gridClass += ` ${styles.twoCards}`;
          }

          return (
            <div key={index}>
              <h2>{role} </h2>

              <div className={gridClass}>
                {groupedMembers[role].map((member, index) => (
                  <div className={styles.teamMember} key={index}>
                    <div className={styles.teamMemberImage}>
                      <img src={member.image} alt={member.name} />
                    </div>
                    <div className={styles.teamMemberInfo}>
                      <h3>{member.name}</h3>
                      <p>{member.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Team;

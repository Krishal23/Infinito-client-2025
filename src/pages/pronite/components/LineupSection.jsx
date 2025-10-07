import { motion } from 'framer-motion';
import { Music, Mic2 } from 'lucide-react';
import performer2 from '/avneet.png';
import performer1 from '/melody.png';
import performer3 from '/dj.jpg';
import warriorBg from '/proniteBG.jpg';


const performers = [
  {
    name: "Last Minute India Band",
    genre: "Live Rock & Bollywood Fusion",
    type: "band",
    description: "High-energy performances that blend rock with Bollywood hits",
    image: performer1
  },
  {
    name: "DJ Avneet",
    genre: "Electronic Dance Music",
    type: "dj",
    description: "Chart-topping mixes that keep the crowd moving all night",
    image: performer2
  },
//   {
//     name: "Special Guest Artist",
//     genre: "Surprise Performance",
//     type: "band",
//     description: "An unforgettable act to be revealed soon",
//     image: performer3
//   },
];

const LineupSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background via-card to-background">
        <div className="absolute inset-0 z-0">
                        <img 
                            src={warriorBg} 
                            alt="Warrior Battle" 
                            className="w-full h-full object-cover brightness-50" 
                        />
                    </div>
      <div className="relative max-w-7xl mx-auto z-1000">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            This Year's Lineup
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the ultimate musical journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {performers.map((performer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative overflow-hidden rounded-xl backdrop-blur-md border border-border/50 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={performer.image} 
                  alt={performer.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40 group-hover:from-background/90 transition-all duration-300" /> */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent group-hover:via-black/80 transition-all duration-300" />

              </div>
              
              <div className="relative p-8 z-10 h-full flex flex-col justify-end min-h-[400px]">
                <div className="mb-4 flex  items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {performer.type === 'band' ? (
                    <Music className="w-12 h-12 text-white" />
                  ) : (
                    <Mic2 className="w-12 h-12 text-zinc-400" />
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-2 text-zinc-400">
                  {performer.name}
                </h3>
                
                <p className="text-sm font-semibold text-secondary mb-4">
                  {performer.genre}
                </p>
                
                <p className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {performer.description}
                </p>
              </div>

              {/* Border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-xl transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LineupSection;

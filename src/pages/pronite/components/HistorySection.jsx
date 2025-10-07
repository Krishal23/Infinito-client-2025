import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';
import warriorBg from '/Pronite2.jpg';

const previousPerformers = [
  {
    year: "2024",
    name: "Madhur Virli",
    description: "An electrifying performance that set the stage on fire"
  },
  {
    year: "2023",
    name: "DJ Tejas",
    description: "Beats that resonated throughout the night"
  },
  {
    year: "2022",
    name: "Progressive Brothers",
    description: "A legendary duo that left the crowd mesmerized"
  },
];

const HistorySection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-card/50 to-background">
        <div className="absolute inset-0 z-0">
                                <img 
                                    src={warriorBg} 
                                    alt="Warrior Battle" 
                                    className="w-full h-full object-cover brightness-50" 
                                />
                            </div>
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className=" text-5xl md:text-6xl font-bold mb-4 bg-white from-secondary via-primary to-accent bg-clip-text text-transparent">
            History of Infinito
          </h2>
          <p className="text-xl text-muted-foreground">
            Celebrating years of legendary performances
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent" />

          <div className="space-y-12">
            {previousPerformers.map((performer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 w-full">
                  <div className="relative group p-8 rounded-xl backdrop-blur-md border border-border/50 bg-gradient-to-br from-card/60 to-card/30 hover:from-primary/10 hover:to-secondary/10 transition-all duration-500 shadow-lg hover:shadow-2xl">
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <Calendar className="w-6 h-6 text-secondary" />
                        <span className="text-2xl font-bold text-secondary">{performer.year}</span>
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-3 text-black group-hover:text-white transition-colors duration-300">
                        {performer.name}
                      </h3>
                      
                      <p className="text-muted-foreground text-lg hover:text-zinc-400">
                        {performer.description}
                      </p>
                    </div>

                    {/* Star decoration */}
                    <Star className="absolute top-4 right-4 w-8 h-8 text-secondary/20 group-hover:text-secondary/60 transition-colors duration-300" />
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden md:block relative z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-secondary border-4 border-background shadow-lg"
                  />
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legacy badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 backdrop-blur-md">
            <p className="text-xl font-semibold text-white/80">
              Building a legacy of <span className="text-zinc-600">unforgettable nights</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HistorySection;

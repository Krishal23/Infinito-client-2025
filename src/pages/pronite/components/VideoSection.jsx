import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoSection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-card to-background">
        <div className="absolute inset-0 z-0">
                                {/* <img 
                                    src={warriorBg} 
                                    alt="Warrior Battle" 
                                    className="w-full h-full object-cover brightness-50" 
                                /> */}
                            </div>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-black from-primary via-secondary to-accent bg-clip-text text-transparent">
            Imperio Gurreo Theme
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the essence of the night
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-video max-w-5xl mx-auto rounded-xl overflow-hidden border border-primary/30 shadow-2xl"
        >
          {/* Video placeholder - replace with actual video embed */}
          <div className="relative w-full h-full bg-gradient-to-br from-card to-background flex items-center justify-center group cursor-pointer">
            {/* Background image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-opacity duration-300"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80)`
              }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
            
            {/* Play button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10 w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center border-4 border-secondary/50 shadow-lg"
            >
              <Play className="w-10 h-10 text-foreground ml-1" fill="currentColor" />
            </motion.div>

            {/* Text overlay */}
            <div className="absolute bottom-8 left-8 right-8 z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Watch the Infinito'25 Theme Video
              </h3>
              <p className="text-muted-foreground">
                Click to play and immerse yourself in the Imperio Gurreo experience
              </p>
            </div>
          </div>

          {/* Note: Replace the above placeholder with actual video embed like:
          <iframe
            className="w-full h-full"
            src="YOUR_VIDEO_URL"
            title="Infinito25 Theme Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          */}
        </motion.div>

        {/* Video description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            Witness the grandeur of Imperio Gurreo through our theme video, showcasing 
            the spectacular performances, vibrant atmosphere, and unforgettable moments 
            that make Infinito the most celebrated Pronite at IIT Patna.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;

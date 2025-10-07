import { motion } from 'framer-motion';
import gallery1 from '/dj.jpg';
import gallery2 from '/dj.jpg';
import gallery3 from '/dj.jpg';
import gallery4 from '/dj.jpg';

const galleryImages = [
  { src: gallery1, title: "Electrifying Crowd" },
  { src: gallery2, title: "Stage Production" },
  { src: gallery3, title: "Concert Atmosphere" },
  { src: gallery4, title: "Performance Moment" },
];

const GallerySection = () => {
  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background to-card/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Moments That Matter
          </h2>
          <p className="text-xl text-muted-foreground">
            Capturing the magic of Infinito
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold text-foreground">
                  {image.title}
                </h3>
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

export default GallerySection;

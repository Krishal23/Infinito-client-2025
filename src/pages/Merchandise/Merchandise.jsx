import MerchandiseCard from "./MerchandiseCard";
import styles from "./Merchandise.module.css";
import f4 from "./merchimg/f1.png";

import f5 from "./merchimg/f2.png";
import f3 from "./merchimg/f3.png";
import f1 from "./merchimg/f4.png";
import f2 from "./merchimg/f5.png";
import b4 from "./merchimg/b1.png";
import b5 from "./merchimg/b2.png";
import b3 from "./merchimg/b3.png";
import b1 from "./merchimg/b4.png";
import b2 from "./merchimg/b5.png";
import { Link } from "react-router-dom";
import mascot from "./mascot.png";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const merchandiseData = [
  {
    frontContent: {
      title: "1f",
      image: f1, // Replace with actual image path
    },
    backContent: {
      title: "1b",
      image: b1,
    },
  },
  {
    frontContent: {
      title: "1f",
      image: f2, // Replace with actual image path
    },
    backContent: {
      title: "1b",
      image: b2,
    },
  },
  {
    frontContent: {
      title: "1f",
      image: f3, // Replace with actual image path
    },
    backContent: {
      title: "1b",
      image: b3,
    },
  },
  {
    frontContent: {
      title: "1f",
      image: f4, // Replace with actual image path
    },
    backContent: {
      title: "1b",
      image: b4,
    },
  },
  {
    frontContent: {
      title: "1f",
      image: f5, // Replace with actual image path
    },
    backContent: {
      title: "1b",
      image: b5,
    },
  },

  // Add more items as needed
];

const Merchandise = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.merchContent}>
          <h1 className={styles.title}>OFFICIAL INFINITO MERCH</h1>
          {/* <img className={styles.imgmerch} src={merchimg} alt="" srcset="" /> */}
          <div className={styles.para}>
            <p>
              Get ready to dive into the world of style as we introduce the
              exclusive T-shirt and Hoodie collection for Infinito24!
            </p>
            <p>
              These designs blend elegance with innovation, perfectly capturing
              the essence of Infinito. Our T-shirts are crafted from top-quality
              200 GSM, 100% cotton, ensuring ultimate comfort and durability.
              The hoodies are made from premium woven cotton with 350+ GSM
              fabric, offering unmatched warmth and style. Elevate your wardrobe
              with our limited-edition Infinito T-shirts and Hoodies!
            </p>
            <div className={styles.grab2}>
              <img className={styles.imgmerch2} src={mascot} alt="" />
              <div
                className={styles.grabNowBtn}
                // to="https://docs.google.com/forms/d/e/1FAIpQLSfE-MZYmqqntVzoTtt_GvBBqOYdYwPA2OOQQkvMWm9VJuEUdQ/viewform?fbzx=8247677167203646238"
              >
                Live Soon
              </div>
            </div>
          </div>
        </div>

        <div className={styles.merchItems}>
          {merchandiseData.map((item, index) => (
            <MerchandiseCard
              key={index}
              frontContent={item.frontContent}
              backContent={item.backContent}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Merchandise;

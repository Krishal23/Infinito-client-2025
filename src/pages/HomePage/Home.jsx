import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import BannerAbout from "./BannerAbout";
import ContactInfo from "./BannerContactUs";
// import BannerEvent from "./BannerEvent";

import Head from "./Head";
import styles from "./Home.module.css";
import Eve from "../Events/events";
import DomeGallery from "./DomeGallery";

function Home() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Head />
      {/* <div style={{ width: '100vw', height: '100vh' }}>
      <DomeGallery grayscale={false}/>
    </div> */}
      <BannerAbout />
      {/* <BannerEvent /> */}
      <Eve />
      <ContactInfo />
      <Footer />
    </div>
  );
}

export default Home;

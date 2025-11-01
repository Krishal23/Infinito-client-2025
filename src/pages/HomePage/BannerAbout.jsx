import styles from "./BannerAbout.module.css";
import { useRef } from "react";
import useInView from "../../components/useInView";

function BannerAbout() {
  const ref = useRef();
  const isVisible = useInView(ref);

  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <h2
          ref={ref}
          className={`${styles.h2} ${isVisible ? styles.show : ""}`}
        >
          Imperio Guerreo
        </h2>
        <h6
          ref={ref}
          className={`${styles.h6} ${isVisible ? styles.show : ""}`}
        >
          Entering to Realm of Infinito
        </h6>
      </div>
      <div
        ref={ref}
        className={`${styles.sponsor} ${isVisible ? styles.show : ""}`}
      >
        <p className={styles.sponsorText}>Brought to you by</p>
        <img
          src="/sbi.png"
          alt="SBI Logo"
          className={styles.sbiLogo}
        />
      </div>

      <div className={styles.item}>
        <div className={styles.content}>
          <div className={styles.content2}>
            <p>
              It all started with a spark — a vision to build not just a fest, 
              but a <b>realm of warriors</b>. From its humble beginning, Infinito 
              rose like an empire, and in just ten editions, it has become 
              the grandest and most awaited sports saga of North-East India.
            </p>
            <p>
              In the <b>Empire of Warriors</b>, every player is more than a competitor — 
              they are a fighter, a dreamer, and a believer. Infinito offers 
              a battlefield where talent meets passion, where grit and skill 
              carve the path to glory.
            </p>
            <p>
              Over three electrifying days, warriors from across India unite. 
              From breathtaking sporting clashes to nights alive with culture 
              and celebration, the spirit of Infinito knows no bounds.
            </p>
            <p>
              This is <b>Imperio Guerreo</b> — a story of courage, unity, 
              and the pursuit of eternal glory. Together, let us march, let us 
              fight, and let us <span className={styles.highlight}>
              sweat to glory</span>.
            </p>
          </div>
        </div>
      </div>

      {/* New SBI Section */}
      
    </div>
  );
}

export default BannerAbout;

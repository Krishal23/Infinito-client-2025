import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import styles from './BannerContactUs.module.css';

const ContactInfo = () => {
  return (
    <div className={styles.contactContainer}>
      {/* Left Section */}
      <div className={styles.leftSection}>
        <h2 className={styles.heading}>CONTACT INFO</h2>

        {/* Address */}
        <div className={styles.infoRow}>
          <FaMapMarkerAlt className={styles.icon} />
          <div>
            <h4>ADDRESS</h4>
            <p className={styles.infoText}>IIT Patna, Bihta, Patna, Bihar</p>
          </div>
        </div>

        {/* Phone */}
        <div className={styles.infoRow}>
          <FaPhoneAlt className={styles.icon} />
          <div>
            <h4>PHONE</h4>
            <p className={styles.infoText}>+91 7023740380</p>
          </div>
        </div>

        {/* Email */}
        <div className={styles.infoRow}>
          <FaEnvelope className={styles.icon} />
          <div>
            <h4>EMAIL</h4>
            <p className={styles.infoText}>infinito@iitp.ac.in</p>
          </div>
        </div>
      </div>

      {/* Right Section (Google Map) */}
      <div className={styles.rightSection}>
        <iframe
          title="IIT Patna Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29207.689384934395!2d84.8179835!3d25.5384565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7cf2c13a3ff4025c!2sIIT%20Patna%20Administration%20Block!5e0!3m2!1sen!2sin!4v1693935152045!5m2!1sen!2sin"
          width="400"
          height="300"
          className={styles.iframe}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactInfo;

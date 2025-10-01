import React, { useState } from "react";
import styles from "./TopBanner.module.css";

export default function TopBanner({ message }) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className={styles.banner}>
      <div className={styles.marquee}>
        <span>{message}</span>
      </div>
      <button
        className={styles.closeBtn}
        onClick={() => setVisible(false)}
      >
        ×
      </button>
    </div>
  );
}

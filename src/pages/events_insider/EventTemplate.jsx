// EventTemplate.js
import React from 'react';
import styles from './eventDetails.module.css';
import { Link } from 'react-router-dom';

const EventTemplate = ({
  title,
  date,
  description,
  isRegistrationOpen,
  rulebookUrl,
  structure,
  rules,
  judgingCriteria,
  prizes,
  registrationurl,
}) => {
  return (
    <div className={styles.eventDetails}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.buttons}>
        {isRegistrationOpen ? (
          <Link to={registrationurl} className={styles.workButton}>
            Register Now
          </Link>
        ) : (
          <a className={styles.workButton}>Registrations Opening Soon</a>
        )}
        {rulebookUrl && (
          <a
            href={rulebookUrl}
            className={styles.workButton}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Rulebook
          </a>
        )}
      </div>
      {/* ...rest remains the same... */}
    </div>
  );
};

export default EventTemplate;

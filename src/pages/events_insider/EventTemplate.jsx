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
  isAlreadyRegistered, 
}) => {
  return (
    <div className={styles.eventDetails}>
      <div className="font-bold text-lg ">{title}</div>
      <div className={styles.buttons}>
        {isAlreadyRegistered ? (
          <button className={styles.workButton} disabled>
            Already Applied
          </button>
        ) : isRegistrationOpen ? (
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
    </div>
  );
};

export default EventTemplate;

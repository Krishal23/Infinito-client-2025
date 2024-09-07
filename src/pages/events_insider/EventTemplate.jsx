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
  registrationurl
}) => {
  return (
    <div className={styles.eventDetails}>
      <h1 className={styles.title}>{title}</h1>
      {/* <p className={styles.date}>Date: {date}</p> */}
      {/* <p className={styles.description}>{description}</p> */}
      <div className={styles.buttons}>
        {isRegistrationOpen ? (
          <Link to={registrationurl} className={styles.workButton}>Register Now</Link>
        ) : (
          <a className={styles.workButton}>Registrations Opening Soon</a>
        )}
        {rulebookUrl && (
          <a href={rulebookUrl} className={styles.workButton} target="_blank" rel="noopener noreferrer">View Rulebook</a>
        )}
      </div>
      <div className={styles.secondaryContent}>
        {structure && (
          <div className={styles.structure}>
            <h3>Point of Contacts: </h3>
            <div className={styles.poc}>
            {structure.map((point, index) => (
              <p key={index} className={styles.description}>{point}</p>
            ))}
          </div></div>
        )}
        {/* {rules && (
          <div className={styles.rules}>
            <h3>RULES</h3>
            {rules.map((rule, index) => (
              <p key={index} className={styles.description}>{rule}</p>
            ))}
          </div>
        )}
        {judgingCriteria && (
          <div className={styles.judgingCriteria}>
            <h3>Judging Criteria</h3>
            <p className={styles.description}>{judgingCriteria}</p>
          </div>
        )}
        {prizes && (
          <div className={styles.prizes}>
            <h3>Prizes Worth</h3>
            {prizes.map((prize, index) => (
              <p key={index} className={styles.description}>{prize}</p>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default EventTemplate;

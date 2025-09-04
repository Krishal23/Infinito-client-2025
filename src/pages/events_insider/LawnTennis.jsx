import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/LawnTennisRulebook.pdf'

const LawnTennis = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="lawntennis"
      title="Lawn Tennis Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Lawn Tennis championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={"https://drive.google.com/file/d/18c-frlP5OSMRGbWPteQ9P7amyZXNzoeZ/view?usp=drive_link"}
      registrationurl="/events/lawn-tennis"

      structure={[
        "Pranshu Deep: 8248558408","Shyam Sunder: 9348743979 "

      ]}
      rules={[
        "Teams must have eleven players including a goalkeeper.",
        "Matches will be played with standard football rules.",
        "Any form of unsporting behavior will lead to penalties."
      ]}
      judgingCriteria="Matches will be judged based on team performance, sportsmanship, and adherence to rules."
      prizes={[
        "1st Place: Rs. 5000",
        "2nd Place: Rs. 3000",
        "3rd Place: Rs. 2000"
      ]}
      isAlreadyRegistered={isAlreadyRegistered}
    />
  );
};

export default LawnTennis;

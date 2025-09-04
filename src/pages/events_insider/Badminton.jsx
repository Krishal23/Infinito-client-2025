import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/BadmintonRulebook.pdf'

const Badminton = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="badminton"
      title="Badminton Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Badminton championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      registrationurl="/events/badminton"

      rulebookUrl={"https://drive.google.com/file/d/1eYS4zrsFAwA5NLtgJtER6pXkHa2fl102/view?usp=drive_link"}
      structure={[
        "Prajyot: 9403394000","Shrika Reddy: 6305590331"

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

export default Badminton;

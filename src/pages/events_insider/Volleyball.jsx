import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/VolleyballRulebook.pdf'

const Volleyball = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="volleyball"
      title="Volleyball Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Table Tennis championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={url}
      registrationurl="/events/volleyball"

      structure={[
        "Mayank Singh: 9027206586","Abhinav Srivastava: 9204698703"

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

export default Volleyball;

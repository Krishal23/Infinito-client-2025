import React from 'react';
import EventTemplate from './EventTemplate';
import rulebook from './eventsRuleBook/BasketballRulebook.pdf'

const Basketball = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="basketball"
      title="Basketball Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating basketball championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={rulebook}
      registrationurl="/events/basketball"

      structure={[
        "Risabh Singraur : 7764070448",
        "Abhimanyu : 8969195838",
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

export default Basketball;

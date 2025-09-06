import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/SquashRulebook.pdf';

const ClashRoyale = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="clashroyale"
      title="Clash Royale Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Clash Royale championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={'/update'}
      registrationurl={'/events/clash_royale'}

      structure={["..."]}
      rules={[
        'Teams must have eleven players including a goalkeeper.',
        'Matches will be played with standard football rules.',
        'Any form of unsporting behavior will lead to penalties.',
      ]}
      judgingCriteria="Matches will be judged based on team performance, sportsmanship, and adherence to rules."
      prizes={[
        '1st Place: Rs. 5000',
        '2nd Place: Rs. 3000',
        '3rd Place: Rs. 2000',
      ]}
      isAlreadyRegistered={isAlreadyRegistered}
    />
  );
};

export default ClashRoyale;

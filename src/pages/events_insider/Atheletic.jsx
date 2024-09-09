import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/AthleticsRulebook.pdf';
const Atheletic = () => {
  return (
    <EventTemplate
      name="athletic"
      title="Athletic Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Atheletic championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      registrationurl={'https://docs.google.com/forms/d/1V3z7ZYRja-NrmX543z8ltKPDSZocR6ZkWXINdFHiO5I/viewform?edit_requested=true'}
      rulebookUrl={url}
      structure={['Santosh Yadav: 6387548985', 'Ranjeet Maurya : 7985002878 ']}
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
    />
  );
};

export default Atheletic;

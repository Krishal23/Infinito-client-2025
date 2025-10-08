import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/Freefirerulebook.pdf';

const FreeFire = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="freefire"
      title="Free Fire Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Free Fire championship where teams will compete for the ultimate prize."
      isRegistrationOpen={false}
      rulebookUrl={'https://drive.google.com/file/d/1C-7WA9UABfBbJqOjAtJ9C8Pm7ymwl21T/view'}
      registrationurl={'https://docs.google.com/forms/d/e/1FAIpQLSfGl6T3ma6UIlKbnWeJqnk0UFF088buVwo3Zr3WGuydv8QL1w/viewform'}
      // registrationurl={'/events/freefire'}

      structure={["Saksham Srivastava : 9555899043"]}
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

export default FreeFire;

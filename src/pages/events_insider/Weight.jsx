import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/WeightliftingRulebook.pdf';

const Weight = () => {
  return (
    <EventTemplate
      name="weightlifting"
      title="Weight Lifting Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Weight championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={url}
      registrationurl={'https://docs.google.com/forms/d/1T91iaNl8Kawzat8yTIi7Wb7bUfkTI6I07DBTpbBpXm8/edit'}

      structure={['Nishant: 7858000576', 'Akhilesh Ingole : 9404549742 ']}
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

export default Weight;

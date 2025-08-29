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
      registrationurl={'/events/weightlifting'}

      structure={['Nishant: 7858000576', 'Akhilesh Ingole : 9404549742 ']}
      rules={[
        'Individual sport with weight categories from 56kg to 105+kg',
        'All participants must provide valid Aadhar ID',
        'College ID is optional but recommended',
        'Participants must register in their correct weight category',
        'Must follow all safety guidelines and equipment rules',
        'Standard weightlifting regulations apply',
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

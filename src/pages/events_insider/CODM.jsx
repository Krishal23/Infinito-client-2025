import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/CODM_rulebook1.pdf';

const CODM = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="codm"
      title="CODM Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Squash championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={'https://drive.google.com/file/d/1E4Tkay3NeQrgoJjPyBto_BQuUv1_SnkV/view'}
      registrationurl={'https://docs.google.com/forms/d/e/1FAIpQLSfKMzAvLuHVXvrr-B43fBJz7_NLbu-7wrsfxf_121tVQS75mw/viewform'}
      // registrationurl={'/events/codm'}

      structure={["Ayush : 95082260050"]}
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

export default CODM;

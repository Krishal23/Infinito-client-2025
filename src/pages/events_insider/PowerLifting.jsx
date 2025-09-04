import React from 'react';
import EventTemplate from './EventTemplate';
// import url from './eventsRuleBook/VolleyballRulebook.pdf'
import url from './eventsRuleBook/PowerLiftingRulebook.pdf';


const PowerLift = ({isAlreadyRegistered}) => {
  return (
    <EventTemplate
      name="powerlifting"
      title="Power Lifting Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Power Lifting championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={"https://drive.google.com/file/d/1dJ9zj0Fe8Bifvt2kNKg2mbuQb0WgEbHX/view?usp=drive_link"}
      registrationurl={'/events/powerlifting'}

      structure={[
        "Nishant : 7858000576"

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

export default PowerLift;

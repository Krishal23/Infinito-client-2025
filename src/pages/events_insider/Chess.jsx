import React from 'react';
import EventTemplate from './EventTemplate';
import url from './eventsRuleBook/Chess_rulebook1.pdf'

const Chess = () => {
  return (
    <EventTemplate
      name="chess"

      title="Chess Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Chess championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={url}
      registrationurl={'/events/chess'}

      structure={[
        "Parth Ganjewar : 8308917584"

      ]}
      rules={[
        "Participants can register for singles or doubles category",
        "Singles category is individual participation",
        "Doubles category requires two players from the same college",
        "All participants must provide valid Aadhar ID",
        "College ID is optional but recommended",
        "Standard chess rules and FIDE regulations apply"
      ]}
      judgingCriteria="Matches will be judged based on team performance, sportsmanship, and adherence to rules."
      prizes={[
        "1st Place: Rs. 5000",
        "2nd Place: Rs. 3000",
        "3rd Place: Rs. 2000"
      ]}
    />
  );
};

export default Chess;

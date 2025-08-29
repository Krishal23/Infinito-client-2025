import EventTemplate from "./EventTemplate";
import rulebook from "./eventsRuleBook/CricketRulebook.pdf";

const Cricket = () => {
  return (
    <EventTemplate
      name="cricket"
      title="Cricket Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating Cricket championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={rulebook}
      registrationurl={'/events/cricket'}

      structure={["Rahul: 7360841005", "Ravindra Bhati: 9351371626 "]}
      rules={[
        "Teams must have a minimum of 11 players and can include up to 16 players",
        "Each team must have a designated captain and vice-captain",
        "All players must provide valid Aadhar ID",
        "College ID is optional but recommended",
        "Teams must follow standard cricket regulations",
        "Players can be registered as batsmen, bowlers, all-rounders, or wicket-keepers",
      ]}
      judgingCriteria="Matches will be judged based on team performance, sportsmanship, and adherence to rules."
      prizes={[
        "1st Place: Rs. 5000",
        "2nd Place: Rs. 3000",
        "3rd Place: Rs. 2000",
      ]}
    />
  );
};

export default Cricket;

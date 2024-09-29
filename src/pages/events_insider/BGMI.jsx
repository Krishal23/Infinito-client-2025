import EventTemplate from "./EventTemplate";
import rulebook from "./eventsRuleBook/BGMI_rulebook1.pdf";

const BGMI = () => {
  return (
    <EventTemplate
      name="bgmi"
      title="BGMI Championship"
      date="20/2/2024 - 22/2/2024"
      description="Join us for an exhilarating BGMI championship where teams will compete for the ultimate prize."
      isRegistrationOpen={true}
      rulebookUrl={rulebook}
      registrationurl={'https://forms.gle/QVdqD7r1RRkX9xkL6'}

      structure={["Taksh Bhawan : 8107991007"]}
      rules={[
        "Teams must have eleven players including a goalkeeper.",
        "Matches will be played with standard football rules.",
        "Any form of unsporting behavior will lead to penalties.",
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

export default BGMI;

import EventForm from "../forms-centralized/components/EventForm";
import { eventConfigs } from "../forms-centralized/components/eventConfig";

const Badminton = () => {
  return <EventForm config={eventConfigs.badminton} />;
};

export default Badminton;


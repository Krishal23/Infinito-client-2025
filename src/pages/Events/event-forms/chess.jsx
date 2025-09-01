import EventForm from "../forms-centralized/components/EventForm";
import { eventConfigs } from "../forms-centralized/components/eventConfig";

const Chess = () => {
  return <EventForm config={eventConfigs.chess} />;
};

export default Chess;


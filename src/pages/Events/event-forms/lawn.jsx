import EventForm from "../forms-centralized/components/EventForm";
import { eventConfigs } from "../forms-centralized/components/eventConfig";

const LawnTennis = () => {
  return <EventForm config={eventConfigs.lawn_tennis} />;
};

export default LawnTennis;


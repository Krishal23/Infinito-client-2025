import { esportsConfigs } from "../forms-centralized/esports/esportsConfig";
import EsportsForm from "../forms-centralized/esports/EsportsForm";

const Valorant = () => {
  return <EsportsForm config={esportsConfigs.valorant} />;
};

export default Valorant;
import "./content2.css";
import Card from "./Card.jsx";
import lapino from "./lapinopizza.png";
import pul from "./pul.png";
const content2 = () => {
  return (
    <div className="content2outer bg-transparent">
      <h2 id="heading2" className="headinginner svelte-1suma1w text-white">
        IN PARTNERSHIP WITH
      </h2>
      <div id="all1" className="content2inner svelte-1suma1w">
        <Card top="Powered By" img={lapino} bottom="La Pino Pizza" />
        <Card top="Powered By" img={pul} bottom="Bihar Pul Nirman Vibhag" />
      </div>
    </div>
  );
};

export default content2;

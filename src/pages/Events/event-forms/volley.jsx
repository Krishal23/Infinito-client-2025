import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Volleyball_ = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for VolleyBall</h2>
    </div>

    <div className="rules">
      
     🏐🔥 Spike, Set, and Serve Your Way to Victory! 🔥🏐
      <br />
      <br />
        
     Welcome to the Volleyball Tournament at Infinito – IIT Patna's most thrilling and action-packed sports fest! Get ready to bump, set, and smash your way through intense matches as you and your team battle for ultimate glory on the court! 💥
      <br />
      <br />
      Whether you’re a seasoned spiker or just love the energy of a great game, this is your chance to join the volleyball action and create unforgettable moments with your squad!
      <br />
      <br />
      Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted
      <br />
      <br />
      <strong>Participation Fees</strong> Boys -  Rs. 3600/- per team , Girls - Rs Rs. 3000/- per team
      <br />
      <br />
      <strong>Rulebook</strong> -{" "}
      <a
        href="infinito.iitp.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2024 Volleyball rulebook
      </a>
      <br />
      <br />
      <strong>Registration Guidelines</strong> -{" "}
      <a
        href="infinito.iitp.ac.in" 
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2k24 Guidelines
      </a>
      <br />
      <br />
      For any queries, kindly contact -
      <br />
    Abhinav Srivastava - 9204698703
      <br />
     Abhinandan Porwal - 6306796285
    </div>

    <form className="form">
      <input type="text" placeholder="Team captian (all communications will be made to him/her)" required />
      <input type="text" placeholder="Team vice-captain name" required />
      <input type="email" placeholder="Email" required />
      <input type="tel" placeholder="Team captian number (preferably whatsapp)" required />
      <input type="tel" placeholder="Team vice-captian number (preferably whatsapp)" required />
       <div className="radio">
        Team:
        <label>
          <input type="radio" name="gender" value="men" required /> Men
        </label>
        <label>
          <input type="radio" name="gender" value="women" /> Women
        </label>
      </div>
      <input type="text" placeholder="College Name" required />
      <input type="text" placeholder="College Address" required />
     

      
     

      <button type="submit">Register</button>
    </form>
  </section>
  <Footer/>
  </div >
);

export default Volleyball_;

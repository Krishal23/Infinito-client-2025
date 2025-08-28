import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const Basketball_ = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for Basketball   </h2>
    </div>

    <div className="rules">
      
     The ref calls for a jump ball. You are now in possession, guarded by three, with nowhere to go you attempt a fadeaway. Did it go through the hoop, rebound of the backboard or was it just an airball?
There's only one way to figure that out - Register in the latest edition of INFINITO and bring out the MJ in you with those alley-oops and dunks.
      <br />
      <br />
      Note: Participants should fill in details correctly, and the participants will be solely responsible for any incorrect information submitted.
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
        Infinito 2024 Basketball rulebook
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
     Rishabh Singraur - 7764070448
      <br />
     Abhimanyu - 8969195838
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

export default Basketball_;

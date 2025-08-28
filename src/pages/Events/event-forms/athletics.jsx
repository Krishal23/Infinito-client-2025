import React from "react";
import './forms.css';
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
const Athletics = () => (
    <div className="div">
        <Navbar/>
  <section className="event-forms">
    <div className="form-heading">
      <h2>Register for ATHLETICS</h2>
    </div>

    <div className="rules">
      🏃‍♂️🏅 Get Ready to Run, Jump, and Throw Your Way to Glory! 🏅🏃‍♀️
      <br />
      Welcome to Infinito 2024, the biggest and most exhilarating sports fest of
      IIT Patna! If you've got speed in your legs, strength in your arms, or the
      heart of a champion, this is your time to shine! 💥
      <br />
      <br />
      Whether you're a lightning-fast sprinter, a long-distance warrior, or a
      master of field events, we've got just the event for you to prove you're
      the best on campus. Ready to make some unforgettable memories? Let's bring
      the energy and excitement to the track and field!
      <br />
      <br />
      <strong>Participation Fees</strong> - Rs 500/- per head (3 individual
      events + 2 relay events)
      <br />
      <br />
      <strong>Rulebook</strong> -{" "}
      <a
        href="infinito.iitp.ac.in"
        target="_blank"
        rel="noopener noreferrer"
      >
        Infinito 2024 Athletics rulebook
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
      Santosh Yadav - 6387548985
      <br />
      Ranjeet Maurya - 7985002878
      <br />
      Swati Yadav - 9832240825
    </div>

    <form className="form">
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="email" placeholder="Email" required />
      <input type="text" placeholder="User ID" required />
      <input type="tel" placeholder="Whatsapp Number" required />
       <div className="radio">
        Gender:
        <label>
          <input type="radio" name="gender" value="male" required /> Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" /> Female
        </label>
      </div>
      <input type="text" placeholder="College Name" required />
      <input type="text" placeholder="College Address" required />
      <div className="radio">
        Will the coach be accompanying the player?

        <label>
          <input type="radio" name="coach" value="yes" required /> Yes
        </label>
        <label>
          <input type="radio" name="coach" value="no" /> No
        </label>
      </div>
      <input type="text" placeholder="Name of the coach (if yes)" />
      <input type="tel" placeholder="Mobile number of coach (if yes)" />


      
     

      <button type="submit">Register</button>
    </form>
  </section>
  <Footer/>
  </div >
);

export default Athletics;

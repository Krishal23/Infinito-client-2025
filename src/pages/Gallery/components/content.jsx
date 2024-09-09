import React from 'react'
import "./content.css";
import Card from './Card.jsx';
import img1 from "../assets/1.jpg"
import img2 from "../assets/2.jpg"
import img3 from "../assets/3.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"
import img6 from "../assets/6.jpg"
import img7 from "../assets/7.jpg"
import img8 from "../assets/8.jpg"
import img9 from "../assets/9.jpg"
import img10 from "../assets/10.jpg"
import img11 from "../assets/11.jpg"
import img12 from "../assets/12.jpg"
import Navbar from '../../../components/Navbar.jsx';
import Footer from '../../../components/Footer.jsx';

const content = () => {
  return (
    <>
    <Navbar/>
    <div id="all" className='contentdiv svelte-1suma1w'>
      <Card myimg= {img1} className="img"/>
      <Card myimg={img2}  />
      <Card myimg={img3}  />
      <Card myimg= {img4} />
      <Card myimg={img5}  />
      <Card myimg={img6}  />
      <Card myimg={img7} />
      <Card myimg={img8}  />
      <Card myimg={img9}  />
      <Card myimg={img10}  />
      <Card myimg={img11}  />
      <Card myimg={img12}  />

    </div>
    <Footer/>
    </>
  )
}

export default content;

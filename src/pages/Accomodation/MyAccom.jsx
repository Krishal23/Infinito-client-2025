import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAccommodationBooking } from "../../utils/useAccommodationBooking";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import AccommodationDetails from '../../components/Admin/AccomDetails'


export default function MyAccom() {
  
  return (
    <>
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('./accomBG.jpg')" }}
    >
        <Navbar/>
        <div className='m-4'>
        <AccommodationDetails endpoint={'/accommodation/my-accom'}/>
        </div>
    </div>
      <Footer />
    </>
  );
}

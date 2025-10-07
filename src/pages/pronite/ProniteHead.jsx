import React from "react";
import { motion } from "framer-motion";
import logo from "/Infi25.png"; // your logo
import { thisYearArtists, previousArtists } from "./proniteData";

const PronitePage = () => {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans overflow-x-hidden">
      
      {/* 1️⃣ Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <img
          src={logo}
          alt="Infinito Logo"
          className="absolute top-8 left-8 w-32 opacity-30"
        />
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-red-500 drop-shadow-lg mb-4"
        >
          Imperio Gurreo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-white/90 mb-6"
        >
          The Night of Legends – Infinito IIT Patna 2025
        </motion.p>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-2"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400">
            Last Minute India Band
          </h2>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-400">
            DJ Avneet
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="mt-6 px-8 py-4 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full text-black font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            Book Your Spot
          </motion.button>
        </motion.div>
      </section>

      {/* 2️⃣ This Year Artists */}
      <section className="py-16 px-8">
        <h2 className="text-4xl font-semibold text-center mb-12 tracking-wide">
          This Year's Lineup
        </h2>
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4">
          {thisYearArtists.map((a, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="snap-center min-w-[250px] bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <img src={a.image} alt={a.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold">{a.name}</h3>
                <p className="text-gray-300">{a.genre}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3️⃣ History of Infinito */}
      <section className="py-16 px-8 bg-gradient-to-t from-[#111] to-[#0a0a0a]">
        <h2 className="text-4xl font-semibold text-center mb-10 tracking-wide">
          Legacy Performances
        </h2>
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {previousArtists.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg cursor-pointer group"
            >
              <img src={p.image} alt={p.name} className="w-full h-56 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex flex-col justify-center items-center text-center">
                <h4 className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {p.name}
                </h4>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">Past Performer</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PronitePage;

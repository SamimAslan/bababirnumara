import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import emptyStateImg from "../assets/empty-state.svg";

const MyTicketsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col font-sans">
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        
        <img 
            src={emptyStateImg} 
            alt="No tickets illustration" 
            className="w-72 h-72 md:w-96 md:h-96 mb-6 drop-shadow-xl select-none pointer-events-none hover:scale-105 transition-transform duration-500 ease-in-out"
        />

        <h1 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3 text-center tracking-tight">
          No upcoming trips
        </h1>
        
        <p className="text-gray-500 text-center mb-10 max-w-sm text-sm md:text-base leading-relaxed">
          Ready for takeoff? Your next adventure is just a search away. Find the best flights and start packing.
        </p>

        <Button 
          onClick={() => navigate('/')}
          className="!w-auto bg-[#2F34A2] hover:bg-[#262a85] text-white px-8 py-3 rounded-xl shadow-lg shadow-[#2F34A2]/20 font-semibold text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Book a Flight
        </Button>

      </div>

      <Footer />
    </div>
  );
};

export default MyTicketsPage;
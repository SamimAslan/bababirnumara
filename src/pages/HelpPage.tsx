import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { 
  Search, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp,
  MessageCircle
} from 'lucide-react';

const faqs = [
  {
    question: "How do I cancel or change my booking?",
    answer: "You can manage your booking directly from the 'My Tickets' section. Select your trip and click 'Modify Booking'. Depending on your fare type, cancellations may be eligible for an instant refund to your NomadGo credit balance."
  },
  {
    question: "What is included in the NomadGo Guarantee?",
    answer: "Our guarantee covers instant refunds for cancellations within 24 hours of booking, price drop protection, and 24/7 global support. If your flight is delayed by more than 3 hours, we automatically process compensation."
  },
  {
    question: "How do I check in for my flight?",
    answer: "Online check-in opens 24-48 hours before departure. We'll send you a notification with a direct link. Alternatively, you can use the airline's reference number found on your ticket to check in on their website."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay. Transactions are secured with end-to-end encryption. You can also use earned NomadGo credits to pay for part or all of your journey."
  },
  {
    question: "I haven't received my confirmation email.",
    answer: "Please check your spam/junk folder first. If it's not there, go to 'My Tickets' where you can download your confirmation PDF directly. You can also request a resend from the booking details page."
  }
];

const HelpPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans text-[#111827]">
      <Navbar />

      <main className="flex-grow">
        <div className="bg-white border-b border-gray-100 pb-16 pt-16 md:pt-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-[#111827]">
              How can we help?
            </h1>
            
            <div className="relative max-w-2xl mx-auto shadow-xl shadow-gray-200/50 rounded-full">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-6 w-6 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-14 pr-6 py-5 rounded-full border-0 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2F34A2] sm:text-lg shadow-sm transition-all"
                placeholder="Search for articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Popular: <span className="text-[#2F34A2] cursor-pointer hover:underline">Refunds</span>, <span className="text-[#2F34A2] cursor-pointer hover:underline">Payments</span>, <span className="text-[#2F34A2] cursor-pointer hover:underline">Change Flight</span>
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-center">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#409F68] transition-colors duration-300">
                <RefreshCw className="w-8 h-8 text-[#409F68] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Refunds & Cancellations</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Track status, request refunds, or cancel your upcoming trip.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-center">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#409F68] transition-colors duration-300">
                <CheckCircle2 className="w-8 h-8 text-[#409F68] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Check-in & Boarding</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Get your boarding pass, seat selection, and terminal info.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer text-center">
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#409F68] transition-colors duration-300">
                <ShieldCheck className="w-8 h-8 text-[#409F68] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Travel Protection</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Details about your insurance coverage and claims process.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#111827]">Solve it yourself</h2>
            <p className="text-gray-500 mt-2">Quick answers to common questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                  openIndex === index ? 'border-[#2F34A2] ring-1 ring-[#2F34A2]/10 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={`font-semibold ${openIndex === index ? 'text-[#2F34A2]' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-[#2F34A2]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                
                <div 
                  className={`px-6 text-gray-600 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Link to="/contact">
        <button className="fixed bottom-8 right-8 bg-[#2F34A2] hover:bg-[#252985] text-white p-4 rounded-full shadow-2xl shadow-[#2F34A2]/30 transition-all hover:scale-110 z-50 flex items-center justify-center group">
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap group-hover:pl-2 font-medium">
            Contact Us
          </span>
        </button>
      </Link>

      <Footer />
    </div>
  );
};

export default HelpPage;
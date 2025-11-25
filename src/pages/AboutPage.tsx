import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ArrowRight, Target, Users, Globe2 } from "lucide-react";

const teamMembers = [
  {
    name: "Yasin Kereci",
    role: "Founder & CEO",
    image: "",
  },
  {
    name: "Yavuz Özbay",
    role: "Head of Product",
    image: "",
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#2F34A2] selection:text-white">
      <Navbar />

      <main>
        <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 max-w-[1800px] mx-auto">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9]">
              We are <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-gray-600">
                NomadGo.
              </span>
            </h1>
            <div className="w-24 h-1 bg-[#2F34A2] mb-12"></div>
            <p className="text-xl md:text-3xl font-light text-gray-800 max-w-4xl leading-relaxed">
              Redefining the modern travel experience through precision,
              elegance, and seamless technology.
            </p>
          </div>
        </section>
        <section className="px-6 py-24 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-[#2F34A2]" />
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                The travel industry was built on legacy systems and cluttered interfaces. 
                We believe in a different approach. One where the journey begins 
                the moment you decide to go, not when you arrive.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                By stripping away the non-essential, we focus purely on what matters: 
                getting you there with style, speed, and absolute confidence.
              </p>
            </div>
            <div className="space-y-12">
              <div className="group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#2F34A2] transition-colors">Precision</h3>
                <p className="text-gray-500">Every pixel, every route, every calculation is optimized for accuracy.</p>
              </div>
              <div className="group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#2F34A2] transition-colors">Global Reach</h3>
                <p className="text-gray-500">Connecting over 150 countries with a unified booking standard.</p>
              </div>
              <div className="group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#2F34A2] transition-colors">Transparency</h3>
                <p className="text-gray-500">No hidden fees. No dark patterns. Just honest travel.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="px-6 py-24 bg-black text-white">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
            <div className="border-l border-[#2F34A2] pl-6">
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-gray-400 text-sm tracking-widest uppercase">Secure</div>
            </div>
            <div className="border-l border-[#2F34A2] pl-6">
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-gray-400 text-sm tracking-widest uppercase">Countries</div>
            </div>
            <div className="border-l border-[#2F34A2] pl-6">
              <div className="text-5xl font-bold mb-2">24/7</div>
              <div className="text-gray-400 text-sm tracking-widest uppercase">Support</div>
            </div>
            <div className="border-l border-[#2F34A2] pl-6">
              <div className="text-5xl font-bold mb-2">TOP</div>
              <div className="text-gray-400 text-sm tracking-widest uppercase">Quality</div>
            </div>
          </div>
        </section>
        <section className="px-6 py-32 max-w-[1800px] mx-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl font-bold tracking-tight">Leadership</h2>
              <div className="hidden md:flex items-center gap-2 text-[#2F34A2] font-medium">
                <Users className="w-5 h-5" />
                <span>Meet the board</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="relative overflow-hidden mb-6 aspect-[3/4]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border border-black/5 pointer-events-none"></div>
                  </div>
                  <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                  <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 py-32 bg-gray-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-black tracking-tight">
              Ready to travel different?
            </h2>
            <p className="text-xl text-gray-600 mb-12 font-light">
              Join millions of nomads who have chosen simplicity over chaos.
            </p>
            <button className="bg-[#2F34A2] text-white px-10 py-4 rounded-none hover:bg-[#23277a] transition-colors duration-300 flex items-center gap-3 mx-auto text-lg font-medium tracking-wide">
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;

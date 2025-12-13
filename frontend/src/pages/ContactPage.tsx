import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-white flex flex-col justify-center px-8 py-16 lg:px-24 xl:px-32 relative">
          <div className="max-w-xl w-full mx-auto z-10">
            <div className="mb-10">
              <span className="text-[#2F34A2] font-bold tracking-wider uppercase text-sm mb-2 block">
                Get in touch
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#111827] mb-4 tracking-tight">
                Let's chat.
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed">
                Have questions about your next trip or need assistance with a
                booking? Our team is ready to help you navigate the world.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="name"
                  label="Full Name"
                  placeholder="Jane Cooper"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                />
                <Input
                  id="email"
                  type="email"
                  label="Email Address"
                  placeholder="jane@nomadgo.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="bg-gray-50 border-gray-200 focus:bg-white"
                />
              </div>

              <Input
                id="subject"
                label="Subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="bg-gray-50 border-gray-200 focus:bg-white"
              />

              <div className="w-full">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2F34A2] focus:bg-white focus:border-transparent transition-all resize-none"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="bg-[#2F34A2] hover:bg-[#252985] text-white shadow-xl shadow-[#2F34A2]/20 h-14 text-base"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </form>

            <div className="mt-16 pt-10 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#2F34A2] transition-colors duration-300">
                  <Mail className="w-6 h-6 text-[#2F34A2] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Email us</h3>
                  <p className="text-gray-500 text-sm">support@nomadgo.com</p>
                  <p className="text-gray-500 text-sm">press@nomadgo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#2F34A2] transition-colors duration-300">
                  <Phone className="w-6 h-6 text-[#2F34A2] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Call us</h3>
                  <p className="text-gray-500 text-sm">+41 44 123 45 67</p>
                  <p className="text-gray-500 text-sm">Mon - Fri, 8am - 6pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group sm:col-span-2">
                <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-[#2F34A2] transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-[#2F34A2] group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Visit us</h3>
                  <p className="text-gray-500 text-sm">
                    Bahnhofstrasse 100, 8001 Zürich, Switzerland
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block w-1/2 relative overflow-hidden bg-[#1e2265]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2F34A2]/90 to-[#111827]/90 mix-blend-multiply"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12 text-center">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center mb-8 border border-white/20 shadow-2xl">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 tracking-tight">
              We're here for you.
            </h2>
            <p className="text-blue-100 text-lg max-w-md leading-relaxed">
              Whether you're a digital nomad looking for your next workspace or
              a traveler seeking adventure, our global support team is always
              just a message away.
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20 pointer-events-none">
              <div className="w-2 h-2 bg-white rounded-full absolute bottom-12 left-1/4 animate-pulse"></div>
              <div className="w-2 h-2 bg-white rounded-full absolute bottom-32 left-1/3 animate-pulse delay-700"></div>
              <div className="w-2 h-2 bg-white rounded-full absolute bottom-24 right-1/4 animate-pulse delay-300"></div>
              <div className="w-2 h-2 bg-white rounded-full absolute top-12 right-1/3 animate-pulse delay-500"></div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;

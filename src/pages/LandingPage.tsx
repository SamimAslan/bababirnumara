import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useCurrencyStore } from "../store/useCurrencyStore";
import {
  ChevronDown,
  Calendar,
  MapPin,
  X,
  ArrowRight,
  Shield,
  Zap,
  Percent,
  Plus,
  Minus,
  User,
  Baby,
  Smile,
} from "lucide-react";

const carouselSlides = [
  {
    title: "Rise above all travel anxieties",
    subtitle: "The new NomadGo guarantee",
    icon: <Shield className="w-24 h-24 text-white transform -rotate-45" />,
    bgColor: "bg-[#409F68]",
    textColor: "text-[#111827]",
  },
  {
    title: "Lightning fast booking process",
    subtitle: "Save time, travel more",
    icon: <Zap className="w-24 h-24 text-white transform rotate-12" />,
    bgColor: "bg-[#2F34A2]",
    textColor: "text-[#111827]",
  },
  {
    title: "Exclusive deals up to 40% off",
    subtitle: "Member special offers",
    icon: <Percent className="w-24 h-24 text-white" />,
    bgColor: "bg-[#A22F2F]",
    textColor: "text-[#111827]",
  },
];

interface PassengerConfig {
  adults: number;
  children: number;
  infants: number;
}

const LandingPage: React.FC = () => {
  const [fromCity, setFromCity] = useState("Zürich");
  const [toCity, setToCity] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const { convertPrice } = useCurrencyStore();

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("Return");
  const [isTripTypeOpen, setIsTripTypeOpen] = useState(false);

  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [passengers, setPassengers] = useState<PassengerConfig>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const passengerDropdownRef = useRef<HTMLDivElement>(null);
  const tripTypeDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 2000);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        passengerDropdownRef.current &&
        !passengerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPassengerOpen(false);
      }
      if (
        tripTypeDropdownRef.current &&
        !tripTypeDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTripTypeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      clearInterval(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updatePassenger = (key: keyof PassengerConfig, delta: number) => {
    setPassengers((prev) => {
      const newValue = prev[key] + delta;
      if (newValue < 0) return prev;
      if (key === "adults" && newValue < 1) return prev;
      return { ...prev, [key]: newValue };
    });
  };

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Anytime";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col">
      <Navbar />

      <div className="flex-grow">
        <div className="relative bg-gradient-to-r from-[#E0F2F1] to-[#F3F4F6] pb-24 pt-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#111827] mb-8">
              Fly for less, Guaranteed!
            </h1>
            <div className="bg-white rounded-xl shadow-xl p-1 max-w-5xl mx-auto relative z-20">
              <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-2 md:gap-4 mb-2">
                  <div className="relative" ref={tripTypeDropdownRef}>
                    <button
                      onClick={() => setIsTripTypeOpen(!isTripTypeOpen)}
                      className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm font-medium text-gray-700 transition-colors"
                    >
                      {tripType}{" "}
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                    {isTripTypeOpen && (
                      <div className="absolute top-full left-0 mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                        {["Return", "One-way", "Nomad"].map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              setTripType(type);
                              setIsTripTypeOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                              tripType === type
                                ? "text-[#2F34A2] font-semibold"
                                : "text-gray-700"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="relative" ref={passengerDropdownRef}>
                    <button
                      onClick={() => setIsPassengerOpen(!isPassengerOpen)}
                      className="flex items-center gap-1 px-3 py-1.5 hover:bg-gray-100 rounded text-sm font-medium text-gray-700 transition-colors"
                    >
                      {totalPassengers} Passenger
                      {totalPassengers !== 1 ? "s" : ""}
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>

                    {isPassengerOpen && (
                      <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
                        <div className="mb-4">
                          <h4 className="text-sm font-bold text-gray-900 mb-3">
                            Passengers
                          </h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Adults
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Over 11
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updatePassenger("adults", -1)}
                                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                                  disabled={passengers.adults <= 1}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium w-4 text-center">
                                  {passengers.adults}
                                </span>
                                <button
                                  onClick={() => updatePassenger("adults", 1)}
                                  className="p-1 rounded-full hover:bg-gray-100 text-[#2F34A2]"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Smile className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Children
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    2 – 11
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() =>
                                    updatePassenger("children", -1)
                                  }
                                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                                  disabled={passengers.children <= 0}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium w-4 text-center">
                                  {passengers.children}
                                </span>
                                <button
                                  onClick={() => updatePassenger("children", 1)}
                                  className="p-1 rounded-full hover:bg-gray-100 text-[#2F34A2]"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Baby className="w-5 h-5 text-gray-400" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    Infants
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Under 2
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => updatePassenger("infants", -1)}
                                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500 disabled:opacity-30"
                                  disabled={passengers.infants <= 0}
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium w-4 text-center">
                                  {passengers.infants}
                                </span>
                                <button
                                  onClick={() => updatePassenger("infants", 1)}
                                  className="p-1 rounded-full hover:bg-gray-100 text-[#2F34A2]"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 border-t border-gray-100 pt-4">
                          <button
                            onClick={() => setIsPassengerOpen(false)}
                            className="w-full bg-[#2F34A2] text-white font-semibold py-2 rounded-lg hover:bg-[#262a85] transition-colors"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-0 bg-gray-100/50 p-1 md:bg-transparent rounded-lg md:rounded-none">
                  <div
                    className={`${
                      tripType === "Nomad" ? "md:col-span-6" : "md:col-span-3"
                    } relative group`}
                  >
                    <div
                      className={`flex items-center bg-white border border-gray-300 rounded-t-lg md:rounded-l-lg ${
                        tripType === "Nomad" ? "" : "md:rounded-tr-none"
                      } p-3 h-14 hover:border-gray-400 transition-colors cursor-text`}
                    >
                      <div className="flex items-center gap-2 w-full overflow-hidden">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <div className="flex items-center gap-1 bg-green-100 text-[#2F34A2] px-2 py-0.5 rounded-full text-sm font-medium whitespace-nowrap">
                          {fromCity}
                          <button
                            onClick={() => setFromCity("")}
                            className="hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        {!fromCity && (
                          <input
                            className="outline-none text-gray-900 w-full"
                            placeholder="From?"
                            value={fromCity}
                            onChange={(e) => setFromCity(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {tripType !== "Nomad" && (
                    <div className="md:col-span-3 relative">
                      <div className="flex items-center bg-white border-x-0 md:border-l-0 border-t-0 border-b md:border-y border-gray-300 p-3 h-14 hover:border-gray-400 hover:z-10 transition-colors cursor-text">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mr-2" />
                        <input
                          type="text"
                          placeholder="City, airport or place"
                          className="w-full outline-none text-gray-900 placeholder-gray-500 font-medium"
                          value={toCity}
                          onChange={(e) => setToCity(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  <div className="md:col-span-2 relative">
                    <div className="flex items-center bg-white border border-gray-300 md:border-l-0 border-b-0 md:border-b p-3 h-14 hover:border-gray-400 hover:z-10 transition-colors cursor-pointer relative">
                      <input
                        type="date"
                        className="absolute inset-0 opacity-0 z-10 cursor-pointer w-full h-full"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                        onClick={(e) => {
                          try {
                            if ("showPicker" in HTMLInputElement.prototype) {
                              e.currentTarget.showPicker();
                            }
                          } catch (err) {}
                        }}
                      />
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mr-2" />
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-gray-500 font-medium">
                          Departure
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            departureDate ? "text-[#111827]" : "text-gray-900"
                          }`}
                        >
                          {formatDate(departureDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 relative">
                    <div className="flex items-center bg-white border border-gray-300 md:border-l-0 border-b md:border-r-0 p-3 h-14 hover:border-gray-400 hover:z-10 transition-colors cursor-pointer relative">
                      {tripType !== "One-way" && (
                        <input
                          type="date"
                          className="absolute inset-0 opacity-0 z-10 cursor-pointer w-full h-full"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={departureDate}
                          onClick={(e) => {
                            try {
                              if ("showPicker" in HTMLInputElement.prototype) {
                                e.currentTarget.showPicker();
                              }
                            } catch (err) {}
                          }}
                        />
                      )}
                      <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mr-2" />
                      <div className="flex flex-col justify-center">
                        <span className="text-xs text-gray-500 font-medium">
                          Return
                        </span>
                        <span
                          className={`text-sm font-bold ${
                            returnDate
                              ? "text-[#111827]"
                              : tripType === "One-way"
                              ? "text-gray-400"
                              : "text-gray-900"
                          }`}
                        >
                          {tripType === "One-way"
                            ? "No Return"
                            : formatDate(returnDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <button className="w-full h-14 bg-[#409F68] hover:bg-[#368f5b] text-white font-bold rounded-b-lg md:rounded-r-lg md:rounded-bl-none flex items-center justify-center gap-2 transition-colors">
                      Explore <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center h-5">
                    <input
                      id="hotels"
                      name="hotels"
                      type="checkbox"
                      className="h-4 w-4 text-[#409F68] focus:ring-[#409F68] border-gray-300 rounded"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor="hotels"
                      className="font-medium text-gray-700"
                    >
                      Check accommodation with{" "}
                      <a
                        href="https://www.booking.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Booking.com
                      </a>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-purple-700 to-purple-500 shadow-lg text-white relative">
              <div className="p-8 flex flex-col justify-between h-full relative z-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-1 rounded inline-block mb-4">
                    Refer a Friend
                  </span>
                  <h3 className="text-2xl font-bold mb-2">
                    Invite friends to get up
                    <br />
                    to SFr. 500 in Credit
                  </h3>
                </div>
                <div className="mt-8">
                  <button className="bg-[#2f1c6a] hover:bg-[#1e1245] text-white font-bold py-2 px-6 rounded-lg transition-colors">
                    Fly for free
                  </button>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-20">
                <div className="w-64 h-64 bg-yellow-300 rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-100 flex relative min-h-[220px]">
              {carouselSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0"
                  }`}
                >
                  <div className="flex h-full w-full">
                    <div className="p-8 flex flex-col justify-center w-2/3">
                      <span className="text-[#409F68] font-bold text-sm mb-2">
                        {slide.subtitle}
                      </span>
                      <h3 className="text-2xl font-bold text-[#111827] mb-4">
                        {slide.title}
                      </h3>
                      <div className="flex gap-1 mt-2">
                        {carouselSlides.map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              dotIndex === currentSlide
                                ? "bg-[#409F68]"
                                : "bg-gray-300"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <div
                        className={`${slide.bgColor} w-48 h-48 transform rotate-45 translate-x-10 flex items-center justify-center shadow-lg transition-colors duration-500`}
                      >
                        {slide.icon}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-2xl font-bold text-[#111827] mb-6">
            Popular destinations from Zürich
          </h2>
          <p className="text-gray-600 mb-8">
            These alluring destinations from Zürich are picked just for you.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: "London", priceCHF: 45, country: "United Kingdom" },
              { city: "Paris", priceCHF: 52, country: "France" },
              { city: "Berlin", priceCHF: 60, country: "Germany" },
              { city: "Barcelona", priceCHF: 75, country: "Spain" },
            ].map((dest, idx) => (
              <div
                key={idx}
                className="group cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white"
              >
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10`}
                  />
                  <img
                    src={`https://source.unsplash.com/800x600/?${dest.city}`}
                    alt={dest.city}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <span className="absolute bottom-4 left-4 text-white font-bold text-xl z-20">
                    {dest.city}
                  </span>
                  <span className="absolute bottom-4 right-4 bg-[#409F68] text-white text-xs font-bold px-2 py-1 rounded z-20">
                    {convertPrice(dest.priceCHF)}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 font-medium">
                    {dest.country}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Direct • 1h 30m</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;

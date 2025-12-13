import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NomadModal } from "../components/NomadModal";
import { useCurrencyStore } from "../store/useCurrencyStore";
import { CityAutocomplete } from "../components/CityAutoComplete";
import type { NomadFormState, PassengerConfig } from "../types";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Calendar,
  MapPin,
  ArrowRight,
  Shield,
  Plus,
  Minus,
  User,
  Baby,
  Smile,
  Gift,
  Users,
} from "lucide-react";

const LandingPage: React.FC = () => {
  const [fromCity, setFromCity] = useState("Zürich");
  const { convertPrice } = useCurrencyStore();
  const navigate = useNavigate();

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType] = useState("Nomad");

  const [errors, setErrors] = useState<{
    departure?: boolean;
    return?: boolean;
  }>({});

  const [isPassengerOpen, setIsPassengerOpen] = useState(false);
  const [passengers, setPassengers] = useState<PassengerConfig>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [isNomadModalOpen, setIsNomadModalOpen] = useState(false);
  const [nomadForm, setNomadForm] = useState<NomadFormState>({
    dest1: "",
    dest2: "",
    isReturnDifferent: false,
    endCity: "Zürich",
  });

  const passengerDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        passengerDropdownRef.current &&
        !passengerDropdownRef.current.contains(event.target as Node)
      ) {
        setIsPassengerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
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

  const validateSearch = () => {
    const newErrors: { departure?: boolean; return?: boolean } = {};
    let isValid = true;

    if (!departureDate) {
      newErrors.departure = true;
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleExplore = () => {
    if (!validateSearch()) return;

    if (tripType === "Nomad") {
      setIsNomadModalOpen(true);
      setNomadForm((prev) => ({ ...prev, endCity: fromCity }));
    } else {
      console.log("Searching standard flights...");
    }
  };

  const handleNomadSearch = (form: NomadFormState) => {
    navigate("/nomad-results", {
      state: {
        fromCity,
        dest1: form.dest1,
        dest2: form.dest2,
        endCity: form.isReturnDifferent ? form.endCity : fromCity,
        isReturnDifferent: form.isReturnDifferent,
        startDate: departureDate,
        returnDate: returnDate,
        passengers: passengers,
      },
    });
  };
  const destinationImages: Record<string, string> = {
    London:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    Paris:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    Berlin:
      "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=800&q=80",
    Barcelona:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col relative">
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
                  <div className="flex items-center px-3 py-1.5 text-sm font-bold text-gray-900">
                    Nomad
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
                  <div className="md:col-span-6 relative group">
                    <div className="flex items-center bg-white border border-gray-300 rounded-t-lg md:rounded-l-lg p-3 h-14 hover:border-gray-400 transition-colors cursor-text">
                      <div className="flex items-center gap-2 w-full">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        <CityAutocomplete
                          value={fromCity}
                          onChange={setFromCity}
                          placeholder="From?"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 relative">
                    <div
                      className={`flex items-center bg-white border ${
                        errors.departure
                          ? "border-[#A22F2F]"
                          : "border-gray-300"
                      } md:border-l-0 border-b-0 md:border-b p-3 h-14 hover:border-gray-400 hover:z-10 transition-colors cursor-pointer relative`}
                    >
                      <input
                        type="date"
                        className="absolute inset-0 opacity-0 z-10 cursor-pointer w-full h-full"
                        value={departureDate}
                        onChange={(e) => {
                          setDepartureDate(e.target.value);
                          setErrors({ ...errors, departure: false });
                        }}
                        onClick={(e) => {
                          try {
                            if ("showPicker" in HTMLInputElement.prototype) {
                              e.currentTarget.showPicker();
                            }
                          } catch (err) {}
                        }}
                      />
                      <Calendar
                        className={`w-5 h-5 flex-shrink-0 mr-2 ${
                          errors.departure ? "text-[#A22F2F]" : "text-gray-400"
                        }`}
                      />
                      <div className="flex flex-col justify-center">
                        <span
                          className={`text-xs font-medium ${
                            errors.departure
                              ? "text-[#A22F2F]"
                              : "text-gray-500"
                          }`}
                        >
                          Departure {errors.departure && "*"}
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
                    <div
                      className={`flex items-center bg-white border ${
                        errors.return ? "border-[#A22F2F]" : "border-gray-300"
                      } md:border-l-0 border-b md:border-r-0 p-3 h-14 hover:border-gray-400 hover:z-10 transition-colors cursor-pointer relative`}
                    >
                      <input
                        type="date"
                        className="absolute inset-0 opacity-0 z-10 cursor-pointer w-full h-full"
                        value={returnDate}
                        onChange={(e) => {
                          setReturnDate(e.target.value);
                          setErrors({ ...errors, return: false });
                        }}
                        min={departureDate}
                        onClick={(e) => {
                          try {
                            if ("showPicker" in HTMLInputElement.prototype) {
                              e.currentTarget.showPicker();
                            }
                          } catch (err) {}
                        }}
                      />
                      <Calendar
                        className={`w-5 h-5 flex-shrink-0 mr-2 ${
                          errors.return ? "text-[#A22F2F]" : "text-gray-400"
                        }`}
                      />
                      <div className="flex flex-col justify-center">
                        <span
                          className={`text-xs font-medium ${
                            errors.return ? "text-[#A22F2F]" : "text-gray-500"
                          }`}
                        >
                          Return {errors.return && "*"}
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {formatDate(returnDate)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      onClick={handleExplore}
                      className="w-full h-14 bg-[#2F34A2] hover:bg-[#262a85] text-white font-bold rounded-b-lg md:rounded-r-lg md:rounded-bl-none flex items-center justify-center gap-2 transition-colors"
                    >
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

        {/* Marketing Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-[#2F34A2] to-[#151963] shadow-2xl text-white relative group cursor-pointer">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#409F68] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

              <div className="p-8 md:p-10 flex flex-col justify-between h-full relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 mb-6">
                      <Gift className="w-3 h-3 text-[#409F68]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-100">
                        Referral Program
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold mb-2 leading-tight">
                      Earn up to <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#409F68] to-emerald-300 font-extrabold text-4xl">
                        CHF 500
                      </span>
                    </h3>
                    <p className="text-blue-200 mt-2 font-medium max-w-xs">
                      Share the joy of travel. Give your friends a discount and
                      earn travel credit.
                    </p>
                  </div>

                  <div className="hidden sm:flex bg-white/10 rounded-full p-4 border border-white/10 shadow-inner">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button className="bg-white text-[#2F34A2] hover:bg-blue-50 font-bold py-3 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 group-hover:gap-3">
                    Start Inviting <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-medium text-blue-200 underline cursor-pointer hover:text-white">
                    Terms apply
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100 relative group min-h-[220px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2F34A2]/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>

              <div className="p-8 md:p-10 flex flex-col justify-between h-full relative z-10">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-blue-100/50 px-3 py-1 rounded-full text-[#2F34A2] mb-4">
                      <Shield className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        The NomadGo Guarantee
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-[#111827] mb-2">
                      Travel without <br />
                      <span className="text-[#2F34A2]">uncertainty.</span>
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm max-w-xs">
                      Instant refunds, 24/7 global support, and price protection
                      on every booking.
                    </p>
                  </div>

                  <div className="hidden sm:flex bg-[#2F34A2] rounded-full p-4 shadow-xl shadow-blue-900/10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="mt-6">
                  <button className="text-[#2F34A2] font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn about our promise <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
                    src={destinationImages[dest.city]}
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

      <NomadModal
        isOpen={isNomadModalOpen}
        onClose={() => setIsNomadModalOpen(false)}
        form={nomadForm}
        setForm={setNomadForm}
        fromCity={fromCity}
        onSearch={handleNomadSearch}
      />
    </div>
  );
};

export default LandingPage;

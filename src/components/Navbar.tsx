import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe,
  Menu,
  HelpCircle,
  Ticket,
  Loader2,
  ChevronDown,
  Info,
  Mail,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useCurrencyStore } from "../store/useCurrencyStore";
import { Button } from "./Button";
import logo from "../assets/logo.png";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { currency, setCurrency, fetchRates, isLoading } = useCurrencyStore();
  const navigate = useNavigate();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const supportedCurrencies = [
    "CHF",
    "USD",
    "EUR",
    "GBP",
    "TRY",
    "JPY",
    "AUD",
    "CAD",
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="NomadGo" className="h-16 w-auto md:h-20" />
            </Link>

            <div className="hidden md:flex items-center space-x-2 text-sm font-medium text-gray-600">
              <Link
                to="/tickets"
                className="flex items-center gap-2 text-[#2F34A2] hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
              >
                <Ticket className="w-4 h-4" />
                My Tickets
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 text-gray-600 hover:text-[#2F34A2] hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
              >
                <Info className="w-4 h-4" />
                About Us
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-600 hover:text-[#2F34A2] hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600 border-r border-gray-300 pr-4">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="flex items-center gap-1.5 hover:text-[#2F34A2] px-2 py-1 rounded transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                  ) : (
                    <Globe className="w-4 h-4" />
                  )}
                  <span>{currency}</span>
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isCurrencyOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {supportedCurrencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          currency === c
                            ? "text-[#2F34A2] font-semibold bg-blue-50"
                            : "text-gray-700"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="flex items-center gap-1 hover:text-[#2F34A2]">
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </button>
            </div>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium hidden sm:block">
                  {user?.name}
                </span>
                <Button
                  variant="outline"
                  className="w-auto py-2 px-4 text-xs"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button
                    variant="primary"
                    className="w-auto py-2 px-4 shadow-sm"
                  >
                    Sign In
                  </Button>
                </Link>
                <button className="md:hidden p-2">
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Compass,
  Globe,
  Menu,
  HelpCircle,
  Ticket,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useCurrencyStore } from "../store/useCurrencyStore";
import { Button } from "./Button";
import logo from "../assets/logo.png";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { currency, setCurrency, fetchRates, isLoading } = useCurrencyStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

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
              <img src={logo} alt="NomadGo" className="h-8 w-auto md:h-10" />{" "}
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
                <Ticket className="w-4 h-4" />
                About Us
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-600 hover:text-[#2F34A2] hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
              >
                <Ticket className="w-4 h-4" />
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600 border-r border-gray-300 pr-4">
              <div className="flex items-center gap-1 relative group">
                {isLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                ) : (
                  <Globe className="w-4 h-4 text-gray-500" />
                )}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="bg-transparent text-sm font-medium text-gray-700 hover:text-[#2F34A2] focus:outline-none cursor-pointer appearance-none pr-4"
                >
                  {supportedCurrencies.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <Link
                to="/help"
                className="flex items-center gap-1 hover:text-[#2F34A2]"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help</span>
              </Link>
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

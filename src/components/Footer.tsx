import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Instagram, Twitter, Linkedin, Facebook } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Link to="/">
              <img src={logo} alt="NomadGo" className="h-12 w-auto" />
            </Link>

            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#409F68] transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#409F68] transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#409F68] transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#409F68] transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-[#111827] mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#111827] mb-4">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  People
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Company info
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-[#111827] mb-4">Features</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  NomadGo Guarantee
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Disruption protection
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Site map
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="hover:text-[#409F68] underline-offset-4 hover:underline"
                >
                  Frequently asked questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} NomadGo Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

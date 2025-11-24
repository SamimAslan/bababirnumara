import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Globe, Menu, HelpCircle, Ticket } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-0.5 group select-none">
              <span className="text-3xl font-bold text-[#1e2265] tracking-tighter">N</span>
              <div className="relative flex items-center justify-center w-8 h-8">
                 <Compass className="w-8 h-8 text-[#409F68] animate-[spin_10s_linear_infinite]" strokeWidth={2} />
              </div>
              <span className="text-3xl font-bold text-[#1e2265] tracking-tighter">madG</span>
              <Globe className="w-8 h-8 text-[#409F68] ml-0.5" strokeWidth={2} />
            </Link>

            <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-600">
              <Link to="/tickets" className="flex items-center gap-2 text-[#2F34A2] hover:bg-gray-50 px-3 py-2 rounded-md transition-colors">
                <Ticket className="w-4 h-4" />
                My Tickets
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-600 border-r border-gray-300 pr-4">
               <button className="flex items-center gap-1 hover:text-[#2F34A2]">
                 <Globe className="w-4 h-4" />
                 <span>CHF</span>
               </button>
               <button className="flex items-center gap-1 hover:text-[#2F34A2]">
                 <HelpCircle className="w-4 h-4" />
                 <span>Help</span>
               </button>
            </div>

            {isAuthenticated ? (
               <div className="flex items-center gap-3">
                 <span className="text-sm font-medium hidden sm:block">{user?.name}</span>
                 <Button 
                    variant="outline" 
                    className="w-auto py-2 px-4 text-xs"
                    onClick={() => { logout(); navigate('/'); }}
                  >
                   Logout
                 </Button>
               </div>
            ) : (
              <div className="flex items-center gap-2">
                 <Link to="/login">
                   <Button variant="secondary" className="w-auto py-2 px-4 shadow-sm">
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
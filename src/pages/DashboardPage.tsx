import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#111827]">Welcome, {user?.name || 'Nomad'}</h1>
            <Button onClick={handleLogout} variant="secondary" className="w-auto">
              Logout
            </Button>
          </div>
          <p className="text-gray-600 mb-4">
            This is the protected dashboard area. You are currently logged in as <span className="font-semibold">{user?.email}</span>.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-md p-4">
             <p className="text-[#2F34A2]">More travel features coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

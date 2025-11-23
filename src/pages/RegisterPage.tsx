import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Plane } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const register = useAuthStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all fields.');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setIsLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }

      register(email, name);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F6]">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-[#111827]">
              Create Account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join us and start your journey today.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="name"
                type="text"
                label="Full Name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="nomad@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                id="confirm-password"
                type="password"
                label="Confirm Password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={error && password !== confirmPassword ? 'Passwords do not match' : ''}
              />
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-[#A22F2F] p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-[#A22F2F]">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button type="submit" isLoading={isLoading}>
                Sign Up
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-[#2F34A2] hover:text-[#262a85]">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-[#2F34A2] flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
               <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
             </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <div className="bg-white/10 p-6 rounded-full mb-6 backdrop-blur-sm">
                <Plane size={64} className="text-white" />
            </div>
            <h1 className="text-5xl font-bold tracking-tight mb-2">NomadGo</h1>
            <p className="text-blue-100 text-lg">Your next adventure awaits.</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
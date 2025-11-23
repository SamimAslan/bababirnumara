import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Plane } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Mock authentication delay
    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields.');
        setIsLoading(false);
        return;
      }
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setIsLoading(false);
        return;
      }

      login(email);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F6]">
      {/* Left Section: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-[#111827]">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to continue your journey.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                id="email"
                type="email"
                label="Email Address"
                placeholder="nomad@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error && !email ? 'Email is required' : ''}
              />
              
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#2F34A2] focus:ring-[#2F34A2] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[#2F34A2] hover:text-[#262a85]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button type="submit" isLoading={isLoading}>
                Sign In
              </Button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-[#2F34A2] hover:text-[#262a85]">
              Create an account
            </a>
          </div>
        </div>
      </div>

      {/* Right Section: Branding */}
      <div className="hidden md:flex md:w-1/2 bg-[#2F34A2] flex-col justify-center items-center text-white relative overflow-hidden">
        {/* Abstract shapes for visual interest */}
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
            <p className="text-blue-100 text-lg">Explore the world, one click at a time.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

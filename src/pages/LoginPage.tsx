import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { loginUser } from '../services/api';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Compass, Globe, Check } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await loginUser({ email, password });
      setAuth(response.user, response.token);
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#F3F4F6]">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 bg-white md:bg-transparent">
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
            <Link to="/register" className="font-medium text-[#2F34A2] hover:text-[#262a85]">
              Create an account
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-[#2F34A2] flex-col justify-center items-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#2F34A2] to-[#1a1d63] z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center justify-center mb-12 select-none">
                <span className="text-6xl font-bold tracking-tight">N</span>
                <Compass className="w-14 h-14 text-[#409F68] mx-1 animate-[spin_10s_linear_infinite]" strokeWidth={2.5} />
                <span className="text-6xl font-bold tracking-tight">madG</span>
                <Globe className="w-14 h-14 text-[#409F68] ml-1" strokeWidth={2.5} />
            </div>

            <p className="text-blue-100 text-xl font-medium mb-16 text-center px-8">
              Experience the world with best prices <br/>and seamless booking.
            </p>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl flex items-center gap-4 max-w-sm transform -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-default">
              <div className="bg-[#409F68] rounded-full p-2 shadow-lg">
                <Check className="w-6 h-6 text-white" strokeWidth={3} />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">Flight Booked!</h3>
                <p className="text-blue-100 text-sm">Milano, Italy • 2 Travelers</p>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

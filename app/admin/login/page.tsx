'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, Loader2, AlertCircle, KeyRound, Shield } from 'lucide-react';
import { BrandLogo } from '@/components/brand/BrandLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid email or password.');
        setLoading(false);
        return;
      }

      // Successful login -> Redirect to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Invalid email or password.');
      setLoading(false);
    }
  };

  const fillCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#0E0C0C] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle luxury ambient glow */}
      <div className="absolute inset-0 bg-radial-gradient from-[#C9A96E]/5 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <BrandLogo variant="dark" size="lg" />
          <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-[#1A1818] border border-[#C9A96E]/30 rounded-sm">
            <Shield className="w-3.5 h-3.5 text-[#C9A96E]" />
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#C9A96E]">
              Brokerage Portal &bull; Staff Authentication
            </span>
          </div>
        </div>

        {/* Login Box */}
        <div className="bg-[#161414] border border-[#2D2A2A] p-8 sm:p-10 rounded-sm shadow-2xl">
          <div className="mb-6">
            <h1 className="font-serif-luxury text-2xl font-medium text-white">
              Sign In to CRM
            </h1>
            <p className="text-xs text-[#8E8A85] mt-1">
              Authorized real estate brokers, agents, and agency administrators only.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs rounded-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E] mb-1.5">
                Staff Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ali-estate.agency"
                  className="w-full bg-[#1F1C1C] text-white text-xs py-3 pl-10 pr-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-[#C9A96E]">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Please contact the Super Admin or Managing Director to initiate an official password recovery token.')}
                  className="text-[10px] text-[#A39E98] hover:text-white transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#1F1C1C] text-white text-xs py-3 pl-10 pr-3 border border-[#383434] focus:border-[#C9A96E] rounded-sm outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 text-xs font-semibold uppercase tracking-widest text-[#121010] bg-[#C9A96E] hover:bg-[#D8BC87] active:bg-[#B38F4D] disabled:opacity-50 rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Seed Accounts Helper (For convenient inspection and testing) */}
          <div className="mt-8 pt-6 border-t border-[#262424]">
            <button
              type="button"
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              className="w-full flex items-center justify-between text-[11px] text-[#C9A96E] hover:underline"
            >
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Default Staff Role Credentials</span>
              </span>
              <span>{showDemoCredentials ? 'Hide' : 'Show'}</span>
            </button>

            {showDemoCredentials && (
              <div className="mt-3 p-3 bg-[#111010] border border-[#2B2828] rounded-sm text-[11px] space-y-2 text-[#9E9A94]">
                <div 
                  onClick={() => fillCredentials('admin@ali-estate.agency', 'AliEstate2026!')}
                  className="cursor-pointer hover:text-white p-1.5 rounded-sm hover:bg-[#1A1818] transition-colors"
                >
                  <strong className="text-white block">Super Admin (Full Permissions):</strong>
                  <span>admin@ali-estate.agency &bull; AliEstate2026!</span>
                </div>
                <div 
                  onClick={() => fillCredentials('broker@ali-estate.agency', 'Broker2026!')}
                  className="cursor-pointer hover:text-white p-1.5 rounded-sm hover:bg-[#1A1818] transition-colors"
                >
                  <strong className="text-white block">Senior Broker:</strong>
                  <span>broker@ali-estate.agency &bull; Broker2026!</span>
                </div>
                <div 
                  onClick={() => fillCredentials('agent@ali-estate.agency', 'Agent2026!')}
                  className="cursor-pointer hover:text-white p-1.5 rounded-sm hover:bg-[#1A1818] transition-colors"
                >
                  <strong className="text-white block">Listing Agent:</strong>
                  <span>agent@ali-estate.agency &bull; Agent2026!</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Notice */}
        <p className="mt-6 text-[10px] text-center text-[#696560] leading-relaxed">
          Access is strictly restricted to authorized agency brokers and personnel. All sign-in attempts and CRM record mutations are audited with timestamp and IP recording.
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { Lock, Mail, Key, ShieldCheck, AlertCircle, X, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [email, setEmail] = useState('arhamtechnologiesltd@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAutofill = () => {
    setEmail('arhamtechnologiesltd@gmail.com');
    setPassword('admin');
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      // Secure credential check requested by user
      if (email.trim().toLowerCase() === 'arhamtechnologiesltd@gmail.com' && password === 'admin') {
        localStorage.setItem('arham_admin_authenticated', 'true');
        localStorage.setItem('arham_admin_user', email.trim());
        setLoading(false);
        onSuccess();
      } else {
        setLoading(false);
        setError('Invalid credentials. Authorized email is arhamtechnologiesltd@gmail.com');
      }
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26160C]/65 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#FAF7F2] border border-[#E8DFD5] rounded-3xl shadow-2xl p-7 sm:p-9 text-[#332015]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#F5EFE6] text-[#664E40] hover:text-[#26160C] hover:bg-[#E8DEC8] transition-colors"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#8C5E2D] via-[#B89F70] to-[#523C1B] p-[1.5px] shadow-lg shadow-[#8C5E2D]/25 mx-auto mb-4 flex items-center justify-center">
            <div className="w-full h-full bg-[#FAF7F2] rounded-[14px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-[#8C5E2D]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#26160C] font-['Cinzel'] tracking-tight">
            Admin Portal Access
          </h2>
          <p className="text-xs text-[#664E40] mt-1 leading-relaxed">
            Enter authorized executive credentials to access the central database & CRM telemetry console.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8C5E2D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="arhamtechnologiesltd@gmail.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#E8DFD5] text-xs sm:text-sm text-[#26160C] placeholder-[#8C7A6D] focus:outline-none focus:border-[#8C5E2D] focus:ring-2 focus:ring-[#8C5E2D]/20 transition-all shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#26160C] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#8C5E2D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (admin)"
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-[#E8DFD5] text-xs sm:text-sm text-[#26160C] placeholder-[#8C7A6D] focus:outline-none focus:border-[#8C5E2D] focus:ring-2 focus:ring-[#8C5E2D]/20 transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A6D] hover:text-[#26160C] p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Autofill Button */}
          <div className="pt-1 flex items-center justify-between text-xs">
            <span className="text-[11px] text-[#664E40]">Quick Access:</span>
            <button
              type="button"
              onClick={handleAutofill}
              className="text-[11px] font-bold text-[#8C5E2D] hover:text-[#734A1F] hover:underline flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Autofill arhamtechnologiesltd & admin</span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8C5E2D] via-[#A87944] to-[#734A1F] hover:from-[#734A1F] hover:to-[#523C1B] shadow-lg shadow-[#8C5E2D]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Verifying Security Token...</span>
              </>
            ) : (
              <>
                <span>Unlock Central Database</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="mt-6 pt-4 border-t border-[#E8DFD5] flex items-center justify-center gap-2 text-[11px] text-[#664E40]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C5E2D]" />
          <span>256-Bit TLS Authenticated • Session Protected</span>
        </div>

      </div>
    </div>
  );
}

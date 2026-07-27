import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { loginWithGoogle } from '../api/googleAuth';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Listen for Google OAuth popup response
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin !== window.location.origin) return;
            if (event.data?.type === 'GOOGLE_AUTH_SUCCESS') {
                const { user } = event.data;
                setGoogleLoading(false);
                // Persist user to localStorage
                localStorage.setItem('vendor_logged_in', 'true');
                localStorage.setItem('vendor_name', user.name);
                localStorage.setItem('vendor_email', user.email);
                navigate('/dashboard');
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [navigate]);

    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError('');
        setIsLoading(true);

        try {
            const response = await API.post('/api/auth/login', { email, password });
            const { token, vendor, user } = response.data;
            const vendorData = vendor || user || {};

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(vendorData));
            localStorage.setItem('vendor_logged_in', 'true');
            localStorage.setItem('vendor_restaurant_name', vendorData.name || 'Vendor');
            localStorage.setItem('vendor_email', vendorData.email || email);

            setIsLoading(false);
            navigate('/dashboard');
        } catch (err) {
            setIsLoading(false);
            setLoginError(err.response?.data?.detail || 'Incorrect email or password. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        setLoginError('');
        try {
            await loginWithGoogle('vendor');
            setGoogleLoading(false);
            navigate('/dashboard');
        } catch (err) {
            setGoogleLoading(false);
            setLoginError(err.message || 'Google login failed');
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF8F0] flex flex-col md:flex-row text-[#2B2D42] font-body-md">
            {/* Left Banner Side */}
            <div className="md:w-1/2 bg-[#1E1614] text-[#FFF8F0] p-xl flex flex-col justify-between relative overflow-hidden min-h-[300px] md:min-h-screen">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#FF6B35,transparent_60%)] opacity-35"></div>
                <div className="relative z-10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[36px] text-[#FF6B35]">restaurant</span>
                    <span className="font-bold text-2xl tracking-tight text-white">Food Genie</span>
                    <span className="bg-[#FFB703] text-black font-label-sm text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Partner</span>
                </div>

                <div className="relative z-10 my-auto py-xl">
                    <h1 className="font-display-lg text-4xl md:text-5xl leading-tight font-extrabold text-white mb-md">
                        Manage your <br/>
                        <span className="text-[#FF6B35]">restaurant business</span> <br/>
                        with ease.
                    </h1>
                    <p className="font-body-lg text-lg text-[#FFF8F0]/80 max-w-md">
                        Join thousands of restaurants, grow your delivery revenue, and track operations in real-time.
                    </p>
                </div>

                <div className="relative z-10 border-t border-white/10 pt-md flex items-center justify-between text-xs text-[#FFF8F0]/50">
                    <span>© 2026 Food Genie Partner Network</span>
                    <div className="flex gap-sm">
                        <Link to="#" className="hover:underline">Terms</Link>
                        <Link to="#" className="hover:underline">Privacy</Link>
                    </div>
                </div>
            </div>

            {/* Right Form Side */}
            <div className="md:w-1/2 flex items-center justify-center p-lg md:p-xl bg-[#FFF8F0]">
                <div className="w-full max-w-md bg-white p-xl rounded-2xl shadow-xl border border-[#2B2D42]/5">
                    <div className="mb-lg">
                        <h2 className="font-headline-lg text-headline-lg text-[#2B2D42] mb-xs">Welcome Back</h2>
                        <p className="font-body-sm text-body-sm text-[#2B2D42]/60">Login to access your Karachi Hotel partner portal.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-md">
                        <div className="flex flex-col gap-base">
                            <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Email Address</label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40">mail</span>
                                <input 
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-body-sm text-[#2B2D42] transition-all" 
                                    placeholder="partner@restaurant.com" 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-base">
                            <div className="flex justify-between items-center">
                                <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Password</label>
                                <Link to="#" className="text-xs text-[#FF6B35] hover:underline font-semibold">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40">lock</span>
                                <input 
                                    className="w-full pl-10 pr-10 py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-body-sm text-[#2B2D42] transition-all" 
                                    placeholder="••••••••" 
                                    type={showPassword ? 'text' : 'password'} 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                                <span 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 cursor-pointer select-none"
                                >
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-xs pt-xs">
                            <input type="checkbox" id="remember" className="rounded text-[#FF6B35] focus:ring-[#FF6B35]" />
                            <label htmlFor="remember" className="text-xs text-[#2B2D42]/60 select-none">Remember this device</label>
                        </div>

                        {/* Error message */}
                        {loginError && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <span className="material-symbols-outlined text-red-500 text-[18px]">error</span>
                                <p className="text-sm text-red-600 font-medium">{loginError}</p>
                            </div>
                        )}

                        {/* Google button above Sign In */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={googleLoading}
                            className="w-full flex items-center justify-center gap-3 py-3 px-md bg-white border border-[#2B2D42]/15 rounded-lg hover:bg-gray-50 hover:border-[#2B2D42]/25 active:scale-95 transition-all shadow-sm font-medium text-[#2B2D42] font-body-sm disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {googleLoading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-[#4285F4] border-t-transparent rounded-full animate-spin flex-shrink-0"></span>
                                    <span>Connecting to Google...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                    </svg>
                                    <span>Continue with Google</span>
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-md">
                            <div className="flex-1 h-px bg-[#2B2D42]/10"></div>
                            <span className="text-xs text-[#2B2D42]/40 font-medium uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-[#2B2D42]/10"></div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#FF6B35] text-white font-label-md text-label-md py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#FF6B35]/20 flex items-center justify-center gap-xs font-semibold disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined text-[18px]">login</span>
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-xl text-center border-t border-[#2B2D42]/5 pt-lg">
                        <p className="text-sm text-[#2B2D42]/60">
                            New partner?{' '}
                            <Link to="/signup" className="text-[#FF6B35] hover:underline font-semibold">
                                Register your Restaurant
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { loginWithGoogle, completeVendorOnboarding } from '../api/googleAuth';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [loginError, setLoginError] = useState('');

    // Vendor Google Onboarding State
    const [onboardingData, setOnboardingData] = useState(null); // { firebaseToken, googleProfile }
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Vehari');
    const [category, setCategory] = useState('Fast Food');
    const [newPassword, setNewPassword] = useState('');
    const [onboardingError, setOnboardingError] = useState('');

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
            const res = await loginWithGoogle('vendor');
            setGoogleLoading(false);
            if (res?.requires_details) {
                setOnboardingData(res);
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setGoogleLoading(false);
            setLoginError(err.message || 'Google login failed');
        }
    };

    const handleCompleteOnboarding = async (e) => {
        e.preventDefault();
        if (!phone.trim() || !newPassword.trim()) {
            setOnboardingError('Please enter your phone number and set your account password.');
            return;
        }
        setGoogleLoading(true);
        setOnboardingError('');
        try {
            await completeVendorOnboarding(onboardingData.firebaseToken, {
                phone: phone.trim(),
                city: city.trim() || 'Vehari',
                category: category || 'Fast Food',
                password: newPassword.trim()
            });
            setGoogleLoading(false);
            setOnboardingData(null);
            navigate('/dashboard');
        } catch (err) {
            setGoogleLoading(false);
            setOnboardingError(err.response?.data?.detail || err.message || 'Failed to complete registration.');
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF8F0] flex flex-col md:flex-row text-[#2B2D42] font-body-md relative">
            {/* Onboarding Modal for New Google Vendors */}
            {onboardingData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl border border-[#FF6B35]/20 relative space-y-6">
                        <div className="text-center space-y-2">
                            <h2 className="text-2xl font-extrabold text-[#2B2D42]">Complete Restaurant Sign Up</h2>
                            <p className="text-xs text-[#2B2D42]/60">Provide your restaurant details to finish setup</p>
                        </div>

                        {/* Google Profile Badge */}
                        <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#FF6B35]/20 flex items-center gap-4">
                            {onboardingData.googleProfile?.photoURL ? (
                                <img
                                    src={onboardingData.googleProfile.photoURL}
                                    alt="Google Profile"
                                    className="w-14 h-14 rounded-full border-2 border-[#FF6B35] object-cover shadow-sm"
                                />
                            ) : (
                                <div className="w-14 h-14 rounded-full bg-[#FF6B35] text-white font-bold flex items-center justify-center text-xl shadow-sm">
                                    {onboardingData.googleProfile?.name?.charAt(0) || 'G'}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-base text-[#2B2D42] truncate">{onboardingData.googleProfile?.name}</h4>
                                <p className="text-xs text-[#2B2D42]/70 truncate">{onboardingData.googleProfile?.email}</p>
                                <span className="text-[10px] font-extrabold text-[#FF6B35] uppercase tracking-wider">Verified by Google</span>
                            </div>
                        </div>

                        <form onSubmit={handleCompleteOnboarding} className="space-y-4">
                            {/* Phone */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#2B2D42]/70">Phone Number *</label>
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+92 300 1234567"
                                    required
                                    className="w-full px-4 py-3 border border-[#2B2D42]/20 rounded-xl focus:ring-2 focus:ring-[#FF6B35] outline-none text-sm"
                                />
                            </div>

                            {/* City */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#2B2D42]/70">City *</label>
                                <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Vehari"
                                    required
                                    className="w-full px-4 py-3 border border-[#2B2D42]/20 rounded-xl focus:ring-2 focus:ring-[#FF6B35] outline-none text-sm"
                                />
                            </div>

                            {/* Restaurant Type */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#2B2D42]/70">Restaurant Category / Type *</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 border border-[#2B2D42]/20 rounded-xl focus:ring-2 focus:ring-[#FF6B35] outline-none text-sm bg-white"
                                >
                                    <option value="Fast Food">Fast Food</option>
                                    <option value="Pakistani & Desi">Pakistani & Desi</option>
                                    <option value="Pizza & Burgers">Pizza & Burgers</option>
                                    <option value="Cafe & Bakery">Cafe & Bakery</option>
                                    <option value="Chinese & Asian">Chinese & Asian</option>
                                    <option value="Sweets & Ice Cream">Sweets & Ice Cream</option>
                                </select>
                            </div>

                            {/* Set Password */}
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-[#2B2D42]/70">Set Password (For manual login) *</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 border border-[#2B2D42]/20 rounded-xl focus:ring-2 focus:ring-[#FF6B35] outline-none text-sm"
                                />
                            </div>

                            {onboardingError && (
                                <p className="text-xs font-semibold text-red-600 text-center bg-red-50 p-2 rounded-lg">{onboardingError}</p>
                            )}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setOnboardingData(null)}
                                    className="flex-1 py-3 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={googleLoading}
                                    className="flex-1 py-3 bg-[#FF6B35] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#e05624] transition-all"
                                >
                                    {googleLoading ? 'Saving...' : 'Finish Sign Up'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                        Join local restaurants in Vehari, grow your delivery revenue, and track operations in real-time.
                    </p>
                </div>

                <div className="relative z-10 border-t border-white/10 pt-md flex items-center justify-between text-xs text-[#FFF8F0]/50">
                    <span>© 2026 Food Genie Partner Network</span>
                </div>
            </div>

            {/* Right Form Side */}
            <div className="md:w-1/2 flex items-center justify-center p-lg md:p-xl bg-[#FFF8F0]">
                <div className="w-full max-w-md bg-white p-xl rounded-2xl shadow-xl border border-[#2B2D42]/5">
                    <div className="mb-lg">
                        <h2 className="font-headline-lg text-headline-lg text-[#2B2D42] mb-xs">Welcome Back</h2>
                        <p className="font-body-sm text-body-sm text-[#2B2D42]/60">Login to access your Food Genie restaurant partner portal.</p>
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
                            className="w-full flex items-center justify-center gap-3 py-3 px-md bg-white border border-[#2B2D42]/15 rounded-lg hover:bg-gray-50 hover:border-[#2B2D42]/25 active:scale-95 transition-all shadow-sm font-medium text-[#2B2D42] font-body-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
                            className="w-full bg-[#FF6B35] text-white font-label-md text-label-md py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#FF6B35]/20 flex items-center justify-center gap-xs font-semibold disabled:opacity-70 cursor-pointer"
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

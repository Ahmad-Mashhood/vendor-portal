import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import { loginWithGoogle } from '../api/googleAuth';

export default function SignUpPage() {
    const navigate = useNavigate();
    
    // Sign-Up fields
    const [restaurantName, setRestaurantName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [cuisine, setCuisine] = useState('American');
    const [city, setCity] = useState('New York');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const [signupError, setSignupError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        setSignupError('');

        if (!agreed) {
            setSignupError('Please agree to the Partner Terms & Conditions to continue.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await API.post('/api/vendors/register', {
                name: restaurantName,
                email: email.toLowerCase(),
                password,
                city: city || 'Vehari',
                phone,
                category: 'restaurant'
            });

            const { token, vendor } = response.data;
            if (token) localStorage.setItem('token', token);
            if (vendor) localStorage.setItem('user', JSON.stringify(vendor));

            setIsLoading(false);
            setSuccessMessage('Registration submitted! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            setIsLoading(false);
            setSignupError(err.response?.data?.detail || 'Registration failed. Please try again.');
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setSignupError('');
        try {
            await loginWithGoogle('vendor');
            setIsLoading(false);
            navigate('/dashboard');
        } catch (err) {
            setIsLoading(false);
            setSignupError(err.message || 'Google login failed');
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
                        Grow with <br/>
                        <span className="text-[#FF6B35]">Food Genie</span>.
                    </h1>
                    <p className="font-body-lg text-lg text-[#FFF8F0]/80 max-w-md">
                        Get access to millions of customers ordering food daily. Take control of your menu, prices, and stats.
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
                    {successMessage ? (
                        <div className="text-center py-xl space-y-md">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                <span className="material-symbols-outlined text-4xl">check_circle</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md text-[#2B2D42]">Application Submitted!</h3>
                            <p className="font-body-sm text-body-sm text-[#2B2D42]/70 max-w-xs mx-auto">{successMessage}</p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-lg">
                                <h2 className="font-headline-lg text-headline-lg text-[#2B2D42] mb-xs">Register Partner</h2>
                                <p className="font-body-sm text-body-sm text-[#2B2D42]/60">Submit your application to become a Food Genie restaurant partner.</p>
                            </div>

                            <form onSubmit={handleSignUp} className="space-y-md">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                                    <div className="flex flex-col gap-base">
                                        <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Restaurant Name</label>
                                        <input 
                                            className="w-full px-md py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-body-sm text-[#2B2D42]" 
                                            placeholder="Karachi Hotel" 
                                            type="text" 
                                            value={restaurantName}
                                            onChange={(e) => setRestaurantName(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-base">
                                        <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Owner Full Name</label>
                                        <input 
                                            className="w-full px-md py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-body-sm text-[#2B2D42]" 
                                            placeholder="John Doe" 
                                            type="text" 
                                            value={ownerName}
                                            onChange={(e) => setOwnerName(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                                    <div className="flex flex-col gap-base">
                                        <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Contact Email</label>
                                        <input 
                                            className="w-full px-md py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-body-sm text-[#2B2D42]" 
                                            placeholder="owner@karachihotel.com" 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required 
                                        />
                                    </div>
                                    <div className="flex flex-col gap-base">
                                        <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Phone Number</label>
                                        <input 
                                            className="w-full px-md py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-body-sm text-[#2B2D42]" 
                                            placeholder="+92 300 1234567" 
                                            type="tel" 
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                                    <div className="flex flex-col gap-base">
                                        <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Cuisine Type</label>
                                        <select 
                                            className="w-full px-md py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] outline-none font-body-sm text-body-sm text-[#2B2D42]"
                                            value={cuisine}
                                            onChange={(e) => setCuisine(e.target.value)}
                                        >
                                            <option value="Pakistani">Pakistani</option>
                                            <option value="Fast Food">Fast Food</option>
                                            <option value="American">American</option>
                                            <option value="Italian">Italian</option>
                                            <option value="Chinese">Chinese</option>
                                            <option value="Desserts">Desserts</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-base">
                                        <label className="font-label-sm text-label-sm text-[#2B2D42]/70">City</label>
                                        <select 
                                            className="w-full px-md py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] outline-none font-body-sm text-body-sm text-[#2B2D42]"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        >
                                            <option value="Karachi">Karachi</option>
                                            <option value="Lahore">Lahore</option>
                                            <option value="Islamabad">Islamabad</option>
                                            <option value="New York">New York</option>
                                            <option value="London">London</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-base">
                                    <label className="font-label-sm text-label-sm text-[#2B2D42]/70">Password</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full px-md py-3 bg-white border border-[#2B2D42]/15 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none font-body-sm text-body-sm text-[#2B2D42]" 
                                            placeholder="Min. 8 characters" 
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

                                <div className="flex items-start gap-xs pt-xs">
                                    <input 
                                        type="checkbox" 
                                        id="agree" 
                                        className="rounded text-[#FF6B35] focus:ring-[#FF6B35] mt-1" 
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                    />
                                    <label htmlFor="agree" className="text-xs text-[#2B2D42]/60 select-none">
                                        I agree to the Food Genie Partner Agreement and Terms of Service.
                                    </label>
                                </div>

                                {/* Inline error */}
                                {signupError && (
                                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <span className="material-symbols-outlined text-red-500 text-[18px] mt-0.5 flex-shrink-0">error</span>
                                        <p className="text-sm text-red-600 font-medium">{signupError}</p>
                                    </div>
                                )}

                                <button 
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#FF6B35] text-white font-label-md text-label-md py-3 rounded-lg hover:opacity-90 active:scale-95 transition-all shadow-md shadow-[#FF6B35]/20 flex items-center justify-center gap-xs font-semibold disabled:opacity-70"
                                >
                                    {isLoading ? (
                                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                                            Submit Application
                                        </>
                                    )}
                                </button>

                                {/* Divider */}
                                <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', gap: '10px' }}>
                                    <hr style={{ flex: 1, borderColor: '#eee' }} />
                                    <span style={{ color: '#888', fontSize: '12px' }}>OR</span>
                                    <hr style={{ flex: 1, borderColor: '#eee' }} />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                    style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: '#ffffff',
                                        border: '1px solid #ddd',
                                        borderRadius: '8px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        cursor: 'pointer',
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        color: '#333',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <img
                                        src="https://developers.google.com/identity/images/g-logo.png"
                                        width="22"
                                        height="22"
                                        alt="Google"
                                    />
                                    {isLoading ? 'Connecting...' : 'Continue with Google'}
                                </button>
                            </form>

                            <div className="mt-xl text-center border-t border-[#2B2D42]/5 pt-lg">
                                <p className="text-sm text-[#2B2D42]/60">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-[#FF6B35] hover:underline font-semibold">
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

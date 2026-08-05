import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { resetPassword } from '../api';

export default function ResetPasswordPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing password reset token. Please request a new password reset link.');
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setError('Invalid reset token. Please request a new link.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match. Please check and try again.');
            return;
        }

        setLoading(true);
        setMessage('');
        setError('');

        try {
            const res = await resetPassword(token, newPassword);
            setMessage(res.message || 'Password reset successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.detail || err.message || 'Reset link has expired or is invalid. Please request a new link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF8F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-2xl font-bold text-[#E66000]">
                    <span className="material-symbols-outlined text-3xl">storefront</span>
                    FoodGenie Vendor Portal
                </Link>
                <h2 className="mt-4 text-3xl font-extrabold text-[#2B2D42] tracking-tight">
                    Reset Vendor Password
                </h2>
                <p className="mt-2 text-sm text-[#2B2D42]/70">
                    Set a new password for your vendor portal account.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
                <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-10 border border-[#E66000]/10">
                    {message && (
                        <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm font-medium text-center">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium text-center">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-semibold text-[#2B2D42] mb-2">
                                New Password
                            </label>
                            <input
                                id="newPassword"
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#2B2D42]/15 rounded-xl text-[#2B2D42] text-sm focus:outline-none focus:ring-2 focus:ring-[#E66000] transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#2B2D42] mb-2">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                className="w-full px-4 py-3 bg-[#FFF8F0] border border-[#2B2D42]/15 rounded-xl text-[#2B2D42] text-sm focus:outline-none focus:ring-2 focus:ring-[#E66000] transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !token}
                            className="w-full py-3.5 bg-[#E66000] text-white rounded-xl text-base font-semibold shadow-md hover:bg-[#cc5200] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Resetting Password...
                                </>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm font-semibold text-[#E66000] hover:underline inline-flex items-center gap-1"
                        >
                            ← Back to Vendor Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

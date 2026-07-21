import { useState, useEffect } from 'react';

export default function MockGoogleAuth() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.title = 'Sign in - Google Accounts';
    }, []);

    const handleSelectAccount = () => {
        setLoading(true);
        setTimeout(() => {
            if (window.opener) {
                window.opener.postMessage(
                    {
                        type: 'GOOGLE_AUTH_SUCCESS',
                        user: {
                            name: 'Ahmad Mshhood',
                            email: 'ahmadmashhood.bcs018@gmail.com',
                            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChSXhKwGaTOX0bRp--6-aPHeWEr3LXja9nYI0-5Am9VRKKRGhwc72ygG-Z7V2thloiYy-0c8rt-lmQtvzx-DOvLsMQs9hGKD7JJE3xeESHVeCfUtYVer0NRkCgg13LdDeqCoWZ9l8TkMebAdzA1B69p7loy9DFwvFEGjT9aY8FszC5nYJVFqsApXg-NbdBA9-91x6uz7b4KCL8mxkmVQOWxqSoAvmZNk8KuYnYhMHLDn8v6gSeyZ4sim9ZbDZOjcegkZyGwn7aWUk',
                        },
                    },
                    window.location.origin
                );
            }
            window.close();
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[450px] bg-white border border-slate-200 rounded-2xl shadow-lg p-8 relative overflow-hidden">

                {/* Loading overlay */}
                {loading && (
                    <div className="absolute inset-0 bg-white/90 z-50 flex flex-col items-center justify-center gap-3 rounded-2xl">
                        <span className="w-9 h-9 border-4 border-[#4285F4] border-t-transparent rounded-full animate-spin"></span>
                        <p className="text-sm font-semibold text-slate-500">Connecting to Food Genie...</p>
                    </div>
                )}

                {/* Google Logo */}
                <div className="flex justify-center mb-5">
                    <svg className="w-12 h-12" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                </div>

                {/* Heading */}
                <div className="text-center space-y-1 mb-8">
                    <h1 className="text-[22px] font-normal text-slate-900 tracking-tight">Sign in with Google</h1>
                    <p className="text-sm text-slate-600">to continue to <strong className="text-slate-800">Food Genie Partner</strong></p>
                </div>

                {/* Account Card */}
                <div className="space-y-3">
                    <button
                        onClick={handleSelectAccount}
                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 border border-slate-200 rounded-xl text-left transition-colors cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#FF6B35] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                            AM
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-800">Ahmad Mshhood</p>
                            <p className="text-xs text-slate-500 truncate">ahmadmashhood.bcs018@gmail.com</p>
                        </div>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <button
                        className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 border border-transparent rounded-xl text-left transition-colors cursor-not-allowed opacity-50"
                        disabled
                    >
                        <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-slate-700">Use another account</p>
                    </button>
                </div>

                {/* Footer privacy notice */}
                <div className="mt-10 pt-6 border-t border-slate-100 text-[11px] text-slate-400 leading-relaxed">
                    To continue, Google will share your name, email address, and profile picture with Food Genie.{' '}
                    <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a> &middot;{' '}
                    <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
                </div>
            </div>
        </div>
    );
}

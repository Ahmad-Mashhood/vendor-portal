import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <header className="docked full-width top-0 sticky z-50 bg-surface/70 dark:bg-[#261814]/80 backdrop-blur-xl shadow-sm w-full max-w-full mx-auto flex justify-between items-center px-container-padding py-xs transition-colors duration-300">
      <div className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim flex items-center gap-2">
        <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim" data-icon="restaurant">restaurant</span>
        <span className="font-extrabold tracking-tight">Food Genie</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className={`material-symbols-outlined ${isNotifOpen ? 'bg-surface-container-low dark:bg-[#3c2d28] text-primary' : 'text-on-surface-variant/70 dark:text-surface/70'} hover:bg-surface-container-low dark:hover:bg-[#3c2d28] p-2 rounded-full transition-colors relative`}
            data-icon="notifications"
          >
            notifications
            <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-surface dark:bg-[#3c2d28] border border-outline-variant/30 dark:border-outline/30 rounded-xl shadow-lg z-50 overflow-hidden animate-fade-in">
              <div className="p-3 border-b border-outline-variant/20 dark:border-outline/20 bg-surface-container-lowest dark:bg-[#261814]">
                <h3 className="font-label-lg text-on-surface dark:text-surface">Recent Notifications</h3>
              </div>
              <div className="max-h-60 overflow-y-auto">
                <div className="p-3 border-b border-outline-variant/10 dark:border-outline/10 hover:bg-surface-container-low dark:hover:bg-[#4a3a35] transition-colors cursor-pointer">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span>
                    <div>
                      <p className="font-label-sm text-on-surface dark:text-surface">New Order #FG-8821</p>
                      <p className="text-[10px] text-on-surface-variant dark:text-surface-variant">2 mins ago</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-b border-outline-variant/10 dark:border-outline/10 hover:bg-surface-container-low dark:hover:bg-[#4a3a35] transition-colors cursor-pointer">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-tertiary text-[18px]">inventory_2</span>
                    <div>
                      <p className="font-label-sm text-on-surface dark:text-surface">Low Stock: Truffle Oil</p>
                      <p className="text-[10px] text-on-surface-variant dark:text-surface-variant">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 bg-surface-container-lowest dark:bg-[#261814]">
                <Link 
                  to="/notifications" 
                  onClick={() => setIsNotifOpen(false)}
                  className="block w-full py-2 text-center text-primary dark:text-primary-fixed-dim font-label-lg rounded-lg hover:bg-primary-container/10 transition-colors"
                >
                  View All
                </Link>
              </div>
            </div>
          )}
        </div>
        <Link to="/profile" className="w-10 h-10 rounded-full border-2 border-primary/20 overflow-hidden shadow-sm block hover:border-primary/50 transition-colors">
          <img className="w-full h-full object-cover" data-alt="A professional headshot of a friendly restaurant manager" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChSXhKwGaTOX0bRp--6-aPHeWEr3LXja9nYI0-5Am9VRKKRGhwc72ygG-Z7V2thloiYy-0c8rt-lmQtvzx-DOvLsMQs9hGKD7JJE3xeESHVeCfUtYVer0NRkCgg13LdDeqCoWZ9l8TkMebAdzA1B69p7loy9DFwvFEGjT9aY8FszC5nYJVFqsApXg-NbdBA9-91x6uz7b4KCL8mxkmVQOWxqSoAvmZNk8KuYnYhMHLDn8v6gSeyZ4sim9ZbDZOjcegkZyGwn7aWUk" alt="" />
        </Link>
      </div>
    </header>
  );
};

export default Header;

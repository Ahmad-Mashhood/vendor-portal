import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Settings = () => {
  const { restaurantName, setRestaurantName } = useOutletContext();
  const [activeTab, setActiveTab] = useState('Profile');
  const [localName, setLocalName] = useState(restaurantName);
  const tabs = ['Profile', 'Notifications', 'Security'];

  const handleSave = () => {
    setRestaurantName(localName);
  };

  return (
    <div className="min-h-screen flex flex-col pb-24 text-on-surface bg-background">
      <Header />
      <main className="flex-1 px-container-padding py-lg space-y-lg w-full max-w-[1920px] mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Settings</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage your restaurant profile and preferences</p>
        </div>

        <div className="flex gap-4 border-b border-outline-variant/30 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 px-2 font-label-lg transition-all ${
                activeTab === tab 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="glass-card p-lg rounded-2xl max-w-3xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {activeTab === 'Profile' && (
            <div className="space-y-6">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1">Restaurant Name</label>
                <input 
                  type="text" 
                  value={localName} 
                  onChange={(e) => setLocalName(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors" 
                />
              </div>
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1">Email Address</label>
                <input type="email" defaultValue="contact@foodgennie.com" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1">Phone Number</label>
                <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors" />
              </div>
              <button 
                onClick={handleSave}
                className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-lg hover:brightness-110 active:scale-95 transition-all"
              >
                Save Changes
              </button>
            </div>
          )}
          {activeTab === 'Notifications' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                <div>
                  <h4 className="font-label-lg text-on-surface">New Order Alerts</h4>
                  <p className="text-body-sm text-on-surface-variant">Receive push notifications for incoming orders</p>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant/20">
                <div>
                  <h4 className="font-label-lg text-on-surface">Daily Summary Emails</h4>
                  <p className="text-body-sm text-on-surface-variant">Get an email summary of earnings every night</p>
                </div>
                <div className="w-12 h-6 bg-outline-variant/30 rounded-full relative cursor-pointer">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm"></div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'Security' && (
            <div className="space-y-4 text-center py-8">
              <span className="material-symbols-outlined text-[48px] text-outline-variant mb-2" data-icon="lock">lock</span>
              <h3 className="font-headline-sm text-on-surface">Change Password</h3>
              <p className="text-body-md text-on-surface-variant mb-4">Ensure your account is using a long, random password to stay secure.</p>
              <button className="border border-primary text-primary px-6 py-2 rounded-full font-label-lg hover:bg-primary/5 active:scale-95 transition-all">
                Update Password
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Settings;

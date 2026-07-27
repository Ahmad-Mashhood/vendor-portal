import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import API from '../../api';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Read current logged-in restaurant data dynamically
  const [profileData, setProfileData] = useState(() => {
    let savedUser = null;
    try {
      savedUser = JSON.parse(localStorage.getItem('user') || localStorage.getItem('vendor') || '{}');
    } catch (e) {}
    return {
      restaurantName: savedUser?.name || localStorage.getItem('vendor_restaurant_name') || 'Food Genie Partner Restaurant',
      ownerName: savedUser?.owner_name || savedUser?.name || localStorage.getItem('vendor_owner_name') || 'Partner Owner',
      email: savedUser?.email || localStorage.getItem('vendor_email') || 'partner@foodgenie.com',
      phone: savedUser?.phone || localStorage.getItem('vendor_phone') || '+92 300 1234567',
      city: savedUser?.city || localStorage.getItem('vendor_city') || 'Vehari',
      cuisine: savedUser?.category || localStorage.getItem('vendor_cuisine') || 'Pakistani & Fast Food',
    };
  });

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await API.get('/api/auth/me');
        if (res.data) {
          const fresh = res.data;
          setProfileData(prev => ({
            ...prev,
            restaurantName: fresh.name || prev.restaurantName,
            ownerName: fresh.owner_name || fresh.name || prev.ownerName,
            email: fresh.email || prev.email,
            phone: fresh.phone || prev.phone,
            city: fresh.city || prev.city,
            cuisine: fresh.category || prev.cuisine
          }));
        }
      } catch (err) {}
    };
    fetchMe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Persist changes back to localStorage
    localStorage.setItem('vendor_restaurant_name', profileData.restaurantName);
    localStorage.setItem('vendor_owner_name', profileData.ownerName);
    localStorage.setItem('vendor_email', profileData.email);
    localStorage.setItem('vendor_phone', profileData.phone);
    localStorage.setItem('vendor_city', profileData.city);
    localStorage.setItem('vendor_cuisine', profileData.cuisine);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen pb-32 dark:bg-[#261814] dark:text-surface transition-colors duration-300">
      <Header />
      <main className="px-container-padding py-lg space-y-lg max-w-5xl mx-auto">
        <section className="mb-lg flex justify-between items-start">
          <div className="space-y-1 animate-fade-in">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Profile Settings</h1>
            <p className="text-body-md text-on-surface-variant">Manage your restaurant's details and preferences.</p>
          </div>
        </section>
        
        <section className="glass-card p-md rounded-xl shadow-sm border border-outline-variant/30 dark:border-outline/30 dark:bg-[#3c2d28] space-y-md animate-fade-in transition-colors duration-300" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between items-start border-b border-outline-variant/20 dark:border-outline/20 pb-4">
            <div className="flex items-center gap-4">
               <div className="w-20 h-20 rounded-full border-2 border-primary/20 overflow-hidden shadow-sm relative group">
                <img className="w-full h-full object-cover" data-alt="Manager Profile" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChSXhKwGaTOX0bRp--6-aPHeWEr3LXja9nYI0-5Am9VRKKRGhwc72ygG-Z7V2thloiYy-0c8rt-lmQtvzx-DOvLsMQs9hGKD7JJE3xeESHVeCfUtYVer0NRkCgg13LdDeqCoWZ9l8TkMebAdzA1B69p7loy9DFwvFEGjT9aY8FszC5nYJVFqsApXg-NbdBA9-91x6uz7b4KCL8mxkmVQOWxqSoAvmZNk8KuYnYhMHLDn8v6gSeyZ4sim9ZbDZOjcegkZyGwn7aWUk" alt="Manager Profile" />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                )}
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface">{profileData.restaurantName}</h2>
                <p className="text-body-md text-on-surface-variant">Owner: {profileData.ownerName}</p>
                <p className="text-label-sm text-on-surface-variant/70">{profileData.city} · {profileData.cuisine}</p>
              </div>
            </div>
            <div>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 rounded-full font-label-lg bg-surface-container-low dark:bg-[#4a3a35] text-primary dark:text-primary-fixed-dim hover:bg-surface-container dark:hover:bg-[#5a4a45] transition-colors shadow-sm active:scale-95">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-full font-label-lg border border-outline-variant dark:border-outline text-on-surface-variant dark:text-surface hover:bg-surface-container-low dark:hover:bg-[#4a3a35] transition-colors active:scale-95">
                    Cancel
                  </button>
                  <button onClick={handleSave} className="px-4 py-2 rounded-full font-label-lg bg-primary text-on-primary shadow-sm hover:bg-primary-fixed-dim dark:hover:bg-primary transition-colors active:scale-95">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurantName"
                  disabled={!isEditing}
                  value={profileData.restaurantName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface-container-low border ${isEditing ? 'border-primary/50 text-on-surface' : 'border-outline-variant/30 text-on-surface/70'} rounded-xl transition-colors focus:outline-none focus:ring-1 focus:ring-primary`}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  disabled={!isEditing}
                  value={profileData.ownerName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface-container-low border ${isEditing ? 'border-primary/50 text-on-surface' : 'border-outline-variant/30 text-on-surface/70'} rounded-xl transition-colors focus:outline-none focus:ring-1 focus:ring-primary`}
                />
              </div>
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Email</label>
              <input
                type="text"
                name="email"
                disabled={!isEditing}
                value={profileData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-surface-container-low border ${isEditing ? 'border-primary/50 text-on-surface' : 'border-outline-variant/30 text-on-surface/70'} rounded-xl transition-colors focus:outline-none focus:ring-1 focus:ring-primary`}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  disabled={!isEditing}
                  value={profileData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface-container-low border ${isEditing ? 'border-primary/50 text-on-surface' : 'border-outline-variant/30 text-on-surface/70'} rounded-xl transition-colors focus:outline-none focus:ring-1 focus:ring-primary`}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  disabled={!isEditing}
                  value={profileData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-surface-container-low border ${isEditing ? 'border-primary/50 text-on-surface' : 'border-outline-variant/30 text-on-surface/70'} rounded-xl transition-colors focus:outline-none focus:ring-1 focus:ring-primary`}
                />
              </div>
            </div>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Cuisine Type</label>
              <input
                type="text"
                name="cuisine"
                disabled={!isEditing}
                value={profileData.cuisine}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-surface-container-low border ${isEditing ? 'border-primary/50 text-on-surface' : 'border-outline-variant/30 text-on-surface/70'} rounded-xl transition-colors focus:outline-none focus:ring-1 focus:ring-primary`}
              />
            </div>
          </div>
          
          <div className="pt-6 border-t border-outline-variant/20 dark:border-outline/20 mt-6">
            <button 
              onClick={async () => {
                try {
                  await signOut(auth);
                } catch (e) {}
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('vendor_logged_in');
                window.location.href = '/login';
              }}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-full font-label-lg bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Logout
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;

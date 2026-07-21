import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Promotion = () => {
  return (
    <div className="min-h-screen flex flex-col pb-24 text-on-surface bg-background">
      <Header />
      <main className="flex-1 px-container-padding py-lg space-y-lg w-full max-w-[1920px] mx-auto">
        <div className="flex items-center gap-2 animate-fade-in">
          <Link to="/" className="p-2 rounded-full hover:bg-surface-container transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Post Promotion</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Create a new discount or special offer</p>
          </div>
        </div>

        <div className="glass-card p-lg rounded-2xl max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-label-md text-on-surface-variant mb-1">Promotion Title</label>
              <input type="text" placeholder="e.g. 20% Off Weekend Special" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1">Discount Type</label>
                <select className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors">
                  <option>Percentage (%)</option>
                  <option>Fixed Amount ($)</option>
                  <option>Free Delivery</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1">Value</label>
                <input type="number" placeholder="e.g. 20" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1">Start Date</label>
                <input type="date" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors" />
              </div>
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1">End Date</label>
                <input type="date" className="w-full bg-surface-container border border-outline-variant/30 rounded-lg p-3 text-on-surface focus:border-primary focus:outline-none transition-colors" />
              </div>
            </div>

            <button type="submit" className="w-full bg-primary text-on-primary py-3 rounded-full font-label-lg hover:brightness-110 active:scale-95 transition-all mt-4">
              Launch Promotion
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Promotion;

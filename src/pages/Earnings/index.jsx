import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import API from '../../api';

const Earnings = () => {
  const [revenue, setRevenue] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id) {
          const res = await API.get(`/api/orders/vendor/${user.id}`);
          const orders = res.data || [];
          const delivered = orders.filter(o => o.status === 'delivered');
          const totalRev = delivered.reduce((sum, o) => sum + (o.total_amount || 0), 0);
          setRevenue(totalRev);
          setDeliveredCount(delivered.length);
        }
      } catch (err) {
        setRevenue(0);
        setDeliveredCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  return (
    <div className="min-h-screen pb-32">
      <Header />

      <main className="w-full max-w-[1920px] mx-auto px-container-padding pt-lg space-y-xl">
        {/* Total Net Revenue Card */}
        <section className="bg-surface rounded-2xl border border-outline-variant/15 p-lg shadow-sm">
          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Net Revenue</p>
          <div className="mt-2 flex items-baseline gap-4">
            <h1 className="text-4xl font-extrabold text-[#261814]">Rs. {revenue.toFixed(2)}</h1>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{deliveredCount} Delivered Orders</span>
          </div>
        </section>

        {/* Payout Summary */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div className="bg-surface p-lg rounded-2xl border border-outline-variant/15 shadow-sm">
            <h3 className="font-bold text-base text-[#261814]">Pending Payout</h3>
            <p className="text-2xl font-extrabold text-[#FF6B35] mt-2">Rs. {revenue.toFixed(2)}</p>
            <p className="text-xs text-on-surface-variant mt-1">Available for automatic weekly payout</p>
          </div>
          <div className="bg-surface p-lg rounded-2xl border border-outline-variant/15 shadow-sm">
            <h3 className="font-bold text-base text-[#261814]">Completed Payouts</h3>
            <p className="text-2xl font-extrabold text-emerald-600 mt-2">Rs. 0.00</p>
            <p className="text-xs text-on-surface-variant mt-1">Direct bank transfers processed</p>
          </div>
        </section>

        {/* Orders Breakout */}
        <section className="bg-surface rounded-2xl border border-outline-variant/15 p-lg shadow-sm">
          <h3 className="font-bold text-base text-[#261814] mb-md">Earnings History</h3>
          {loading ? (
            <div className="py-8 text-center text-gray-500">
              <div className="w-6 h-6 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Calculating revenue metrics...</p>
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <span className="material-symbols-outlined text-4xl text-gray-300">payments</span>
              <p className="text-sm font-bold text-on-surface">No payout history yet</p>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Completed orders will automatically generate daily & weekly earnings statements here.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Earnings;

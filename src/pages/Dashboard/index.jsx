import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Header from '../../components/Header/Header';
import API from '../../api';

const Dashboard = () => {
  const [pulse, setPulse] = useState(0);
  const { restaurantName } = useOutletContext() || { restaurantName: 'Restaurant' };
  const [orders, setOrders] = useState([]);
  const [vendorProfile, setVendorProfile] = useState(null);
  const [stats, setStats] = useState({
    todayOrdersCount: 0,
    todayRevenue: 0,
    pendingOrdersCount: 0,
    avgRating: 5.0
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p === 0 ? 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchVendorData = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const vendorId = user.id;

        const [vOrdersRes, meRes] = await Promise.all([
          vendorId ? API.get(`/api/orders/vendor/${vendorId}`).catch(() => ({ data: [] })) : Promise.resolve({ data: [] }),
          API.get('/api/auth/me').catch(() => ({ data: null }))
        ]);

        const me = meRes.data || user;
        setVendorProfile(me);

        const orderList = vOrdersRes.data || [];
        setOrders(orderList);

        const pending = orderList.filter(o => o.status === 'pending' || o.status === 'preparing').length;
        const revenue = orderList
          .filter(o => o.status === 'delivered')
          .reduce((sum, o) => sum + (o.total_amount || 0), 0);

        setStats({
          todayOrdersCount: orderList.length,
          todayRevenue: revenue,
          pendingOrdersCount: pending,
          avgRating: me?.rating || 5.0
        });
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchVendorData();
  }, []);

  const isApproved = vendorProfile ? vendorProfile.is_approved !== false : true;

  return (
    <div className="min-h-screen pb-32">
      <Header />

      <main className="w-full max-w-[1920px] mx-auto px-container-padding pt-lg space-y-xl">
        {/* Pending Approval Banner if not approved yet */}
        {!isApproved && (
          <div className="bg-[#FFB703]/15 border border-[#FFB703] p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#FFB703] text-black font-bold flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                ⏳
              </div>
              <div>
                <h3 className="font-bold text-[#261814] text-lg">Application Pending Admin Approval</h3>
                <p className="text-sm text-[#594139] mt-0.5 max-w-2xl leading-relaxed">
                  Your restaurant registration has been submitted to Food Genie Admin for review. Once approved, your restaurant will automatically appear on the Customer Portal so you can receive orders!
                </p>
              </div>
            </div>
            <span className="bg-[#FFB703] text-black font-bold text-xs px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap">
              Pending Review
            </span>
          </div>
        )}

        {/* Top Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
          {/* Active Orders Count */}
          <div className="bg-surface p-lg rounded-2xl border border-outline-variant/15 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-on-surface-variant/70 uppercase tracking-wider text-xs">Today's Orders</span>
              <div className="w-9 h-9 rounded-xl bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">{stats.todayOrdersCount}</span>
              <span className="text-xs text-on-surface-variant font-medium">0 new</span>
            </div>
          </div>

          {/* Pending Orders */}
          <div className="bg-surface p-lg rounded-2xl border border-outline-variant/15 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-on-surface-variant/70 uppercase tracking-wider text-xs">Pending Orders</span>
              <div className="w-9 h-9 rounded-xl bg-[#FFB703]/15 text-[#ab7500] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">pending</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">{stats.pendingOrdersCount}</span>
              <span className="text-xs text-amber-600 font-bold">Needs Prep</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-surface p-lg rounded-2xl border border-outline-variant/15 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-on-surface-variant/70 uppercase tracking-wider text-xs">Today's Revenue</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">Rs. {stats.todayRevenue}</span>
              <span className="text-xs text-emerald-600 font-semibold">Live</span>
            </div>
          </div>

          {/* Rating */}
          <div className="bg-surface p-lg rounded-2xl border border-outline-variant/15 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-sm">
              <span className="font-label-md text-on-surface-variant/70 uppercase tracking-wider text-xs">Store Rating</span>
              <div className="w-9 h-9 rounded-xl bg-[#c98f00]/10 text-[#c98f00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">star</span>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">{stats.avgRating}</span>
              <span className="text-xs text-[#c98f00] font-bold">★ 5.0 Scale</span>
            </div>
          </div>
        </section>

        {/* Live Orders Section */}
        <section className="bg-surface rounded-2xl border border-outline-variant/15 shadow-sm p-lg">
          <div className="flex items-center justify-between mb-lg">
            <div>
              <h2 className="font-headline-md text-[#261814] font-bold text-xl">Recent Orders</h2>
              <p className="text-xs text-on-surface-variant">Incoming order management</p>
            </div>
            <Link to="/order-management" className="text-xs font-bold text-[#FF6B35] hover:underline flex items-center gap-1">
              View All Orders <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {loading ? (
            <div className="py-12 text-center text-gray-500">
              <div className="w-6 h-6 border-2 border-[#FF6B35] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs">Loading orders...</p>
            </div>
          ) : orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map(order => (
                <div key={order.id} className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/10 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Order #{order.id}</h4>
                    <p className="text-xs text-on-surface-variant mt-0.5">Rs. {order.total_amount || 0}</p>
                  </div>
                  <span className="px-3 py-1 bg-[#FF6B35]/15 text-[#FF6B35] font-bold text-xs rounded-full uppercase">
                    {order.status || 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center space-y-2">
              <span className="material-symbols-outlined text-4xl text-gray-300">inbox</span>
              <p className="text-sm font-bold text-on-surface">No incoming orders yet</p>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                Once customers place orders on Food Genie, incoming orders will appear here in real-time.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

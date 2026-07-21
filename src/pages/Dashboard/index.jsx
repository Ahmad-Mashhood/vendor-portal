import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { INITIAL_ORDERS } from '../../data/orders';

const Dashboard = () => {
  const [pulse, setPulse] = useState(0);
  const { restaurantName } = useOutletContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => p === 0 ? 1 : 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-body-md text-on-surface antialiased pb-32">
      <Header />      <main className="px-container-padding py-lg space-y-lg w-full max-w-[1920px] mx-auto">
        {/* Welcome Header */}
        <section className="mb-lg">
          <div className="space-y-1">
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">Welcome, {restaurantName}</h1>
            <p className="text-body-md text-on-surface-variant">Here's what's happening with your restaurant today.</p>
          </div>
        </section>
        
        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-card-gap">
          <div className="glass-card p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs transition-transform active:scale-95 duration-150 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg" data-icon="dashboard">dashboard</span>
              <span className="text-label-sm text-on-surface-variant">+12%</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant font-medium">Today's Orders</p>
              <p className="font-headline-md text-headline-md text-on-surface">42</p>
            </div>
          </div>
          
          <div className="glass-card p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs transition-transform active:scale-95 duration-150 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-lg" data-icon="payments">payments</span>
              <span className="text-label-sm text-on-surface-variant">+8%</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant font-medium">Today's Revenue</p>
              <p className="font-headline-md text-headline-md text-on-surface">$1,240</p>
            </div>
          </div>
          
          <div className="glass-card p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs transition-transform active:scale-95 duration-150 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-lg" data-icon="receipt_long">receipt_long</span>
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" style={{ opacity: pulse }}></span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant font-medium">Pending Orders</p>
              <p className="font-headline-md text-headline-md text-on-surface">07</p>
            </div>
          </div>
          
          <div className="glass-card p-md rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-xs transition-transform active:scale-95 duration-150 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg" data-icon="star" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-label-sm text-on-surface-variant">New</span>
            </div>
            <div>
              <p className="text-label-sm text-on-surface-variant font-medium">Average Rating</p>
              <p className="font-headline-md text-headline-md text-on-surface">4.8/5</p>
            </div>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section className="space-y-md">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Recent Orders</h2>
            <Link to="/order-management" className="text-primary font-label-lg hover:underline flex items-center gap-1">
              View All <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
            </Link>
          </div>
          
          <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant/20">
                  <tr>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant">Order ID</th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant">Customer</th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant">Items</th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant">Total</th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant">Status</th>
                    <th className="px-md py-sm font-label-lg text-on-surface-variant text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {INITIAL_ORDERS.slice(0, 3).map(order => (
                    <tr key={order.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                      <td className="px-md py-md font-label-lg text-primary">{order.id}</td>
                      <td className="px-md py-md">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-xs">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-body-md font-medium">{order.customer}</span>
                        </div>
                      </td>
                      <td className="px-md py-md text-body-md text-on-surface-variant">
                        {order.items.map(item => item.name).join(', ')}
                      </td>
                      <td className="px-md py-md text-body-md font-bold text-on-surface">{order.total || '$0.00'}</td>
                      <td className="px-md py-md">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                          order.status === 'Incoming' ? 'bg-error-container/10 text-error' :
                          order.status === 'Preparing' ? 'bg-primary-container/10 text-primary' :
                          order.status === 'Ready' ? 'bg-tertiary-container/10 text-tertiary' :
                          'bg-outline-variant/20 text-on-surface-variant'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-md py-md text-right">
                        <Link to="/order-management" className="text-tertiary hover:bg-tertiary-container/10 px-3 py-1 rounded-full text-label-sm font-bold transition-all active:scale-95">View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Actions & Insights Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-card-gap">
          <div className="glass-card p-md rounded-xl border border-outline-variant/30 space-y-md">
            <h3 className="font-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" data-icon="analytics">analytics</span> Performance Insights
            </h3>
            <div className="h-32 bg-surface-container-low rounded-lg flex items-end justify-between p-4 gap-2">
              <div className="w-full bg-primary-container/20 rounded-t-sm h-[40%] transition-all hover:h-[50%] hover:bg-primary-container/40"></div>
              <div className="w-full bg-primary-container/20 rounded-t-sm h-[60%] transition-all hover:h-[70%] hover:bg-primary-container/40"></div>
              <div className="w-full bg-primary-container/20 rounded-t-sm h-[85%] transition-all hover:h-[95%] hover:bg-primary-container/40"></div>
              <div className="w-full bg-primary-container/20 rounded-t-sm h-[55%] transition-all hover:h-[65%] hover:bg-primary-container/40"></div>
              <div className="w-full bg-primary-container rounded-t-sm h-[90%] transition-all hover:h-[100%]"></div>
            </div>
            <p className="text-label-sm text-on-surface-variant italic">Peak hours detected between 12:00 PM - 2:00 PM today.</p>
          </div>
          <div className="glass-card p-md rounded-xl border border-outline-variant/30 space-y-md">
            <h3 className="font-headline-md text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" data-icon="bolt">bolt</span> Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-sm">
              <Link to="/add-item" className="flex flex-col items-center justify-center gap-2 p-md bg-primary text-on-primary rounded-xl hover:bg-primary-fixed-dim hover:text-on-primary-fixed transition-all active:scale-95">
                <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
                <span className="text-label-sm font-bold">New Menu Item</span>
              </Link>
              <Link to="/promotion" className="flex flex-col items-center justify-center gap-2 p-md bg-surface-container-high text-primary rounded-xl hover:bg-primary/10 transition-all active:scale-95">
                <span className="material-symbols-outlined" data-icon="campaign">campaign</span>
                <span className="text-label-sm font-bold">Post Promotion</span>
              </Link>
              <Link to="/earnings" className="flex flex-col items-center justify-center gap-2 p-md bg-surface-container-high text-primary rounded-xl hover:bg-primary/10 transition-all active:scale-95">
                <span className="material-symbols-outlined" data-icon="history">history</span>
                <span className="text-label-sm font-bold">Daily Report</span>
              </Link>
              <Link to="/settings" className="flex flex-col items-center justify-center gap-2 p-md bg-surface-container-high text-primary rounded-xl hover:bg-primary/10 transition-all active:scale-95">
                <span className="material-symbols-outlined" data-icon="settings">settings</span>
                <span className="text-label-sm font-bold">Settings</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

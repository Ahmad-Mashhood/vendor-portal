import React, { useState } from 'react';
import Header from '../../components/Header/Header';

import { INITIAL_ORDERS } from '../../data/orders';

const OrderManagement = () => {
  const [activeTab, setActiveTab] = useState('Incoming');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const tabs = ['Incoming', 'Preparing', 'Ready', 'Completed'];

  const toggleDropdown = (id) => setOpenDropdown(openDropdown === id ? null : id);
  const toggleExpandOrder = (id) => setExpandedOrders(prev =>
    prev.includes(id) ? prev.filter(o => o !== id) : [...prev, id]
  );

  const acceptOrder = (orderId) => {
    setOrders(prev => {
      const order = prev.find(o => o.id === orderId);
      const rest = prev.filter(o => o.id !== orderId);
      const updated = { ...order, status: 'Preparing', time: 'Just now' };
      // Place at the bottom of Preparing
      return [...rest, updated];
    });
    setActiveTab('Preparing');
  };

  const rejectOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => {
      const order = prev.find(o => o.id === orderId);
      const rest = prev.filter(o => o.id !== orderId);
      const updated = { ...order, status: newStatus, time: 'Just now' };
      if (newStatus === 'Completed') {
        // Place at the top for Completed (newest first)
        return [updated, ...rest];
      }
      // Place at the bottom for Ready
      return [...rest, updated];
    });
    setOpenDropdown(null);
  };

  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24">
      <Header />
      <main className="px-container-padding py-lg space-y-lg w-full max-w-[1920px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-md mb-lg animate-fade-in">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">Order Management</h1>
            <p className="text-body-md text-on-surface-variant">View, track, and update all customer orders</p>
          </div>
        </div>
        <section className="sticky top-[64px] z-40 bg-background/95 backdrop-blur-sm py-2 -mx-container-padding px-container-padding flex overflow-x-auto no-scrollbar gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-label-lg text-label-lg transition-all active:scale-95 ${
                activeTab === tab
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {tab}
              <span className="ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full bg-black/10">
                {orders.filter(o => o.status === tab).length}
              </span>
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-card-gap">
          {filteredOrders.length === 0 && (
            <div className="col-span-full py-xl text-center text-on-surface-variant flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-5xl opacity-30">receipt_long</span>
              <p className="font-label-lg">No {activeTab.toLowerCase()} orders at the moment.</p>
            </div>
          )}

          {filteredOrders.map((order, index) => {
            const isExpanded = expandedOrders.includes(order.id);
            const itemsToShow = isExpanded ? order.items : order.items.slice(0, 3);
            const hiddenCount = order.items.length - 3;

            return (
              <div
                key={order.id}
                className={`bg-surface border border-outline-variant/30 rounded-xl p-md order-card-shadow animate-fade-in flex flex-col ${openDropdown === order.id ? 'z-10 relative' : ''}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    {order.status === 'Incoming' && (
                      <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">New Order</span>
                    )}
                    {order.status === 'Preparing' && (
                      <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse inline-block mr-2 mb-[2px]"></span>
                    )}
                    {order.status === 'Ready' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 mb-[2px]"></span>
                    )}
                    {order.status === 'Completed' && (
                      <span className="w-2 h-2 rounded-full bg-outline-variant inline-block mr-2 mb-[2px]"></span>
                    )}
                    <h3 className={`font-headline-md text-headline-md text-on-surface ${order.status !== 'Incoming' ? 'inline-block' : 'mt-1'}`}>
                      {order.id}
                    </h3>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface-variant">{order.time}</span>
                </div>

                {/* Customer */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === 'Incoming' ? 'bg-primary-container/20 text-primary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined text-[18px]">person</span>
                  </div>
                  <span className="font-label-lg text-label-lg text-on-surface">{order.customer}</span>
                </div>

                {/* Items */}
                <div className="bg-surface-container-low rounded-lg p-3 mb-4 space-y-1 flex-1 flex flex-col">
                  {itemsToShow.map((item, i) => (
                    <div key={i} className="flex justify-between font-body-md text-body-md">
                      <span className="text-on-surface-variant">{item.name}</span>
                      <span className="text-on-surface font-medium">{item.price}</span>
                    </div>
                  ))}

                  {hiddenCount > 0 && (
                    <button
                      onClick={() => toggleExpandOrder(order.id)}
                      className="text-primary font-label-sm text-left py-1 hover:underline flex items-center gap-1 w-full"
                    >
                      {isExpanded
                        ? <><span>Show less</span> <span className="material-symbols-outlined text-[14px]">expand_less</span></>
                        : <><span>+{hiddenCount} more items</span> <span className="material-symbols-outlined text-[14px]">expand_more</span></>
                      }
                    </button>
                  )}

                  <div className="mt-auto pt-2"></div>
                  {order.total && (
                    <div className="border-t border-outline-variant/20 pt-2 flex justify-between font-label-lg text-label-lg">
                      <span className="text-on-surface">Total</span>
                      <span className="text-primary">{order.total}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-auto">
                  {order.status === 'Incoming' && (
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => rejectOrder(order.id)}
                        className="w-full py-3 rounded-full font-label-lg text-label-lg border-2 border-secondary text-secondary hover:bg-secondary/5 transition-colors active:scale-95 duration-150"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => acceptOrder(order.id)}
                        className="w-full py-3 rounded-full font-label-lg text-label-lg bg-primary-container text-on-primary-container hover:bg-primary transition-colors shadow-sm active:scale-95 duration-150"
                      >
                        Accept
                      </button>
                    </div>
                  )}

                  {(order.status === 'Preparing' || order.status === 'Ready') && (
                    <div className="relative">
                      <button onClick={() => toggleDropdown(order.id)} className="w-full flex justify-between items-center py-3 px-5 rounded-xl border border-outline text-on-surface-variant font-label-lg text-label-lg bg-surface hover:bg-surface-container-low transition-colors">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-tertiary">
                            {order.status === 'Preparing' ? 'sync' : 'check_circle'}
                          </span>
                          <span>{order.status === 'Preparing' ? 'Preparing...' : 'Ready for Pickup'}</span>
                        </div>
                        <span className="material-symbols-outlined">expand_more</span>
                      </button>

                      {openDropdown === order.id && (
                        <div className="absolute bottom-full left-0 w-full mb-1 bg-surface rounded-xl shadow-lg border border-outline-variant/50 overflow-hidden z-20">
                          {order.status === 'Preparing' && (
                            <button
                              onClick={() => updateStatus(order.id, 'Ready')}
                              className="w-full text-left px-5 py-3 hover:bg-surface-container font-label-lg text-label-lg text-on-surface border-b border-outline-variant/10"
                            >
                              Mark as Ready
                            </button>
                          )}
                          {order.status === 'Ready' && (
                            <button
                              onClick={() => updateStatus(order.id, 'Completed')}
                              className="w-full text-left px-5 py-3 hover:bg-surface-container font-label-lg text-label-lg text-on-surface border-b border-outline-variant/10"
                            >
                              Mark as Completed
                            </button>
                          )}
                          <button className="w-full text-left px-5 py-3 hover:bg-surface-container font-label-lg text-label-lg text-error">
                            Issue Refund
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};

export default OrderManagement;

import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { INITIAL_ORDERS } from '../../data/orders';

const Notifications = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const notifications = [
    {
      id: 1,
      type: 'order',
      icon: 'receipt_long',
      color: 'primary',
      title: 'New Order #FG-8821',
      time: '2 mins ago',
      summary: 'Marcus Holloway placed a new order.',
      details: 'Items: 2x Truffle Burger Delux, 1x Large Sweet Potato Fries. Total: $38.50. Please start preparing.'
    },
    {
      id: 2,
      type: 'alert',
      icon: 'inventory_2',
      color: 'tertiary',
      title: 'Low Stock: Truffle Oil',
      time: '1 hour ago',
      summary: 'Inventory alert for Truffle Oil.',
      details: 'You are running low on Truffle Oil. Current stock is below 10%. Please reorder to avoid menu unavailability.'
    },
    {
      id: 3,
      type: 'system',
      icon: 'campaign',
      color: 'secondary',
      title: 'Weekly Performance Report',
      time: 'Yesterday',
      summary: 'Your weekly earnings report is ready.',
      details: 'Great job! Your restaurant saw a 12% increase in orders compared to last week. Revenue was up by 8%. Check the Earnings tab for full details.'
    }
  ];

  const handleViewOrder = (notif, e) => {
    e.stopPropagation(); // Stop click from collapsing the accordion
    const match = notif.title.match(/#FG-\d+/);
    if (match) {
      const orderId = match[0];
      const found = INITIAL_ORDERS.find(o => o.id === orderId);
      if (found) {
        setSelectedOrder(found);
      } else {
        setSelectedOrder({
          id: orderId,
          customer: 'Marcus Holloway',
          items: [
            { name: '2x Truffle Burger Delux', price: '$32.00' },
            { name: '1x Large Sweet Potato Fries', price: '$6.50' }
          ],
          total: '$38.50',
          status: 'Incoming',
          time: notif.time
        });
      }
    }
  };

  const handleAcceptOrder = () => {
    setToastMessage(`Order ${selectedOrder.id} accepted and sent to kitchen!`);
    setSelectedOrder(null);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleRejectOrder = () => {
    setToastMessage(`Order ${selectedOrder.id} rejected.`);
    setSelectedOrder(null);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="bg-[#FDF3EC] dark:bg-[#261814] min-h-screen text-on-surface dark:text-surface font-body-md overflow-x-hidden pb-32 transition-colors duration-300">
      <Header />
      <main className="max-w-2xl mx-auto px-container-padding py-xl space-y-md">
        <div className="space-y-1 animate-fade-in">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1F1B1B] dark:text-surface">Notifications</h1>
          <p className="text-body-md text-[#8A8A8A] dark:text-surface-variant">Stay updated on your restaurant's activity.</p>
        </div>

        <section className="space-y-card-gap animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {notifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`bg-white dark:bg-[#3c2d28] border border-outline-variant/30 dark:border-outline/30 rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer ${expandedId === notif.id ? 'ring-2 ring-primary/20' : 'hover:bg-surface-container-low dark:hover:bg-[#4a3a35]'}`}
              onClick={() => setExpandedId(expandedId === notif.id ? null : notif.id)}
            >
              <div className="p-md flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full bg-${notif.color}-container/20 dark:bg-${notif.color}/20 flex items-center justify-center flex-shrink-0`}>
                  <span className={`material-symbols-outlined text-${notif.color} dark:text-${notif.color}-fixed-dim`}>{notif.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-headline-md text-on-surface dark:text-surface">{notif.title}</h3>
                    <span className="font-label-sm text-on-surface-variant dark:text-surface-variant whitespace-nowrap">{notif.time}</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant dark:text-surface-variant/80">{notif.summary}</p>
                  
                  {/* Expanded Content */}
                  <div className={`overflow-hidden transition-all duration-300 ${expandedId === notif.id ? 'max-h-40 opacity-100 mt-4 pt-4 border-t border-outline-variant/20 dark:border-outline/20' : 'max-h-0 opacity-0'}`}>
                    <p className="text-body-md text-on-surface dark:text-surface/90">{notif.details}</p>
                    
                    {notif.type === 'order' && (
                      <button 
                        onClick={(e) => handleViewOrder(notif, e)}
                        className="mt-4 px-4 py-2 bg-[#FF6B35] text-white font-label-sm rounded-lg active:scale-95 transition-transform font-semibold hover:opacity-90 shadow-sm"
                      >
                        View Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#3c2d28] rounded-xl shadow-2xl p-lg w-full max-w-md border border-[#2B2D42]/10 text-on-surface dark:text-surface m-4">
            <div className="flex justify-between items-center mb-md border-b border-[#2B2D42]/10 pb-sm">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#2B2D42] dark:text-white">{selectedOrder.id}</h3>
                <p className="text-xs text-[#2B2D42]/60 dark:text-surface-variant">Status: {selectedOrder.status}</p>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-[#2B2D42]/60 dark:text-surface-variant hover:text-[#2B2D42]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-md">
              <div>
                <p className="font-label-sm text-xs text-[#2B2D42]/60 dark:text-surface-variant uppercase">Customer</p>
                <p className="font-label-md text-label-md font-semibold text-[#2B2D42] dark:text-white mt-0.5">{selectedOrder.customer}</p>
              </div>

              <div>
                <p className="font-label-sm text-xs text-[#2B2D42]/60 dark:text-surface-variant uppercase mb-xs">Items</p>
                <div className="space-y-xs">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-body-sm font-medium">
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-[#2B2D42]/5 pt-sm mt-sm">
                  <span className="font-label-sm text-[#2B2D42]/60 dark:text-surface-variant font-semibold">Total</span>
                  <span className="font-headline-sm text-headline-sm text-[#FF6B35] font-bold">{selectedOrder.total}</span>
                </div>
              </div>

              <div className="flex gap-sm pt-sm border-t border-[#2B2D42]/10">
                <button 
                  onClick={handleRejectOrder}
                  className="flex-1 py-2 rounded-lg border border-red-200 text-red-600 font-label-md hover:bg-red-50 dark:hover:bg-red-950/20 active:scale-95 transition-all text-center font-semibold"
                >
                  Reject
                </button>
                <button 
                  onClick={handleAcceptOrder}
                  className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-label-md hover:bg-emerald-700 active:scale-95 transition-all text-center font-semibold"
                >
                  Accept Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast feedback */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-primary text-white px-lg py-md rounded-xl shadow-2xl animate-bounce border border-white/20 flex items-center gap-xs font-semibold">
          <span className="material-symbols-outlined">info</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Notifications;

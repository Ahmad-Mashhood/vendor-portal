import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { INITIAL_ORDERS } from '../../data/orders';

const PayoutDetails = () => {
  const { id } = useParams();

  // In a real app we'd fetch the payout and its associated orders based on `id`
  // For now, we simulate fetching orders related to this payout (just showing the completed orders)
  const payoutOrders = INITIAL_ORDERS.filter(o => o.status === 'Completed');

  return (
    <div className="min-h-screen flex flex-col pb-24 text-on-surface bg-background">
      <Header />
      <main className="flex-1 px-container-padding py-lg space-y-lg w-full max-w-[1920px] mx-auto">
        <div className="flex items-center gap-2 animate-fade-in">
          <Link to="/payout-history" className="p-2 rounded-full hover:bg-surface-container transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Payout Details</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Breakdown of transfer {id || '#TRX-9082'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-card-gap animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="md:col-span-1 space-y-card-gap">
            <div className="glass-card p-md rounded-xl border border-outline-variant/30 space-y-4">
              <h3 className="font-headline-sm text-on-surface border-b border-outline-variant/20 pb-2">Summary</h3>
              
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Gross Revenue</span>
                <span className="font-bold text-on-surface">$1,480.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Platform Fees (12%)</span>
                <span className="font-bold text-error">-$177.60</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-surface-variant">Promotions/Adjustments</span>
                <span className="font-bold text-error">-$22.40</span>
              </div>
              
              <div className="border-t border-outline-variant/20 pt-4 mt-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-on-surface">Net Payout</span>
                  <span className="font-headline-md text-primary">$1,280.00</span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h2 className="font-headline-md text-headline-md text-on-surface">Orders Included in Payout</h2>
            <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-outline-variant/20">
                    <tr>
                      <th className="px-md py-sm font-label-lg text-on-surface-variant">Order ID</th>
                      <th className="px-md py-sm font-label-lg text-on-surface-variant">Customer</th>
                      <th className="px-md py-sm font-label-lg text-on-surface-variant">Items</th>
                      <th className="px-md py-sm font-label-lg text-on-surface-variant">Total</th>
                      <th className="px-md py-sm font-label-lg text-on-surface-variant text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {payoutOrders.map(order => (
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
                        <td className="px-md py-md text-right">
                        <Link to="/order-management" className="text-tertiary hover:bg-tertiary-container/10 px-3 py-1 rounded-full text-label-sm font-bold transition-all active:scale-95">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayoutDetails;

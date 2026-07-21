import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

const PayoutHistory = () => {
  const [selectedYear, setSelectedYear] = useState('2023');

  const stats = {
    totalPaid: '$15,482.90',
    pending: '$960.30',
    nextPayout: 'Oct 31, 2023'
  };

  const payouts = [
    { id: 'PAY-001', date: 'Oct 24, 2023', orders: 48, amount: '$1,240.20', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,378.00', fees: '$137.80' },
    { id: 'PAY-002', date: 'Oct 17, 2023', orders: 52, amount: '$1,485.00', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,650.00', fees: '$165.00' },
    { id: 'PAY-003', date: 'Oct 10, 2023', orders: 42, amount: '$960.30', status: 'Pending', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,067.00', fees: '$106.70' },
    { id: 'PAY-004', date: 'Oct 03, 2023', orders: 60, amount: '$1,850.50', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$2,056.11', fees: '$205.61' },
    { id: 'PAY-005', date: 'Sep 26, 2023', orders: 45, amount: '$1,190.00', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,322.22', fees: '$132.22' },
    { id: 'PAY-006', date: 'Sep 19, 2023', orders: 50, amount: '$1,320.40', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,467.11', fees: '$146.71' },
    { id: 'PAY-007', date: 'Sep 12, 2023', orders: 40, amount: '$1,050.00', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,166.67', fees: '$116.67' },
    { id: 'PAY-008', date: 'Sep 05, 2023', orders: 55, amount: '$1,620.10', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,800.11', fees: '$180.01' },
    { id: 'PAY-009', date: 'Aug 29, 2023', orders: 49, amount: '$1,410.60', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,567.33', fees: '$156.73' },
    { id: 'PAY-010', date: 'Aug 22, 2023', orders: 51, amount: '$1,475.20', status: 'Paid', method: 'Bank Transfer (ACH)', bank: 'Chase Bank (****4321)', gross: '$1,639.11', fees: '$163.91' }
  ];

  const graphData = [
    { label: 'Aug 22', height: '65%' },
    { label: 'Aug 29', height: '62%' },
    { label: 'Sep 05', height: '78%' },
    { label: 'Sep 12', height: '48%' },
    { label: 'Sep 19', height: '58%' },
    { label: 'Sep 26', height: '52%' },
    { label: 'Oct 03', height: '88%' },
    { label: 'Oct 10', height: '45%' },
    { label: 'Oct 17', height: '72%' },
    { label: 'Oct 24', height: '60%' }
  ];

  return (
    <div className="min-h-screen flex flex-col pb-24 text-on-surface bg-background">
      <Header />
      <main className="flex-1 px-container-padding py-lg space-y-lg w-full max-w-[1920px] mx-auto">
        {/* Navigation & Header */}
        <div className="flex items-center gap-2 animate-fade-in">
          <Link to="/earnings" className="p-2 rounded-full hover:bg-surface-container transition-all flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Payout History</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Detailed view of all payouts and transaction records</p>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-card-gap animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="glass-card rounded-xl p-md flex flex-col justify-between h-28">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">account_balance_wallet</span>
              <span className="font-label-lg text-on-surface-variant">Total Paid Out</span>
            </div>
            <div className="font-headline-lg text-[28px] text-on-surface font-bold leading-none">{stats.totalPaid}</div>
          </div>
          <div className="glass-card rounded-xl p-md flex flex-col justify-between h-28">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">pending</span>
              <span className="font-label-lg text-on-surface-variant">Pending Payout</span>
            </div>
            <div className="font-headline-lg text-[28px] text-on-surface font-bold leading-none">{stats.pending}</div>
          </div>
          <div className="glass-card rounded-xl p-md flex flex-col justify-between h-28">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">event</span>
              <span className="font-label-lg text-on-surface-variant">Next Payout Date</span>
            </div>
            <div className="font-headline-lg text-[28px] text-on-surface font-bold leading-none">{stats.nextPayout}</div>
          </div>
        </div>

        {/* Main Grid: Chart and Payout Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg items-start">
          {/* Payout Trend Chart */}
          <div className="lg:col-span-1 glass-card rounded-xl p-md space-y-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface">Payout Trend</h2>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-surface-container text-on-surface font-label-lg py-1 px-3 rounded-full border-none focus:outline-none cursor-pointer"
              >
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>

            <div className="h-48 flex items-end justify-between gap-1.5 px-1 pt-4">
              {graphData.map((data, index) => (
                <div key={index} className="group relative flex-1 flex flex-col items-center">
                  <div className="absolute bottom-full mb-1 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {payouts[payouts.length - 1 - index]?.amount}
                  </div>
                  <div className="chart-bar w-full bg-primary-container/40 group-hover:bg-primary-container rounded-t-sm transition-colors" style={{ height: data.height }}></div>
                  <span className="text-[8px] mt-2 text-on-surface-variant/60 font-medium whitespace-nowrap overflow-hidden max-w-full">{data.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed List */}
          <div className="lg:col-span-2 space-y-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-between items-center px-1">
              <h2 className="font-headline-md text-headline-md text-on-surface">Payout Details</h2>
              <span className="text-body-md text-on-surface-variant">{payouts.length} Payments Found</span>
            </div>

            <div className="space-y-card-gap">
              {payouts.map((payout) => (
                  <Link 
                    to={`/payout-details/${payout.id}`}
                    key={payout.id} 
                    className="glass-card rounded-xl p-md flex flex-col gap-sm cursor-pointer transition-all duration-300 hover:bg-surface-container-low"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md w-full">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-primary">
                            {payout.status === 'Paid' ? 'account_balance_wallet' : 'schedule'}
                          </span>
                        </div>
                        <div>
                          <div className="font-body-lg text-body-lg text-on-surface font-semibold">{payout.date}</div>
                          <div className="font-label-sm text-label-sm text-on-surface-variant flex gap-2">
                            <span>{payout.orders} Orders</span>
                            <span>•</span>
                            <span>{payout.id}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between w-full md:w-auto md:flex-col items-center md:items-end">
                        <div className="font-body-lg text-body-lg text-on-surface font-bold">{payout.amount}</div>
                        <div className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                          payout.status === 'Paid' 
                            ? 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' 
                            : 'bg-surface-container-highest dark:bg-surface-container-high text-on-surface-variant'
                        }`}>
                          {payout.status}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PayoutHistory;

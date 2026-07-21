import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

const Earnings = () => {
  const [isMonth, setIsMonth] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState('Oct 18 - 24');
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [activeBar, setActiveBar] = useState(null); // stores index of hovered/clicked bar

  // Weekly data store
  const weeklyData = {
    'Oct 18 - 24': {
      total: '$4,285.50',
      growth: '+12.4%',
      bars: [
        { day: 'Mon', height: '40%', value: '$514.26', orders: 18 },
        { day: 'Tue', height: '65%', value: '$835.65', orders: 28 },
        { day: 'Wed', height: '55%', value: '$707.10', orders: 24 },
        { day: 'Thu', height: '90%', value: '$1,157.08', orders: 38 },
        { day: 'Fri', height: '85%', value: '$1,092.80', orders: 35 },
        { day: 'Sat', height: '45%', value: '$578.54', orders: 20 },
        { day: 'Sun', height: '30%', value: '$385.67', orders: 13 }
      ]
    },
    'Oct 11 - 17': {
      total: '$3,812.20',
      growth: '+8.2%',
      bars: [
        { day: 'Mon', height: '45%', value: '$571.83', orders: 19 },
        { day: 'Tue', height: '50%', value: '$635.36', orders: 21 },
        { day: 'Wed', height: '70%', value: '$889.51', orders: 30 },
        { day: 'Thu', height: '60%', value: '$762.44', orders: 25 },
        { day: 'Fri', height: '95%', value: '$1,207.19', orders: 41 },
        { day: 'Sat', height: '40%', value: '$508.29', orders: 17 },
        { day: 'Sun', height: '20%', value: '$254.14', orders: 9 }
      ]
    },
    'Oct 04 - 10': {
      total: '$4,105.80',
      growth: '+10.5%',
      bars: [
        { day: 'Mon', height: '35%', value: '$431.11', orders: 14 },
        { day: 'Tue', height: '55%', value: '$677.46', orders: 22 },
        { day: 'Wed', height: '65%', value: '$800.62', orders: 27 },
        { day: 'Thu', height: '75%', value: '$923.80', orders: 31 },
        { day: 'Fri', height: '80%', value: '$985.39', orders: 33 },
        { day: 'Sat', height: '50%', value: '$615.87', orders: 21 },
        { day: 'Sun', height: '30%', value: '$369.52', orders: 12 }
      ]
    }
  };

  // Monthly data store
  const monthlyData = {
    'October': {
      total: '$17,285.50',
      growth: '+14.1%',
      bars: [
        { day: 'W1', height: '75%', value: '$4,105.80', orders: 138 },
        { day: 'W2', height: '70%', value: '$3,812.20', orders: 128 },
        { day: 'W3', height: '85%', value: '$4,285.50', orders: 142 },
        { day: 'W4', height: '90%', value: '$5,082.00', orders: 168 }
      ]
    },
    'September': {
      total: '$15,420.00',
      growth: '+9.3%',
      bars: [
        { day: 'W1', height: '60%', value: '$3,420.00', orders: 114 },
        { day: 'W2', height: '75%', value: '$4,105.00', orders: 135 },
        { day: 'W3', height: '70%', value: '$3,850.00', orders: 129 },
        { day: 'W4', height: '75%', value: '$4,045.00', orders: 132 }
      ]
    },
    'August': {
      total: '$14,950.50',
      growth: '+6.8%',
      bars: [
        { day: 'W1', height: '65%', value: '$3,720.50', orders: 124 },
        { day: 'W2', height: '60%', value: '$3,540.00', orders: 118 },
        { day: 'W3', height: '70%', value: '$3,920.00', orders: 130 },
        { day: 'W4', height: '68%', value: '$3,770.00', orders: 125 }
      ]
    },
    'July': {
      total: '$13,850.00',
      growth: '+4.5%',
      bars: [
        { day: 'W1', height: '55%', value: '$3,120.00', orders: 104 },
        { day: 'W2', height: '65%', value: '$3,620.00', orders: 120 },
        { day: 'W3', height: '60%', value: '$3,410.00', orders: 114 },
        { day: 'W4', height: '67%', value: '$3,700.00', orders: 123 }
      ]
    }
  };

  const currentData = isMonth ? monthlyData[selectedMonth] : weeklyData[selectedWeek];

  return (
    <div className="min-h-screen flex flex-col pb-24 text-on-surface bg-background">
      <Header />
      <main className="flex-1 px-container-padding py-lg space-y-lg w-full max-w-[1920px] mx-auto">
        <div className="animate-fade-in">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-xs">Earnings</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Track your restaurant's financial growth</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg items-start">
          {/* Left Side: Chart and Stats */}
          <div className="lg:col-span-2 space-y-lg">
            {/* Chart Card */}
            <div className="glass-card rounded-xl p-md space-y-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md pb-xs">
                <div className="bg-surface-container flex p-1 rounded-full w-fit">
                  <button 
                    onClick={() => {
                      setIsMonth(false);
                      setActiveBar(null);
                    }}
                    className={`active-pill font-label-lg px-4 py-1.5 rounded-full transition-all ${!isMonth ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}
                  >Week</button>
                  <button 
                    onClick={() => {
                      setIsMonth(true);
                      setActiveBar(null);
                    }}
                    className={`active-pill font-label-lg px-4 py-1.5 rounded-full transition-all ${isMonth ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}
                  >Month</button>
                </div>

                {/* Sub-Selectors based on Week/Month choice */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {!isMonth ? (
                    Object.keys(weeklyData).map((wk) => (
                      <button
                        key={wk}
                        onClick={() => {
                          setSelectedWeek(wk);
                          setActiveBar(null);
                        }}
                        className={`px-3 py-1 text-[12px] font-label-lg rounded-full border transition-all whitespace-nowrap ${
                          selectedWeek === wk
                            ? 'bg-primary-container text-on-primary-container border-transparent shadow-sm'
                            : 'bg-surface border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low'
                        }`}
                      >
                        {wk}
                      </button>
                    ))
                  ) : (
                    Object.keys(monthlyData).map((mo) => (
                      <button
                        key={mo}
                        onClick={() => {
                          setSelectedMonth(mo);
                          setActiveBar(null);
                        }}
                        className={`px-3 py-1 text-[12px] font-label-lg rounded-full border transition-all whitespace-nowrap ${
                          selectedMonth === mo
                            ? 'bg-primary-container text-on-primary-container border-transparent shadow-sm'
                            : 'bg-surface border-outline-variant/30 text-on-surface-variant hover:bg-surface-container-low'
                        }`}
                      >
                        {mo}
                      </button>
                    ))
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-end border-t border-outline-variant/20 pt-4">
                <div className="space-y-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total Earnings ({isMonth ? selectedMonth : selectedWeek})</span>
                  <div className="font-headline-lg text-[32px] text-on-surface font-bold leading-none">{currentData.total}</div>
                </div>
                <div className="flex items-center text-primary font-label-lg gap-1 mb-1">
                  <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  <span>{currentData.growth}</span>
                </div>
              </div>

              {/* Chart visualization */}
              <div className="h-48 flex items-end justify-between gap-3 px-1 pt-4 relative">
                {currentData.bars.map((bar, index) => (
                  <div 
                    key={index} 
                    className="group relative flex-1 flex flex-col items-center cursor-pointer"
                    onMouseEnter={() => setActiveBar(index)}
                    onMouseLeave={() => setActiveBar(null)}
                    onClick={() => setActiveBar(activeBar === index ? null : index)}
                  >
                    {/* Tooltip on Hover */}
                    <div className={`absolute bottom-full mb-2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded shadow-md pointer-events-none transition-all z-20 ${
                      activeBar === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                      <p className="font-bold">{bar.value}</p>
                      <p className="text-[8px] opacity-80">{bar.orders} Orders</p>
                    </div>

                    <div 
                      className={`chart-bar w-full rounded-t-sm transition-all duration-300 ${
                        activeBar === index 
                          ? 'bg-primary' 
                          : 'bg-primary-container/45 hover:bg-primary-container/70'
                      }`} 
                      style={{ height: bar.height }}
                    ></div>
                    <span className="text-[10px] mt-2 text-on-surface-variant/60 font-semibold">{bar.day}</span>
                  </div>
                ))}
              </div>

              {/* Detail indicator below the chart */}
              <div className="bg-surface-container-low rounded-lg p-2.5 flex items-center justify-between text-[12px] font-label-sm text-on-surface-variant">
                {activeBar !== null ? (
                  <>
                    <span>Selected Period: <strong>{currentData.bars[activeBar].day}</strong></span>
                    <span className="text-primary font-bold">{currentData.bars[activeBar].value} ({currentData.bars[activeBar].orders} Orders)</span>
                  </>
                ) : (
                  <span>Hover or click on chart bars to view details</span>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-card-gap animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="glass-card rounded-xl p-md flex flex-col justify-between h-28">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">receipt_long</span>
                  <span className="font-label-lg text-on-surface-variant">Orders</span>
                </div>
                <div className="font-headline-lg text-[28px] text-on-surface font-bold leading-none">142</div>
              </div>
              <div className="glass-card rounded-xl p-md flex flex-col justify-between h-28">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">avg_time</span>
                  <span className="font-label-lg text-on-surface-variant">Avg. Order</span>
                </div>
                <div className="font-headline-lg text-[28px] text-on-surface font-bold leading-none">$30.18</div>
              </div>
            </div>
          </div>

          {/* Right Side: Payout History Summary */}
          <div className="space-y-sm animate-fade-in lg:mt-0" style={{ animationDelay: "0.3s" }}>
            <div className="flex justify-between items-center px-1">
              <h2 className="font-headline-md text-headline-md text-on-surface">Payout History</h2>
              <Link to="/payout-history" className="text-primary font-label-lg hover:underline">View All</Link>
            </div>
            
            <div className="space-y-card-gap">
              <div className="glass-card rounded-xl p-md flex justify-between items-center">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                  </div>
                  <div>
                    <div className="font-body-lg text-body-lg text-on-surface font-semibold">Oct 24, 2023</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">48 Orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-body-lg text-body-lg text-on-surface font-bold">$1,240.20</div>
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-tight">Paid</div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-md flex justify-between items-center">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
                  </div>
                  <div>
                    <div className="font-body-lg text-body-lg text-on-surface font-semibold">Oct 17, 2023</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">52 Orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-body-lg text-body-lg text-on-surface font-bold">$1,485.00</div>
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-tight">Paid</div>
                </div>
              </div>

              <div className="glass-card rounded-xl p-md flex justify-between items-center">
                <div className="flex items-center gap-md">
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">schedule</span>
                  </div>
                  <div>
                    <div className="font-body-lg text-body-lg text-on-surface font-semibold">Oct 10, 2023</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant">42 Orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-body-lg text-body-lg text-on-surface font-bold">$960.30</div>
                  <div className="inline-flex px-2 py-0.5 rounded-full bg-surface-container-highest dark:bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase tracking-tight">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Earnings;

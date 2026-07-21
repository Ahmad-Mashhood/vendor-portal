import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const RestaurantLayout = () => {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [restaurantName, setRestaurantName] = useState(
    () => localStorage.getItem('vendor_restaurant_name') || 'Karachi Hotel'
  );

  // Keep restaurantName in sync if it changes (e.g. after login)
  useEffect(() => {
    const handleStorage = () => {
      const name = localStorage.getItem('vendor_restaurant_name');
      if (name) setRestaurantName(name);
    };
    window.addEventListener('storage', handleStorage);
    // Also read on mount in case localStorage was just updated in same tab
    const name = localStorage.getItem('vendor_restaurant_name');
    if (name) setRestaurantName(name);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="antialiased">
      <Outlet context={{ restaurantName, setRestaurantName }} />
      
      {/* Universal Bottom Navigation mapped to all pages */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-safe shadow-lg z-50 rounded-t-xl" style={{ backgroundColor: 'rgb(122, 46, 34)' }}>
        <Link to="/dashboard" className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${path === '/dashboard' ? 'bg-white/20 rounded-xl active-nav-item' : 'hover:bg-white/10'} text-white`}>
          <span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </Link>
        <Link to="/menu-management" className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${path === '/menu-management' ? 'bg-white/20 rounded-xl active-nav-item' : 'hover:bg-white/10'} text-white`}>
          <span className="material-symbols-outlined" data-icon="restaurant_menu">restaurant_menu</span>
          <span className="font-label-sm text-label-sm">Menu</span>
        </Link>
        <Link to="/order-management" className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${path === '/order-management' ? 'bg-white/20 rounded-xl active-nav-item' : 'hover:bg-white/10'} text-white`}>
          <span className="material-symbols-outlined" data-icon="receipt_long">receipt_long</span>
          <span className="font-label-sm text-label-sm">Orders</span>
        </Link>
        <Link to="/earnings" className={`flex flex-col items-center justify-center px-4 py-1 transition-all active:scale-90 duration-200 ${path === '/earnings' ? 'bg-white/20 rounded-xl active-nav-item' : 'hover:bg-white/10'} text-white`}>
          <span className="material-symbols-outlined" data-icon="payments">payments</span>
          <span className="font-label-sm text-label-sm">Earnings</span>
        </Link>
      </nav>
    </div>
  );
};

export default RestaurantLayout;

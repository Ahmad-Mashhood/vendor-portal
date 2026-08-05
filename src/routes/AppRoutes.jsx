import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Earnings from '../pages/Earnings';
import MenuManagement from '../pages/MenuManagement';
import OrderManagement from '../pages/OrderManagement';
import Profile from '../pages/Profile';
import AddItem from '../pages/AddItem';
import Notifications from '../pages/Notifications';
import EditItem from '../pages/EditItem';
import PayoutHistory from '../pages/PayoutHistory';
import Settings from '../pages/Settings';
import Promotion from '../pages/Promotion';
import PayoutDetails from '../pages/PayoutDetails';
import RestaurantLayout from '../layouts/RestaurantLayout';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import MockGoogleAuth from '../pages/MockGoogleAuth';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/auth/google" element={<MockGoogleAuth />} />

      <Route path="/" element={<RestaurantLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="menu-management" element={<MenuManagement />} />
        <Route path="order-management" element={<OrderManagement />} />
        <Route path="profile" element={<Profile />} />
        <Route path="add-item" element={<AddItem />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="edit-item/:id" element={<EditItem />} />
        <Route path="payout-history" element={<PayoutHistory />} />
        <Route path="settings" element={<Settings />} />
        <Route path="promotion" element={<Promotion />} />
        <Route path="payout-details/:id" element={<PayoutDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

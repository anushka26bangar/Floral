import React, { Suspense, lazy } from 'react'; // Import Suspense and lazy
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Lazy load components
const HomePage = lazy(() => import('./components/HomePage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const SignupPage = lazy(() => import('./components/SignupPage'));
const ShopPage = lazy(() => import('./components/ShopPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const CartPage = lazy(() => import('./components/CartPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const Checkout = lazy(() => import('./components/Checkout'));
const AddFlower = lazy(() => import('./components/admin/AddFlower'));
const AdminHomepage = lazy(() => import('./components/admin/AdminHomePage'));
const ManageUsers = lazy(() => import('./components/admin/ManageUsers'));
const Orders = lazy(() => import('./components/admin/Orders'));
const Payment = lazy(() => import('./components/Payment'));
const EditFlower = lazy(() => import('./components/admin/EditFlower'));
const ManageProduct = lazy(() => import('./components/admin/manageproduct'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));
const CustomerManagement = lazy(() => import('./components/admin/CustomerManagement'));
const Main = lazy(() => import('./components/Main'));

const App = () => {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}> {/* Show loading indicator */}
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/shop" element={<ShopPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/admin-homepage" element={<AdminHomepage />} />
                    <Route path="/add-flower" element={<AddFlower />} />
                    <Route path="/manage-users" element={<ManageUsers />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/manage-product" element={<ManageProduct />} />
                    <Route path="/edit-flower/:id" element={<EditFlower />} />
                    <Route path="/dash" element={<Dashboard />} />
                    <Route path="/customer-management" element={<CustomerManagement />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;

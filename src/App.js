import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage'; // Ensure the name matches exactly
import SignupPage from './components/SignupPage';
import ShopPage from './components/ShopPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import AboutPage from './components/AboutPage';
import Checkout from './components/Checkout';
import AddFlower from './components/admin/AddFlower';
import AdminHomepage from './components/admin/AdminHomePage';
import ManageUsers from './components/admin/ManageUsers';
import Orders from './components/admin/Orders';
import Payment from './components/Payment'; // Ensure correct casing
import ManageProduct from './components/admin/manageproduct';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
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
                <Route path="/payment" element={<Payment />} /> {/* Fixed this */}
                <Route path="/manage-product" element={<ManageProduct />} />
            </Routes>
        </Router>
    );
};

export default App;

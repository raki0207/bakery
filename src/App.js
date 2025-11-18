import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Login from './components/Login';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Connections from './pages/Connections';
import ContactUs from './pages/ContactUs';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Favorites from './pages/Favorites';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LikedProductsProvider } from './context/LikedProductsContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { FloatingButtonsProvider } from './context/FloatingButtonsContext';

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleCloseLogin = () => setShowLogin(false);
  const handleOpenLogin = () => setShowLogin(true);
  const handleLoginSuccess = () => setShowLogin(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowLogin(true);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    // IMPORTANT FIX FOR GITHUB PAGES
    <Router basename="/bakery">
      <LikedProductsProvider>
        <CartProvider>
          <FloatingButtonsProvider>
            <div className="App">

              <Navbar 
                onLoginClick={handleOpenLogin} 
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
              />

              {showLogin && (
                <Login 
                  onClose={handleCloseLogin} 
                  onLoginSuccess={handleLoginSuccess} 
                />
              )}

              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/connections" element={<Connections />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
              </main>

              <ScrollToTop />
              <Footer />

            </div>
          </FloatingButtonsProvider>
        </CartProvider>
      </LikedProductsProvider>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

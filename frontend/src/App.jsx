import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { useState, useEffect } from "react";
import MyOrders from "./pages/MyOrders/MyOrders";
import Invoice from "./pages/Invoice/Invoice";
import Profile from "./pages/Profile/Profile";
import OrderResult from "./pages/OrderResult/OrderResult";

// 🔥 Toast imports
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();
  const [showLogin,setShowLogin] = useState(false)

  // 🔥 NEW: Listen for checkout login trigger
  useEffect(() => {
    const openLogin = () => setShowLogin(true);
    window.addEventListener("openLogin", openLogin);

    return () => {
      window.removeEventListener("openLogin", openLogin);
    };
  }, []);

  // Hide navbar and footer on order-result page
  const hideNavbarFooter = location.pathname === "/order-result";

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        {!hideNavbarFooter && <Navbar setShowLogin={setShowLogin}  />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/order-result" element={<OrderResult />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
      {!hideNavbarFooter && <Footer />}

      {/* 🔥 Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;

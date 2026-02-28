import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import CartToast from "../components/cart/CartToast";
import CartDrawer from "../components/cart/CartDrawer";
import GuestBanner from "../components/ui/GuestBanner";
import WishlistToast from "../components/ui/WishlistToast";
import WhatsAppFAB from "../components/ui/WhatsAppFAB";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
      <CartToast />
      <CartDrawer />
      <WishlistToast />
      <GuestBanner />
      <WhatsAppFAB />
    </div>
  );
};

export default Layout;

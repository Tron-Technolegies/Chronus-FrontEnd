import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import CartToast from "../components/cart/CartToast";
import CartDrawer from "../components/cart/CartDrawer";
import { WishlistProvider } from "../context/WishlistContext";

const Layout = () => {
  return (
    <WishlistProvider>
      <div>
        <Header />
        <div className="pt-16">
          <Outlet />
        </div>
        <Footer />
        <CartToast />
        <CartDrawer />
      </div>
    </WishlistProvider>
  );
};

export default Layout;

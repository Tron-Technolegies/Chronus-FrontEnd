import React from "react";
import Header from "../components/layout/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";
import CartToast from "../components/cart/CartToast";
import CartDrawer from "../components/cart/CartDrawer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />

      <CartToast />
      <CartDrawer />
    </div>
  );
};

export default Layout;

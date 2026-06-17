import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetailPage from "../pages/shop/productdetails/ProductDetailPage";
import CheckoutPage from "../pages/CheckoutPage";
import WishlistPage from "../pages/WishlistPage";
import MyAccountPage from "../pages/auth/MyAccountPage";
import OrdersPage from "../pages/OrdersPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";
import ProtectedRoute from "./ProtectedRoute";
import ShippingPage from "../pages/ShippingPage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPage";
import LegalNoticePage from "../pages/LegalNoticePage";
import FAQPage from "../pages/FAQPage";
import PaymentStatusPage from "../pages/PaymentStatusPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,

      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/signup",
          element: <SignupPage />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: "/reset-password/:uid/:token",
          element: <ResetPasswordPage />,
        },
        {
          path: "/my-account",
          element: (
            <ProtectedRoute>
              <MyAccountPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/shop",
          element: <ShopPage />,
        },
        {
          path: "/product/:id",
          element: <ProductDetailPage />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
        },
        {
          path: "/wishlist",
          element: <WishlistPage />,
        },
        {
          path: "/orders",
          element: <OrdersPage />,
        },
        {
          path: "/order-success/:id",
          element: <OrderSuccessPage />,
        },
        {
          path: "/shipping",
          element: <ShippingPage />,
        },
        {
          path: "/payment-success",
          element: <PaymentStatusPage status="success" />,
        },
        {
          path: "/payment-cancel",
          element: <PaymentStatusPage status="cancel" />,
        },
        {
          path: "/payment-failure",
          element: <PaymentStatusPage status="failure" />,
        },
        {
          path: "/privacy",
          element: <PrivacyPage />,
        },
        {
          path: "/terms",
          element: <TermsPage />,
        },
        { path: "/legal", element: <LegalNoticePage /> },
        { path: "/faq", element: <FAQPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;

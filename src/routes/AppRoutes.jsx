import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layouts/Layout";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";
import ShopPage from "../pages/shop/ShopPage";

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
          path: "/about",
          element: <AboutPage/>
        },
        {
          path: "/login",
          element: <LoginPage/>
        },
        {
          path: "/signup",
          element: <SignupPage/>
        },
        {
          path: "/shop",
          element: <ShopPage/>
        }

      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;

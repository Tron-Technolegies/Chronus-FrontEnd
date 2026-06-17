import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n"; // Import i18n configuration
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import DirectionManager from "./components/layout/DirectionManager.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <WishlistProvider>
          <DirectionManager>
            <App />
          </DirectionManager>
        </WishlistProvider>
      </CartProvider>
    </QueryClientProvider>
  </StrictMode>,
);

import { useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// loadStripe must be called outside the component so the promise is stable
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export default function StripeProvider({ clientSecret, children }) {
  // Memoize options so the Elements context is NOT re-created on every render.
  // Re-creating it destroys the Stripe iframe, making the card field unresponsive.
  const options = useMemo(
    () => ({
      clientSecret,
      appearance: { theme: "stripe" },
    }),
    [clientSecret]
  );

  if (!clientSecret) return null;

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}

import { useState } from "react";

const GUEST_ID_KEY = "guest_id";

const generateGuestId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `guest-${Date.now()}`;
};

export function ensureGuestId() {
  let guestId = localStorage.getItem(GUEST_ID_KEY);
  if (!guestId) {
    guestId = generateGuestId();
    localStorage.setItem(GUEST_ID_KEY, guestId);
  }
  return guestId;
}

export function useGuestId() {
  const [guestId] = useState(() => ensureGuestId());

  return guestId;
}

"use client";

import { useEffect, useState } from "react";

const USER_EVENT = "auth:user-changed";

function readStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Treat a missing / non-object / empty object as "logged out" so consumers
    // can rely on a simple truthiness check ({} is truthy in JS, which was the
    // original bug that kept Dashboard + Logout visible when signed out).
    if (!parsed || typeof parsed !== "object" || Object.keys(parsed).length === 0) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function useStoredUser() {
  // Start as null so the first client render matches the server (which has no
  // localStorage). Reading localStorage during render would cause a hydration
  // mismatch once a user is stored. The effect below fills it in after mount.
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const syncUser = () => {
      setUserData(readStoredUser());
    };

    syncUser();
    window.addEventListener("storage", syncUser);
    window.addEventListener(USER_EVENT, syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
      window.removeEventListener(USER_EVENT, syncUser);
    };
  }, []);

  return [userData, setUserData];
}
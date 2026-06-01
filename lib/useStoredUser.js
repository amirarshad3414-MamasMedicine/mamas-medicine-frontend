"use client";

import { useEffect, useState } from "react";

const USER_EVENT = "auth:user-changed";

function readStoredUser() {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

export function useStoredUser() {
  const [userData, setUserData] = useState(() => readStoredUser());

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
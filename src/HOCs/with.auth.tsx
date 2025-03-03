"use client";

import { useAppSelector } from "@/redux/redux.hooks";
import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withAuth = (Child: NextComponentType<NextPageContext, any, {}>) => {
  const Component = () => {
    const auth = useAppSelector((s) => s.auth);
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!auth.isAuthenticated && !token) {
        router.push("/login");
      } else {
        setIsAuthorized(true);
      }
    }, [auth.isAuthenticated, router]);

    return isAuthorized ? <Child /> : null;
  };

  return Component;
};

export default withAuth;

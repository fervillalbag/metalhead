import React, { useEffect } from "react";
import { useRouter } from "next/router";

import NavbarDashboard from "@/components/admin/Navbar";
import useAuth from "@/hooks/useAuth";
import { isAuth, isUserNotFound } from "utils/actions";
import { getToken } from "utils/helpers";

const AdminHome: React.FC = () => {
  const router = useRouter();

  isUserNotFound();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.push("/admin/login");
      return;
    } else {
      isAuth();
    }
  }, []);

  const { user } = useAuth();

  return (
    <div className="flex">
      <NavbarDashboard />

      <div className="p-10 w-full h-screen overflow-y-auto no-scrollbar">
        <h1 className="text-3xl text-slate-600">Hello {user?.name}!</h1>
      </div>
    </div>
  );
};

export default AdminHome;

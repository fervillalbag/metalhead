import React from "react";

import NavbarDashboard from "@/components/admin/Navbar";

const AdminHome: React.FC = () => {
  return (
    <div className="flex">
      <NavbarDashboard />

      <div className="p-10 w-full">
        <h1 className="text-3xl">Hello Fernando!</h1>
      </div>
    </div>
  );
};

export default AdminHome;

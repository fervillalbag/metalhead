import React from "react";
import Link from "next/link";

const AdminHome: React.FC = () => {
  return (
    <div className="p-4">
      <h1>Admin Page</h1>

      <hr />

      <div className="py-4">
        <Link href="/admin/header">
          <a>Header</a>
        </Link>
      </div>

      <hr />

      <div className="py-4">
        <Link href="/admin/growth">
          <a>Growth</a>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;

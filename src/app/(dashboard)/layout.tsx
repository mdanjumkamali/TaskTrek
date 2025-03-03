import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";
import withAuth from "@/HOCs/with.auth";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed ">
        <Sidebar />
      </div>
      <main className="md:pl-72">{children}</main>
    </div>
  );
};

export default DashboardLayout;

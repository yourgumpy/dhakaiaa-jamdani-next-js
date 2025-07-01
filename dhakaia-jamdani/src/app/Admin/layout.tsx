import React from "react";
import ModernSidebar from "../components/Admin/ModernSidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <ModernSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
};

export default layout;
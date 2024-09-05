import React from "react";
import Sidebar from "../components/Admin/Sidebar";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-start">
      <div className="lg:block hidden">
        <Sidebar />
      </div>

      <main>{children}</main>
    </div>
  );
};

export default layout;

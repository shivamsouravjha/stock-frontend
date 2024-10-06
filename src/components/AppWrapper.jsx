import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppWrapper = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppWrapper;

import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 right-0 bg-white">
      <div className="container mx-auto py-3 px-2 flex justify-between">
        <div className="flex gap-2 items-center">
          <RocketLaunchIcon color="#2f36f7" width={44} height={44} />
          <h1>StockSprint</h1>
        </div>
        <div className="flex items-center gap-3">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "px-3 py-1 rounded-md text-sm bg-secondary text-white hover:opacity-75"
                : "px-3 py-1 hover:bg-slate-100 rounded-md text-sm"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/agreement"}
            className="px-3 py-1 hover:bg-slate-100 rounded-md text-sm"
          >
            Agreement
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

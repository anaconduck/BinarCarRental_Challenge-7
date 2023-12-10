import React from "react";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <div
      className={`sidebar w-[290px] flex flex-col gap-y-2 ${
        isOpen ? "" : "hidden"
      }`}
    >
      {location.pathname == "/" ? (
        <>
          <Link to={"/"}
            className=" h-10 w-full hover:bg-indigo-200 mt-5 text-gray-400 font-bold text-base py-3 pl-6"
          >
            DASHBOARD
          </Link> 

          <Link to={"/"}
            className=" h-10 w-full hover:bg-indigo-200 font-bold text-sm py-3 pl-6"
          >
            Dashboard
          </Link>
        </>
      ) : (

        <>
          <Link to={"/car"}
            className=" h-10 w-full hover:bg-indigo-200 mt-5 text-gray-400 font-bold text-sm py-3 pl-6"
          >
            CARS
          </Link>
          <Link to={"/car"}
            className=" h-10 w-full hover:bg-indigo-200 font-bold text-sm py-3 pl-6"
          >
            List Car
          </Link>
        </>
      )}
    </div>
  );
};

export default Sidebar;
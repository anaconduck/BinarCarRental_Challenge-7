import { HomeIcon, TruckIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Sidenav() {
  return (
    <div className="flex flex-col gap-y-5 bg-blue-900 w-[70px] items-center min-h-screen  ">
      <div className="logo h-9 w-9 bg-indigo-200 mt-4 mb-1"></div>

      <Link to="/"
        className="grid justify-center font-light text-xs content-center"
      >
        <div className="grid justify-center bold text-white">
          <HomeIcon className="h-6 w-full" />
          Dashboard
        </div>
        
      </Link>
      <Link to="/car"
        className="grid justify-center font-light text-xs content-center"
      >
        <div className="grid justify-center text-white">
          <TruckIcon className="h-6 w-full" />
          Cars
        </div>

      </Link>
    </div>
  );
}
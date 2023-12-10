import {
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
  
  interface NavbarProps {
    isLoggedIn: boolean;
    onLogout: () => void;
  }
  
  export default function Navbar({
    isLoggedIn,
    onLogout,
  }: NavbarProps) {

    return (
      <div className="navbar flex shadow items-center p-4 relative  ">
        <div className="flex justify-around w-1/6 md:justify-between ">
          <img src="https://i.ibb.co/17Y3jJC/kotak.png" alt="kotak"/>
        </div>
  
        <div className="flex justify-end w-5/6">
          
        <form>
          <div className="relative flex">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 ">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full h-9 px-3 py-5 ps-10 text-sm border border-gray-400 rounded-sm "
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="inline-flex bg-transparent hover:bg-blue-900 text-blue-800 font-bold hover:text-white border border-blue-800 hover:border-transparent rounded-sm  w-[71px] h-9 px-3 py-5 items-center justify-center"
            >
              Search
            </button>
          </div>
        </form>
  
          {isLoggedIn ? (
            <button
              className="ml-4 me-2 py-2 px-3 bg-blue-900 text-white rounded-lg"
              onClick={onLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button 
              className="ml-4 me-2 py-2 px-3 bg-blue-900 text-white rounded-lg">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    );
  }
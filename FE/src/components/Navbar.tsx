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
          
          <img src="https://i.ibb.co/2WgLPjR/Search.png" alt="search"/>
  
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
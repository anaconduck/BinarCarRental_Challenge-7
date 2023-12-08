import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";

interface UserResponse {
  id: number;
  name: string;
  email: string;
  profile_picture_file?: string;
  password: string;
  role?: string;
}

interface CarResponse {
  id: number;
  car_name: string;
  car_rentperday: number;
  car_size: string;
  car_img?: string;
  created_by: UserResponse;
  updated_by: UserResponse;
  deleted_by: UserResponse;
  create_at?: Date;
  update_at?: Date;
  delete_at?: Date;
}

const cars_api_base_url = "http://localhost:8081";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    //akan di running pertama kali saat halaman di load
    const fetchCars = async () => {
      const response = await fetch(cars_api_base_url + "/api/cars");
      const responseJSON = await response.json();

      console.log("response", responseJSON);
      setCars(responseJSON.data.cars);
    };

    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    fetchCars();
    checkIsLoggedIn();
  }, []);


  const logoutHandler = () => {
    localStorage.removeItem("access_token");

    setIsLoggedIn(false);
  };
  return (
    <div className="flex min-h-fit">
      <Sidenav />

      <div className={`flex flex-col w-full  ${isSidebarOpen}`}>
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={logoutHandler}
        />

        <div className="main-content flex h-full ">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="content grid w-full bg-gray-100 pl-6 ">
            <div className="flex items-center justify-between mt-8 me-6">
              <h1 className="font-bold text-xl">Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import moment from "moment";

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
  const [isSidebarOpen] = useState(true);

  useEffect(() => {
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
          <Sidebar isOpen={isSidebarOpen} />
          <div className="content grid w-full bg-gray-100 pl-6 pt-11">
          <div className="flex items-center mb-4">
              <h1 className="font-bold text-xl">Dashboard</h1>
          </div>
          <div className="grid">
              <div className=" flex py-2 align-middle  max-w-fit ">
                <div className="shadow overflow-hidden h-fit border-b border-gray-200 sm:rounded-lg">
                <h1 className="font bold mt-5 mb-8">List Order</h1>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Create At
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Update At
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Start Rent
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Finish Rent
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cars.map((car: CarResponse) => (
                        <tr key={car.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {car.car_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {car.car_size}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {car.car_rentperday}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {moment(car.create_at).format(
                                    "DD/MM/YYYY HH:mm:ss a"
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {moment(car.update_at).format(
                                    "DD/MM/YYYY HH:mm:ss a"
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            -
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            -
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h1 className="font bold mt-8 mb-8">List Car</h1>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Category
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Create At
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Update At
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Start Rent
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-bold"
                        >
                          Finish Rent
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {cars.map((car: CarResponse) => (
                        <tr key={car.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {car.car_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {car.car_size}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {car.car_rentperday}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {moment(car.create_at).format(
                                    "DD/MM/YYYY HH:mm:ss a"
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-left">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {moment(car.update_at).format(
                                    "DD/MM/YYYY HH:mm:ss a"
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            -
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            -
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
}
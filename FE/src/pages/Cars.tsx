import { useEffect, useState } from "react";
import {
  ClockIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import Alert from "../components/Alert";
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
  const [showAlert, setShowAlert] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
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

  const deleteCar = async (carId) => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        console.error("User not logged in");
        return;
      }
      setCarToDelete(carId);
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting car:", error.message);
    }
  };
  
  const handleConfirmation = async (confirmed: boolean) => {
    setShowAlert(false);

    if (confirmed) {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          console.error("User not logged in");
          return;
        }
        const response = await fetch(
          cars_api_base_url + "/api/cars/" + carToDelete,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          setCars((prevCars) =>
            prevCars.filter((car: CarResponse) => car.id !== carToDelete)
          );
        } else {
          console.error("Failed to delete car:", response.statusText);
        }
      } catch (error) {
        console.error("Error deleting car:", error.message);
      }
    }
  };

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

        <div className="main-content flex h-full  ">
          <Sidebar isOpen={isSidebarOpen}/>
          <div className="content grid w-full  bg-gray-100 pl-6 ">
            <div className="flex items-center justify-between mt-11 me-6">
              <h1 className="font-bold text-xl">List car</h1>
              <Link to="/create-car">
                <button className="bg-blue-900 py-2 px-4 text-white">
                 + Add New Car 
                </button>
              </Link>
            </div>

            <div
              className="card-container mt-[50px] flex gap-y-4 gap-x-4 flex-wrap justify-start"
            >
              {!cars.length && (
                 <div>Data kosong</div>
              )}
              {cars.map((car: CarResponse) => (
                <div
                  key={car.id}
                  className="card flex flex-col shadow bg-white border-0  text-sm p-5  rounded-xl  w-[275px]">
                  <img
                    className="w-100 h-100  "
                    src={car.car_img}
                  />
                  <div className="card-body flex flex-col gap-2 ">
                    <p className="card-title font-semibold ">{car.car_name} / {car.car_size}</p>
                    <p className="font-semibold">
                      Rp {car.car_rentperday} / hari
                    </p>

                    {car.create_at && (
                      <div className="flex gap-2">
                        <ClockIcon className="h-5 w-5 text-gray-300" />
                        <p className="font-light text-sm">
                          Created at {moment(car.create_at).format(
                                    "DD/MM/YYYY, HH:mm ")}
                        </p>
                      </div>
                    )}

                    <div className="card-button mt-4 flex gap-2">
                      <button
                        className="inline-flex hover:bg-red-500 text-red-400 font-bold hover:text-white border border-red-500 rounded w-[143.5px] h-12 items-center justify-center"
                        onClick={() => deleteCar(car.id)}
                      >
                        <TrashIcon className="h-4 w-6 " />
                        Delete
                      </button>
                      <button className=" bg-green-500 hover:bg-green-700 text-white  rounded w-[143.5px] h-12 items-center justify-center">
                        <Link to={`/update-car/${car.id}`}
                          className="inline-flex font-bold">
                          <PencilSquareIcon className="h-4 w-6" />
                          Edit
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showAlert && (
          <Alert
            onConfirm={() => handleConfirmation(true)}
            onCancel={() => handleConfirmation(false)}
          />
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const tweets_api_base_url = "http://localhost:8081";

export default function UpdateCar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { carId } = useParams();
  const [car_name, setCarName] = useState("");
  const [car_size, setCarSize] = useState("");
  const [car_rentperday, setCarRentPerDay] = useState("");
  const [car_img, setCarImg] = useState(null);
  const [isSidebarOpen] = useState(true);

  useEffect(() => {
    const checkIsLoggedIn = () => {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    };

    checkIsLoggedIn();
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setCarImg(files[0]);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("access_token");

    setIsLoggedIn(false);
  };

  return (
    <div className=" flex  min-h-fit">
      <Sidenav />
      <div className={`flex flex-col w-full min-h-screen ${isSidebarOpen}`}>
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={logoutHandler}
        />
        <div className="main-content flex h-full">
          <Sidebar isOpen={isSidebarOpen}/>
          <div className="form-input flex flex-col gap-y-4 items-start w-full bg-gray-100 pl-6">
            <div className="flex items-center justify-between mt-[40px] mb-4">
              <p className="font-bold text-xl"> Update Car</p>
            </div>
            <div className="form p-7 bg-white rounded-sm w-full ">
              <form className="w-full max-w-sm">
              <div className="mb-5 mt-1 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className=""
                      htmlFor="inline-full-name">
                      Nama
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className=" appearance-none border-[1px] py-1 px-3 border-black rounded text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[350px]"
                      id="inline-full-name"
                      type="text"
                      value={car_name}
                      onChange={({ target }) => {
                        setCarName(target.value);
                      }}
                      placeholder="Placeholder"
                    />
                  </div>
                </div>

                <div className="mb-5 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className=""
                      htmlFor="inline-full-name"
                    >
                      Ukuran
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none border-[1px] py-1 px-3 border-black rounded  text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[350px]"
                      id="inline-full-name"
                      type="text"
                      value={car_size}
                      onChange={({ target }) => {
                        setCarSize(target.value);
                      }}
                      placeholder="Placeholder"
                    />
                  </div>
                </div>

                <div className="mb-5 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className=""
                      htmlFor="inline-full-name"
                    >
                      Harga
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none border-[1px] py-1 px-3 border-black rounded text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[350px]"
                      id="inline-full-name"
                      type="number"
                      value={car_rentperday}
                      onChange={({ target }) => {
                        setCarRentPerDay(target.value);
                      }}
                      placeholder="Placeholder"
                    />
                  </div>
                </div>

                <div className="mb-1 flex flex-row">
                  <div className="md:w-1/3">
                    <label
                      className=""
                      htmlFor="inline-full-name"
                    >
                      Foto
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="appearance-none border-[1px] py-1 px-3 border-black rounded text-black leading-tight focus:outline-none focus:bg-white focus:border-gray-500 w-[350px]"
                      id="inline-full-name"
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="button-contain flex gap-x-4 items-end h-full mt-[100px] mb-10">
              <button
                className="inline-flex bg-transparent hover:bg-blue-900 text-blue-900 font-bold hover:text-white border border-blue-800 hover:border-transparent rounded-sm  w-[71px] h-9 px-3 py-2 items-center justify-center "
                typeof="button"
                onClick={async (e) => {
                  e.preventDefault();

                  navigate("/car");
                }}
              >
                Cancel
              </button>
              <button
                className="inline-flex  bg-blue-900 hover:bg-gray-300 text-white font-bold hover:text-white border border-blue-800 hover:border-gray-300 rounded-sm  w-[71px] h-9 px-3 py-2 items-center justify-center "
                typeof="button"
                onClick={async (e) => {
                  e.preventDefault();

                  const formData = new FormData();
                  formData.append("car_name", car_name);
                  formData.append("car_size", car_size);
                  formData.append("car_rentperday", car_rentperday);
                  if (car_img) {
                    formData.append("car_img", car_img);
                  }

                  const response = await fetch(
                    tweets_api_base_url + "/api/cars/" + carId,
                    {
                      method: "PATCH",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "access_token"
                        )}`,
                      },
                      body: formData,
                    }
                  );

                  const responseJson = await response.json();

                  if (response.status !== 200) {
                    alert("error: " + responseJson.message);
                  }

                  navigate("/car");
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
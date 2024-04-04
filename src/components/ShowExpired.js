import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


function ShowExpired() {
  const location = useLocation();
  const [details, setDetails] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/member/" + location.state);
      const data = await response.json();
      setDetails(data);
    };
    fetchMember();
  }, []);

  const imageUrl = `/uploads/${details.img}`;

  return (
    <div id="main-trainer" className="">
      <div class="p-4 sm:ml-64 mt-20">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <i>
            <Link to="/expired">
              <img
                className="w-7 h-7 "
                src="https://cdn-icons-png.flaticon.com/512/786/786197.png"
                alt="back"
              />
            </Link>
          </i>
          <link
            rel="stylesheet"
            href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
          />
          <link
            rel="stylesheet"
            href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
          />

          <div className="flex items-center justify-center">
            <main className=" w-96">
              <section className=" h-80"></section>
              <section className="relative">
                <div className="container mx-auto px-4">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div className="px-6">
                     
                      <div className="flex justify-center">
                        <div class="photo-wrapper p-2 w-40 h-40 rounded-full ">
                          <div class="w-40 h-40 rounded-full overflow-hidden">
                            <img
                              class="w-full h-full object-cover"
                              src={imageUrl}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-12 mb-12">
                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                          {details.name}
                        </h3>
                        <div className="text-lg leading-normal mt-0 mb-2 text-gray-700 font-bold ">
                          <span>Phone : </span>
                          {details.phone}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowExpired;

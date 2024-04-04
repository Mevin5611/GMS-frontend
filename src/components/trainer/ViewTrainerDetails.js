import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { format } from "date-fns";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

function ViewTrainerDetails() {
  const [trainer, setTrainer] = useState("");
  const [center, setCenter] = useState("");

  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [idjoin, setIdjoin] = useState(new Date());
 

  useEffect(() => {
    const fetchTrainer = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/trainer/" + location.state);
      const json = await response.json();

      if (response.ok) {
       
        setIdjoin(json.joindate);
        setTrainer(json);
      }
    };

    const fetchCenter = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/center/" + trainer.center, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setCenter(json);
      }
    };

    if (user) {
      fetchTrainer();
      fetchCenter();
    }
    const loading = async () => {
      if (
        document.getElementById("main-trainer").classList.contains("hidden")
      ) {
        setTimeout(() => {
          document.getElementById("main-trainer").classList.remove("hidden");
        }, 1000);
      }
    };

    loading();
  }, [location.state, trainer.center, user]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${trainer.name}?`
    );
    if (confirmDelete) {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/trainer/" + trainer._id, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        navigate("/trainers");
      }
    }
  };
  const handleEdit = () => {
    navigate("/edittrainer", { state: trainer });
  };
  const imageUrl = `/uploads/${trainer.img}`;

  return (
    <div id="main-trainer" className="">
      <div class="p-4 sm:ml-64 mt-20">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 ">
          <i>
            <Link to="/trainers">
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
                    <div className="w-full flex justify-end md:mt-4 ">
                            <DriveFileRenameOutlineRoundedIcon
                              onClick={handleEdit}
                              className="w-5 h-5 opacity-50 hover:opacity-100"
                            />
                            <DeleteRoundedIcon
                              onClick={handleDelete}
                              className="w-5 ms-5 h-5 opacity-50 hover:opacity-100"
                            />
                          </div>
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
                          {trainer.name}
                        </h3>
                        <div className="mb-2 text-gray-700 mt-2 font-semibold">
                          <i className="fas fa-birthday-cake mr-2 text-lg text-blueGray-400"></i>
                          <span className="text-sm font-bold">
                            {trainer.dob}
                          </span>
                        </div>
                        <div className="text-sm leading-normal mt-0 mb-2 text-gray-700 font-bold uppercase">
                          <i className="fas fa-map-marked mr-2 text-base text-blueGray-400"></i>
                          {center && center.address}
                        </div>
                        <div className="mb-2 text-gray-700">
                          <span className="text-base  font-bold">
                            Join Date :{" "}
                          </span>
                          <span className="text-sm  font-bold">
                            {format(new Date(idjoin), "dd-MM-yyyy")}{" "}
                          </span>
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

export default ViewTrainerDetails;

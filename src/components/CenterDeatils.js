import React from "react";
import { useNavigate } from "react-router-dom";
import { useCenterContext } from "../hooks/useCenterContext";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const CenterDeatils = ({ center }) => {
  const { dispatch } = useCenterContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${center.name}?`
    );
    if (confirmDelete) {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/center/" + center._id, {
        method: "DELETE",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_CENTER", payload: json });
      }
    }
  };
  const editCenter = () => {
    navigate("/editcenter", { state: center });
  };

  return (
    <div>

      <div class="block col-span-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
        <div className="flex items-center justify-between">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {center.name}
          </h5>
          <div className="">
            <DriveFileRenameOutlineRoundedIcon onClick={editCenter} />
            <DeleteRoundedIcon onClick={handleDelete} className="ms-2" />
          </div>
        </div>
        <p class="font-medium text-gray-700 ">
          {center.status}
        </p>
        <p class="font-medium text-gray-700 ">
          {center.address}
        </p>
        <p class="font-medium text-gray-700 ">
          {center.state}
        </p>
        <p class="font-medium text-gray-700 ">
          {center.country}
        </p>
      </div>
    </div>
  );
};

export default CenterDeatils;

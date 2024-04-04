import React, { useState, useEffect} from "react";
import { Link, useLocation } from "react-router-dom";
import { format} from 'date-fns'


function Member() {
  const location = useLocation();
  const [details, setDetails] =useState('')
  
  const [iddob,setIddob]=useState(new Date())
  const [idjoin,setIdjoin]=useState(new Date())
  const [idstart,setIdstart]=useState(new Date())
  const [idexpire,setIdexpire]=useState(new Date())
  
  

  useEffect(() => {
    const fetchMember = async () => {
      const response = await fetch("https://gms-backend-cj6n.onrender.com/api/member/" + location.state);
      const data = await response.json();
      setDetails(data);
      setIddob(data.dob)
      setIdjoin(data.joindate)
      setIdstart(data.startdate)
      setIdexpire(data.expiredate)
      
    };
    fetchMember();
  },[]);

  const imageUrl = `/uploads/${details.img}`;

  return (
    <div>
      <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg  mt-14">
          <i className="justif">
            <Link to="/members">
              <img
                className="w-7 h-7 "
                src="https://cdn-icons-png.flaticon.com/512/786/786197.png"
                alt="back"
              />
            </Link>
          </i>

          <div className="w-full flex justify-center">
            <div
              role="status"
              class="w-96 p-4 border border-gray-200 rounded shadow  md:p-6 "
            >
             <div className=" w-full flex justify-center">
             <div class="w-40 h-40 rounded-full overflow-hidden">
                <img
                  class="w-full h-full object-cover"
                  src={imageUrl}
                  alt=""
                />
              </div>
             </div>

              <div class="rounded-full  w-48 mb-2.5 ">
                <span className="font-bold">Name :</span>
                <span className="ps-1 font-semibold">{details.name}</span>
              </div>
              <div class=" rounded-full  mb-2.5 ">
                <span className="font-bold">Email :</span>
                <span className="ps-1 font-semibold">{details.email}</span>
              </div>
              <div class=" rounded-full  mb-2.5 ">
                <span className="font-bold">Dob :</span>
                <span className="ps-1 font-semibold">{details.dob}</span>
              </div>
              <div class=" rounded-full  mb-2.5  ">
                <span className="font-bold">Gender :</span>
                <span className="ps-1 font-semibold">{details.gender}</span>
              </div>
              <div class=" rounded-full  mb-2.5 ">
                <span className="font-bold">Joindate :</span>
                <span className="ps-1 font-semibold">{format ( new Date(idjoin), 'dd-MM-yyyy')}</span>
              </div>
              <div class=" rounded-full  mb-2.5 ">
                <span className="font-bold">Martialstatus : </span>
                <span className="ps-1 font-semibold">
                  {details.martialstatus}
                </span>
              </div>
              <div class=" rounded-full  mb-2.5 ">
                <span className="font-bold">Package days : </span>
                <span className="ps-1 font-semibold">{details.pack} days</span>
              </div>
              <div class=" rounded-full  mb-2.5 ">
                <span className="font-bold">Startdate : </span>
                <span className="ps-1 font-semibold">{format ( new Date(idstart), 'dd-MM-yyyy')}</span>
              </div>
              <div class=" rounded-full  mb-2.5 ">
                <span className="font-bold">Expiredate : </span>
                <span className="ps-1 font-semibold">{format ( new Date(idexpire), 'dd-MM-yyyy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;

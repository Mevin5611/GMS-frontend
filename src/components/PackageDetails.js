import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {usePackageContext} from '../hooks/usePackageContext'
import { useAuthContext } from '../hooks/useAuthContext'
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


function PackageDetails({Package}) {
   const {dispatch} =usePackageContext()
   const {user}=useAuthContext()
   const navigate=useNavigate()

    const handleDelete = async () => {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${Package.name}?`
      );
      if (confirmDelete){
        const response = await fetch('https://gms-backend-cj6n.onrender.com/api/package/' + Package._id, {
          method: 'DELETE',
          headers:{
              'Authorization':`Bearer ${user.token}`
            }
      })
      const json= await response.json()
      if(response.ok){
          dispatch({type:'DELETE_PACKAGE',payload :json})
      }
      }

    }
    const packageEdit=()=>{
        navigate('/editpackage',{state:Package})
    }

  return (
    

    <div>
      <div class="block col-span-1 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
        <div className="flex items-center justify-between">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
          {Package.name}
          </h5>
          <div className="">
            <DriveFileRenameOutlineRoundedIcon onClick={packageEdit} />
            <DeleteRoundedIcon onClick={handleDelete} className="ms-2" />
          </div>
        </div>
        
        <p class="font-medium text-gray-700 ">
        <span className=' font-bold'>Days : </span>{Package.days} 
        </p>
        <p class="font-medium text-gray-700 ">
        <span className=' font-bold'>Price : </span>{Package.price} 
        </p>
        <p class="font-medium text-gray-700 ">
        <span className=' font-bold'>Center : </span>{Package.center}
        </p>
        <p class="font-medium text-gray-700 ">
        <span className=' font-bold'>Training : </span>{Package.trainingtype}
        </p>
        
      </div>
      </div>
      
    
  )
}

export default PackageDetails

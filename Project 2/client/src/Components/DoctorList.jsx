import React, { useEffect } from 'react'
import DoctorCard from './DoctorCard'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




function DoctorList({doctor}) {


const token =useSelector((state)=>{return state.auth.token})
const navigate=useNavigate();

useEffect(()=>{
  if(!token){
    navigate("/")
  }
})

  return (
    <div>
      <div className="d-flex flex-start  flex-wrap gap-4  " style={{marginTop:"7rem",marginBottom:"5rem"}}>
      {doctor?.filter((docs)=> docs.isApproved=="approved").map((doc, index) => (
        <div className="d-flex  mx-auto  " key={index}>
          <DoctorCard doctor={doc} />
        </div>
      ))}
    </div>
    </div>
  )
}

export default DoctorList

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const StaffEntry = () => {
    const [staffid,setStaffId] = useState('')
    const [name,setName] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            axios('http://127.0.0.1:8000/api/staff/',
                {method: 'POST',    
                headers: {
                    "Content-Type": 'application/json'},
                data: JSON.stringify({staffid:staffid,
                    name:name}),
            });
        navigate('/stafflist')
        }
        catch(error){
            console.log("Error Occured");
        }
    }
  return (
    <div className='container'>
            <h1>
            Staff Entry:
            </h1>
            <div>
            <form onSubmit={handleSubmit}>
                <label>Staff Id:
                    <input type='text' name="staff-id" value={staffid} onChange={(e)=>setStaffId(e.target.value)}/>
                </label>
                <label>Staff Name:
                    <input type='text' name="staff-name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </label>
                <button type='submit'> Submit </button>            
                </form>
            </div>
    </div>
  )
}

export default StaffEntry
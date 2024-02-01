import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './StaffEntry.css'

const StaffEntry = () => {
    const [staffid,setStaffId] = useState('')
    const [name,setName] = useState('')
    const [des,setDes] = useState('')
    const desig= ['HOD','Professor','Associate Professor','Assistant Professor','Computer Assistant','Lab-Techincian']
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        try{
            axios('http://127.0.0.1:8000/api/staff/',
                {method: 'POST',    
                headers: {
                    "Content-Type": 'application/json'},
                data: JSON.stringify({staffid:staffid,
                    name:name,
                    designation:des}),
            });
        navigate('/stafflist')
        }
        catch(error){
            console.log("Error Occured");
        }
    }
  return (
    <>
           
            <div className='staff-form'>
            <form onSubmit={handleSubmit}>
            <h1>
            Staff Entry:
            </h1>
                <label>Staff Id:
                    <input type='text' name="staff-id" value={staffid} onChange={(e)=>setStaffId(e.target.value)}/>
                </label>
                <label>Staff Name:
                    <input type='text' name="staff-name" value={name} onChange={(e)=>setName(e.target.value)}/>
                </label>
                <label for='desgid'>Day :</label>
                    <select id='desgid' value={des} onChange={(e)=>setDes(e.target.value)}>
                        <option>Select</option>
                        {desig.map((des,index)=>{
                        return (<option value={des} id={index} key={index}>{des}</option>)        
                        })}
                    </select>
                <button className='staff-button' type='submit'> Submit </button>            
                </form>
            </div>
    </>
  )
}

export default StaffEntry
import React, { useState } from 'react'
import axios from 'axios'
import './StaffEngaged.css'
const StaffEngaged = () => {
  
  const [selectedDate,setSelectedDate] = useState('')
  const [responseData,setResponseData] = useState([])

  function convertTo12HourFormat(time24){
    const [hours,minutes] = time24.split(':')
    const hours12 = hours > 12 ? hours - 12 : hours
    const period = hours >= 12 ? 'pm' : 'am'
    return `${hours12}:${minutes} ${period}` 

  }

  function convertToLocaleDate(dateu){
    const [y,m,d] = dateu.split('-')
    return `${d}-${m}-${y}`
  }


  const getStaffEngagedData = async (e) =>{
    e.preventDefault()
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/timetable/staff_engaged/?date=${selectedDate}`)
        setResponseData(response.data)
        console.log(response.data)
      }
    
      catch(error){
        console.error("Error Fetching data",error)
      }
  }

  return (
    <>
    <div className='staffengaged'>
    <div className='engaged-form'>
      <form onSubmit={getStaffEngagedData}>
      <h1>DateWise Staff Engaged List: </h1>
      <input type="date" 
      value={selectedDate} 
      onChange={(e)=>setSelectedDate(e.target.value)}></input>
      <button type='submit'>Get</button>
      </form>
      </div>
      <div className='engaged-table'>
        
        <table className="table table-light table-striped">
  <thead>
    <tr>
      <th scope="col">SL. No.</th>
      <th scope="col">Staff Name</th>
      <th scope="col">Week Day</th>
      <th scope="col">Starting Time</th>
      <th scope="col">Ending Time</th>
      <th scope="col">Date of Start</th>
    </tr>
  </thead>
  <tbody>
  {responseData.map((list,index)=>{
    return (
       <tr key={index}>
        <td>{index+1}</td>
        <td>{list.staff}</td>
        <td>{list.day}</td>
        <td>{convertTo12HourFormat(list.start_time)}</td>
        <td>{convertTo12HourFormat(list.end_time)}</td>
        <td>{convertToLocaleDate(list.start_date)}</td>
       </tr>) 
    })}
  </tbody>
</table>
      </div>
      </div>
    </>
  )
}

export default StaffEngaged
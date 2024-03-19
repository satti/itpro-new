import React, { useState } from 'react'
import axios from 'axios'
import './StaffEngaged.css'

const StaffEngaged = () => {
  
  const [selectedDate,setSelectedDate] = useState('')
  const [responseData,setResponseData] = useState([])

  let timeSlots = ['09:40-10:40','10:40-11:40','11:40-12:40','12:40-13:20','13:20-14:20','14:20-15:20','15:20-16:20']

  // function convertTo12HourFormat(time24){
  //   const [hours,minutes] = time24.split(':')
  //   const hours12 = hours > 12 ? hours - 12 : hours
  //   const period = hours >= 12 ? 'pm' : 'am'
  //   return `${hours12}:${minutes} ${period}` 

  // }

  const getStaffEngagedData = async (e) =>{
    e.preventDefault()
      try{
        const response = await axios.get(`http://127.0.0.1:8000/api/timetable/staff_engaged/?date=${selectedDate}`)
        let schedules = response.data
        const groupedSchedules = schedules.reduce((acc, schedule) => {
          const key = `${schedule.staff}_${schedule.day}`;
          if (!acc[key]) {
            acc[key] = { staff: schedule.staff, day: schedule.day, staff_name: schedule.staff_name,timings: [] };
          }
          acc[key].timings.push({ start_time: schedule.start_time, end_time: schedule.end_time });
          return acc;
        }, {});
        
        // Convert grouped schedules to the final format
        const result = Object.values(groupedSchedules).map((group) => {
          group.timings.sort((a, b) => a.start_time.localeCompare(b.start_time));
          return group;
        });
        
        console.log(result);
        setResponseData(result)
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
        <table className="table table-bordered table-light table-striped w-75 center">
        <thead>
          <th>Name of the Staff</th>
        {timeSlots.map((time)=>{
          return <th>{time}</th>
        })}
        </thead>
        <tbody>
        {responseData.map((data, index) => (
      <tr key={index}>
        <td>{data.staff_name}</td>
        {timeSlots.map((ts, index) => {
          const matchingTiming = data.timings.find((d) => d.start_time === ts.split("-")[0]);
          if (matchingTiming) {
            const colSpan = Math.ceil((parseInt(matchingTiming.end_time.split(":")[0]) - parseInt(matchingTiming.start_time.split(":")[0])));
            return <td key={index} colSpan={colSpan}>{matchingTiming.start_time}</td>;
          } else {
            return <td key={index}>-</td>;
          }
        })}
      </tr>
    ))}
        </tbody>

      </table>  
    </div>
    </>
  )
}

export default StaffEngaged
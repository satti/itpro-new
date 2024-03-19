import React, { useState } from 'react'
import axios from 'axios'
import './StaffEngaged.css'
import timetableData from './timetable.js'

const StaffEngaged = () => {
  
  const [selectedDate,setSelectedDate] = useState('')
  const [responseData,setResponseData] = useState([])

  let timeSlots = ['9:40','10:40','11:40','12:40','1:20','2:20','3:20','4:20']

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
        setResponseData(timetableData)
        console.log(timetableData)
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
        {timetableData.map((staffEntry) => (
        <div key={staffEntry.staff.staffid}>
          <h2>{staffEntry.staff.name}'s Timetable</h2>
          <table className='table table-striped w-75 center table-light table-bordered' >
            <thead>
              <tr>
                <th>Day</th>
                {timeSlots.map((timeSlot) => (
                  <th key={timeSlot}>{timeSlot}</th>
                ))}
                {/* Add other table headers as needed */}
              </tr>
            </thead>
            <tbody>
              {Object.entries(staffEntry.timetable).map(([day, entries]) => (
                <tr key={`${staffEntry.staff.staffid}-${day}`}>
                  <td>{day}</td>
                  {timeSlots.map((timeSlot, index) => {
                    const matchingEntry = entries.find(
                      (entry) => entry.start_time === timeSlot
                    );

                    if (matchingEntry) {
                      // If an entry matches the current time slot
                      const colSpan = entries.findIndex(
                        (entry) => entry.start_time !== timeSlot
                      );
                      // colSpan will be the number of continuous entries
                      return (
                        <td key={index} colSpan={colSpan + 1}>
                          {`${matchingEntry.start_time} - ${matchingEntry.end_time}`}
                        </td>
                      );
                    } else {
                      // If no entry matches, render an empty cell
                      return <td key={index}></td>;
                    }
                  })}
                  {/* Add other table cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>))}
        </div>
    </>
  )
}

export default StaffEngaged
import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
const TimetableList = () => {
        const [lists,setLists] = useState([])
    useEffect(()=>{
        getStaffList();
    },[])
    
    let getStaffList = async () => {
        let response = await axios.get('http://127.0.0.1:8000/api/timetable/')
        setLists(response.data)
    }

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
      return (
        <div className="container">
            <h1>Timetable List: </h1>
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
      {lists.map((list,index)=>{
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
  )
}

export default TimetableList
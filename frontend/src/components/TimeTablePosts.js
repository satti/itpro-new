import React from 'react'
import axios from 'axios';
const TimeTablePosts = ({lists,currentPage,getStaffList}) => {

    const deleteTimetable = async (id) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this record');
        if(userConfirmed){
        try{
          console.log('id value',typeof(id));
        let res = await axios.delete(`http://127.0.0.1:8000/api/timetable/${id}`)
        alert(`record is deleted successfully ${res.data}`)
        getStaffList()
      }catch(error){
        console.error('Error deleting record', error)
        alert('Error deleting the record, please try again')
      }
        }
        else{
          alert('Deletion cancelled!')
        }
      }  
      function convertToLocaleDate(dateu){
        const [y,m,d] = dateu.split('-')
        return `${d}-${m}-${y}`
      }
      function convertTo12HourFormat(time24){
        const [hours,minutes] = time24.split(':')
        const hours12 = hours > 12 ? hours - 12 : hours
        const period = hours >= 12 ? 'pm' : 'am'
        return `${hours12}:${minutes} ${period}` 
      }

  return (
    <div>
        <table className="table table-light table-striped w-75 center">
      <thead>
        <tr>
          <th scope="col">SL. No.</th>
          <th scope="col">Staff Name</th>
          <th scope="col">Week Day</th>
          <th scope="col">Starting Time</th>
          <th scope="col">Ending Time</th>
          <th scope="col">Date of Start</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
      {lists.map((list,index)=>{
        return (
           <tr key={index}>
            <td>{index+currentPage+1}</td>
            <td>{list.staff}</td>
            <td>{list.day}</td>
            <td>{convertTo12HourFormat(list.start_time)}</td>
            <td>{convertTo12HourFormat(list.end_time)}</td>
            <td>{convertToLocaleDate(list.start_date)}</td>
            <td><button className='btn btn-danger btn-sm'
                onClick={()=>deleteTimetable(list.id)}>delete</button></td>

           </tr>) 
        })}
      </tbody>
    </table>
    </div>
  )
}

export default TimeTablePosts
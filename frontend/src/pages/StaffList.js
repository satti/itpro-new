import React, { useEffect, useState } from 'react'
import axios from 'axios'
const StaffList = () => {
    const [lists,setLists] = useState([])
useEffect(()=>{
    getStaffList();
},[])

let getStaffList = async () => {
    let response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setLists(response.data)
}
  return (
    <div className="container">
        <h1>Staff List: </h1>
        <table className="table table-light table-striped">
  <thead>
    <tr>
      <th scope="col">SL. No.</th>
      <th scope="col">Staff Id</th>
      <th scope="col">Staff Name:</th>
    </tr>
  </thead>
  <tbody>
  {lists.map((list,index)=>{
    return (
       <tr key={index}>
        <td>{index+1}</td>
        <td>{list.staffid}</td>
        <td>{list.name}</td>
       </tr>) 
    })}
  </tbody>
</table>
    </div>
  )
}

export default StaffList
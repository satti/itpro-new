import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';
const StaffList = () => {
    const [lists,setLists] = useState([])
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [editingStaffId, setEditingStaffId] = useState(null);
useEffect(()=>{
    getStaffList();
},[])
let getStaffList = async () => {
  try{
    let response = await axios.get('http://127.0.0.1:8000/api/staff/')
    setLists(response.data)
  }
  catch (error){
    console.error('Error fetching staff list', error);
    alert('Error fetching staff list. Please try again.');
  }
}

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = lists.slice(indexOfFirstPost,indexOfLastPost)

const paginate = pageNumber => setCurrentPage(pageNumber)



  return (
    <div className="container">
        <h1>Staff List: </h1>
        <Posts 
        lists={currentPosts}
        currentPage={indexOfFirstPost}
        getStaffList={getStaffList}
        setEditingStaffId={setEditingStaffId}
        editingStaffId={editingStaffId}
        setLists={setLists}
        />
        <Pagination 
        postsPerpage={postsPerPage}
        totalPosts={lists.length}
        paginate={paginate}
        />
    </div>
  )
}



export default StaffList
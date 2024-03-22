import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import TimeTablePosts from '../components/TimeTablePosts'
import Pagination from '../components/Pagination'
const TimetableList = () => {
    const [lists,setLists] = useState([])
    const [currentPage,setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = lists.slice(indexOfFirstPost,indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)


    useEffect(()=>{
        getStaffList();
    },[])
    
    let getStaffList = async () => {
        let response = await axios.get('http://127.0.0.1:8000/api/timetable/')
        setLists(response.data)
    }
             return (
        <div className="container">
            <h1 className='text-center text-primary'>Timetable List: </h1> 
            <TimeTablePosts 
            lists={currentPosts}
            currentPage={indexOfFirstPost}
            getStaffList={getStaffList}
            />
            <Pagination 
            postsPerpage={postsPerPage}
            totalPosts={lists.length}
            paginate={paginate}
            />           
    </div>
  )
}


export default TimetableList
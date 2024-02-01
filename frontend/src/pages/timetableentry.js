import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './timetableentry.css';

const TimeTableEntry = () => {
    const [staffs,setStaffs] = useState([])
    useEffect(()=>{
        getStaffList();
    },[])
    
    let getStaffList = async () => {
        let response = await axios.get('http://127.0.0.1:8000/api/staff/')
        setStaffs(response.data)
    }
    

    const [staffId,setStaffId] = useState('')
    const [day,setDay] = useState('')
    const [startTime,setStartTime] = useState('09:40 AM')
    const [endTime,setEndTime] = useState('12:40 PM')
    const [startDate,setStartDate] = useState('')
    const days= ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        // const st = new Date('2000:01:01T${startTime}:00').toLocaleTimeString('en-IN',{hour:'2-digit', minute:'2-digit',hour12: true})
        // console.log(JSON.stringify(st),startDate,endTime,day,staffId);
        if(endTime<startTime){
            alert(`the start time is larger than end time`)
            return;
        }
        const isTimingsUnique = await checkTimingsUnique(staffId,day,startTime,endTime,startDate)
        if (isTimingsUnique.length!==0){
            alert(`data with ${isTimingsUnique[0].day} start: ${isTimingsUnique[0].start_time} to end: ${isTimingsUnique[0].end_time} inserted`);
            return;
        }
        try{
            axios('http://127.0.0.1:8000/api/timetable/',
                {method: 'POST',    
                headers: {
                    "Content-Type": 'application/json'},
                data: JSON.stringify({staff:staffId,
                day:day,
                start_time: startTime,
                end_time: endTime,
                start_date: startDate,
            }),
            });           
        }
        catch(error){
            console.log("Error Occured");
        }
        navigate('/timetableList')
    };
        const checkTimingsUnique = async (staffId,day,startTime,endTime,startDate) => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/timetable/duplicate_check/', {
                  params: {
                    staff: staffId,
                    day: day,
                    start_time: endTime,
                    end_time: startTime,
                    start_date: startDate,
                  },
                });
          
                // If timings are unique, the response should be an empty array
                console.log(response.data);
                return response.data;
              } catch (error) {
                console.error('Error checking timings uniqueness:', error);
                // Handle error (e.g., show an error message)
                return false;
              }
            };
       

    return (<>
            <div className='timetable-form'>
           
            <form onSubmit={handleSubmit}>
            <h1>
                Time Table Entry:
            </h1>
                <label for='fname'>
                    Faculty Name:</label>
                    <select value={staffId} id='fname' onChange={(e)=>setStaffId(e.target.value)}>
                        <option>Select</option>
                        {staffs.map((staf,index)=>{
                        return (<option value={staf.id} id={staf.staffid} key={index}>{staf.name}</option>)        
                        })}
                    </select>
                
                <label for='dayid'>Day :</label>
                    <select id='dayid' value={day} onChange={(e)=>setDay(e.target.value)}>
                        <option>Select</option>
                        {days.map((day,index)=>{
                        return (<option value={day} id={index} key={index}>{day}</option>)        
                        })}
                    </select>
                <label for='startingtime'>Starting Time: </label>
                    <input type="time" id='startingtime'min="9:40" max="16:20" value={startTime} onChange={(e)=>setStartTime(e.target.value)}/>
                
                <label for='endingtime'>Ending Time:</label>
                <input type='time' id='endingtime' min="9:40" max="16:20" value={endTime} onChange={(e)=>setEndTime(e.target.value)}
                />
                <label for='startingdate'>Starting Date: </label>
                    <input type='date' id='startingdate' value={startDate} onChange={(e)=>setStartDate(e.target.value)}/>
                
                <button type='submit'> Submit </button>            
                </form>
            </div>
            </>
    );
                    }

export default TimeTableEntry;
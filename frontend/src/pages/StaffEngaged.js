import React, { useState } from 'react';
import axios from 'axios';
import './StaffEngaged.css';

const StaffEngaged = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [responseData, setResponseData] = useState([]);

  const timeSlots = ['09:40-10:40', '10:40-11:40', '11:40-12:40', '12:40-1:20', '1:20-2:20', '2:20-3:20', '3:20-4:20'];

  const getStaffEngagedData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/timetable/staff_engaged/?date=${selectedDate}`);
      const schedules = response.data;
      const groupedSchedules = schedules.reduce((acc, schedule) => {
        const key = `${schedule.staff}_${schedule.day}`;
        if (!acc[key]) {
          acc[key] = { staff: schedule.staff, day: schedule.day, staff_name: schedule.staff_name, timings: [] };
        }
        acc[key].timings.push({ start_time: schedule.start_time, end_time: schedule.end_time });
        return acc;
      }, {});

      const result = Object.values(groupedSchedules).map((group) => {
        group.timings.sort((a, b) => a.start_time.localeCompare(b.start_time));
        return group;
      });

      setResponseData(result);
    } catch (error) {
      console.error("Error Fetching data", error);
    }
  };

  return (
    <>
      <div className='staffengaged'>
        <div className='engaged-form'>
          <form onSubmit={getStaffEngagedData}>
            <h1>DateWise Staff Engaged List: </h1>
            <input type="date"
                   value={selectedDate}
                   onChange={(e) => setSelectedDate(e.target.value)}></input>
            <button type='submit'>Get</button>
          </form>
        </div>
        <h1 className='staff-list-h1'>Staff List</h1>
        <table className="table table-bordered w-75 center">
          <thead>
          <tr>
            <th className='table-header'>Sl No.</th>
            <th className='table-header'>Name of the Staff</th>
            {timeSlots.map((time, index) => (
              <th key={index} className='table-header'>{time}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {responseData.map((data, index) => (
            <tr key={index}>
              <td className='staff-data'>{index+1}</td>
              <td className='staff-data'>{data.staff_name}</td>
              {timeSlots.map((ts, index) => (
                data.timings.some((d) => d.start_time <= ts.split("-")[0] && d.end_time >= ts.split("-")[1]) ? (
                  <td key={index} className='allotted'>allotted</td>
                ) : (
                  <td key={index} className='not-allotted'>-</td>
                )
              ))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StaffEngaged;

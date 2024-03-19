// Assuming you have received this data from the backend or an API
const timetableData = [
    {
      staff: {
        staffid: 1,
        name: 'John Doe',
        designation: 'Developer',
      },
      timetable: {
        '2024-02-01': [
          {
            day: 'Monday',
            start_time: '09:40',
            end_time: '10:40',
          },
          // Add other entries for the same day as needed
          // ...
          {
            day: 'Monday',
            start_time: '10:40',
            end_time: '12:40',
          },
        ],
        // Add entries for other days as needed
        // ...
      },
    },
    {
      staff: {
        staffid: 2,
        name: 'Jane Smith',
        designation: 'Designer',
      },
      timetable: {
        '2024-02-01': [
          {
            day: 'Monday',
            start_time: '13:00',
            end_time: '17:00',
          },
          // Add other entries for the same day as needed
          // ...
        ],
        // Add entries for other days as needed
        // ...
      },
    },
    // Add entries for other staff members as needed
    // ...
  ];
  
  export default timetableData;
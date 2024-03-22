import React from 'react'
import axios from 'axios';



const Posts = ({lists,currentPage,
    getStaffList,
    setEditingStaffId,
    editingStaffId,
    setLists}) => {

    const deleteStaff = async (id) => {
        const userConfirmed = window.confirm('Are you sure you want to delete this record');
        if(userConfirmed){
        try{
          console.log('id value',typeof(id));
        let res = await axios.delete(`http://127.0.0.1:8000/api/staff/${id}`)
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
    
      const updateStaff = (id) => {
        setEditingStaffId(id);
      };
      
      const cancelUpdate = () => {
        setEditingStaffId(null);
      };
      
      const saveUpdatedStaff = async (id, sid, updatedName) => {
        try {
          await axios.patch(`http://127.0.0.1:8000/api/staff/${id}/`, {staffid:sid, name: updatedName });
          setEditingStaffId(null);
          getStaffList(); // Optionally, you can update the list after a successful update
        } catch (error) {
          console.error('Error updating staff member', error);
          alert('Error updating staff member. Please try again.');
        }
      };


  return (
    <div>
        <table className="table table-light table-striped table-sm table-responsive w-75 center">
  <thead>
    <tr>
      <th scope="col">SL. No.</th>
      <th scope="col">Staff Id</th>
      <th scope="col">Staff Name</th>
      <th scope='col'>Designation</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
  {lists.map((list,index)=>{
    return (
       <tr key={index}>
        <td>{index+currentPage+1}</td>
        {/* <td>{list.staffid}</td> */}
        <td>
        {editingStaffId === list.id ? (
                  <input
                    type="text"
                    value={list.staffid}
                    onChange={(e) => setLists((prevLists) => updateList(prevLists, list.id, 'staffid', e.target.value))}
                  />
                ) : (
                  list.staffid
                )}
        </td>
        <td>{editingStaffId === list.id ? (
                  <input
                    type="text"
                    value={list.name}
                    onChange={(e) => setLists((prevLists) => updateList(prevLists, list.id, 'name', e.target.value))}
                  />
                ) : (
                  list.name
                )}
              </td>
              <td>{list.designation}</td>
        <td>
                {editingStaffId === list.id ? (
                  <>
                    <button className="btn btn-success btn-sm" onClick={() => saveUpdatedStaff(list.id,list.staffid, list.name)}>
                      Save
                    </button>
                    <span> </span>
                    <button className="btn btn-secondary btn-sm" onClick={cancelUpdate}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-success btn-sm" onClick={() => updateStaff(list.id)}>
                    Update
                  </button>
                )}
                <span> </span>
                <button className="btn btn-danger btn-sm" onClick={() => deleteStaff(list.id)}>
                  Delete
                </button>
        </td>
       </tr>) 
    })}
  </tbody>
</table>

    </div>
  )
}
const updateList = (prevLists, id, key, value) => {
    return prevLists.map((item) => (item.id === id ? { ...item, [key]: value } : item));
  };

export default Posts
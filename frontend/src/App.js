import { BrowserRouter, Routes,Route} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
//import Subjects from './pages/timetable'
import TimeTableEntry from './pages/timetableentry';
import StaffList from './pages/StaffList';
import StaffEntry from './pages/StaffEntry';
import TimetableList from './pages/TimetableList';
import StaffEngaged from './pages/StaffEngaged';
//import SubCreate from './pages/SubCreate'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/entry' Component={TimeTableEntry}> </Route>
          {/* <Route path='/create' element={<SubCreate /> } exact></Route> */}
          <Route path='/stafflist' Component={StaffList}> </Route>
          <Route path='/staffentry' Component={StaffEntry}> </Route>
          <Route path='/timetablelist' Component={TimetableList}></Route>
          <Route path='/staffengaged' Component={StaffEngaged}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
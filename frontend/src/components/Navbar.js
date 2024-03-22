import React from "react";
import { NavLink } from "react-router-dom";
import './navbar.css';

const Navbar = () => {
  return (
    <div className="container">
    <nav className="navbar">
        <div className="nav-links">
      <NavLink exact to="/" className="nav-link" activeClassName="active-link">Home</NavLink>
      <NavLink to="/staffentry" className="nav-link" activeClassName="active-link">StaffEntry</NavLink>
      <NavLink to="/stafflist" className="nav-link" activeClassName="active-link">StaffList</NavLink>
      <NavLink to="/entry" className="nav-link" activeClassName="active-link">TimeTableEntry</NavLink>
      <NavLink to="/TimetableList" className="nav-link" activeClassName="active-link">TimeTableList</NavLink>
      <NavLink to="/staffengaged" className="nav-link" activeClassName="active-link">StaffEngaged</NavLink>
      </div>
    </nav>

</div>
    )
}

export default Navbar
import React from "react";
import {Route, Routes } from "react-router-dom";
import './App.css';
import AdminDash from "./Components/Dashboard/Admindash/AdminDash";
import UserDashboard from "./Components/Dashboard/userDash/UserDashboard";
import Frontpage from "./Components/frontpage/Frontpage";
import Tasklog from "./Components/Tasklog/Tasklog";
import Register from './Components/Dashboard/Register/Register';
import Table from "./Components/Table/Table";
import Viewusers from "./Components/viewusers/Viewusers";
import UserTasklog from "./Components/Dashboard/userTasklog/UserTasklog";
import Tanstacktable from './Components/Table/Tanstack_table/Tanstacktable';
import Allusers from "./Components/Tasklog/Allusers/Allusers";
import Signup from "./Components/Forms/Signup/Signup";
import Log from './Components/Forms/Login/Log';
import Tasks from "./Components/Tasklog/Taskofusers/Tasks";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Frontpage />}/>
      <Route exact path="/admin" element={<AdminDash/>}/>
      <Route exact path="/user" element={<UserDashboard/>}/>
      <Route exact path="/tasklog" element={<Tasklog/>}/>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/table" element={<Table/>}/>
      <Route exact path="/viewusers" element={<Viewusers/>}/>
      <Route exact path="/usertasklog" element={<UserTasklog/>}/>
      <Route exact path="/tantable" element={<Tanstacktable/>}/>
      <Route exact path="/allusers" element={<Allusers/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path="/log" element={<Log/>}/>
      <Route exact path="/tasks" element={<Tasks/>}/>
    </Routes>
  );
}

export default App;

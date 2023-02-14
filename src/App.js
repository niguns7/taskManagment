import React from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
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
import ProtectedRoute from './Components/Forms/ProtectedRoute';
import Pagenotfound from "./Components/Pagenotfound/Pagenotfound";
import Popup from "./Components/Table/Popup/Popup";

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient} >
        <Routes>
          <Route exact path="/" element={<Frontpage />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/log" element={<Log />} />
          <Route exact path="/pagenotfound" element={<Pagenotfound />} />
          {/* <Route exact path="/pop" element={<ProtectedRoute Component={<Popup/>}/>} /> */}
          <Route exact path="/admin" element={<ProtectedRoute Component={<AdminDash/>}/>} />
          <Route exact path="/user" element={<ProtectedRoute Component={<UserDashboard/>}/>} />
          <Route exact path="/register" element={<ProtectedRoute Component={<Register/>}/>} />
          <Route exact path="/table" element={<ProtectedRoute Component={<Table/>}/>} />
          <Route exact path="/viewusers" element={<ProtectedRoute Component={<Viewusers/>}/>} />
          <Route exact path="/viewusers" element={<ProtectedRoute Component={<Viewusers/>}/>} />
          <Route exact path="/tantable" element={<ProtectedRoute Component={<Tanstacktable/>}/>} />
          <Route exact path="/allusers" element={<ProtectedRoute Component={<Allusers/>}/>} />
          <Route exact path="/tasks/:sn" element={<ProtectedRoute Component={<Tasks/>}/>} />
          <Route exact path="/usertasklog" element={<ProtectedRoute Component={<UserTasklog/>}/>} />
          <Route exact path="/tasklog/:id" element={<ProtectedRoute Component={<Tasklog/>}/>} />
          </Routes>
          </QueryClientProvider>
  );
}

export default App;
import React, { useEffect, useContext } from 'react';
import "./App.css";
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom';
// import context from "./main";
import { Context } from './main';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import Navbar from './Component/Layout/Navbar';
import Footer from './Component/Layout/Footer';
import Home from './Component/Home/Home';
// import Job from './Component/Job/Jobs';
import JobDetails from './Component/Job/JobDetails';
import MyJobs from './Component/Job/MyJobs';
import Postjob from './Component/Job/PostJobs';
import Application from './Component/Application/Application';
import MyApplicstion from './Component/Application/MyApplication';
import Notfound from './Component/NotFound/NotFound';
import axios from 'axios';
import Toaster from 'react-hot-toast';
import Jobs from './Component/Job/Jobs';

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="job/post" element={<Postjob />} />
          <Route path="job/:id" element={<JobDetails />} />
          <Route path="job/me" element={<MyJobs />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="application/me" element={<MyApplicstion />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      <Toaster />

    </>
  )
};
export default App
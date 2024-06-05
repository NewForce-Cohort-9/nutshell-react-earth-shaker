import { ImageList } from "../myAccount/MyProfile/imageList.jsx"
import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"
import { useState, useEffect } from "react"


export const ApplicationViews = () => {

    return <Routes>
        <Route path="/" 
        element = { 
        <>
        <NavBar />
        <Outlet />
        </>
        }
        >
        </Route>
        <Route path="profile" >
        <Route index element={<ImageList />} /> 
        </Route>
        
        </Routes> 
}
// create a route that when you are in the "My Profile" component the image list would show up 
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
import { NavBar } from '../components/nav/NavBar.jsx';
import { EventList } from '../components/events/EventList.jsx';
import { EventDetails } from '../components/events/EventDetails.jsx';

export const ApplicationViews = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="home" element={<Welcome />} />
        <Route path="events" element={<EventList />} />
        <Route path="events/:eventId" element={<EventDetails />} />
      </Routes>
      <Outlet />
    </>
  );
};

const Welcome = () => (
  <div className="Dashboard">
    <header className="App-header">
      <h1>Welcome to Nutshell</h1>
    </header>
  </div>
);

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
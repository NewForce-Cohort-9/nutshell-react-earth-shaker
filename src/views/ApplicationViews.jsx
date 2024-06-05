import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar.jsx"


export const ApplicationViews = () => {
    return <Routes>
        <Route path="/" 
        element = { 
        <>
        <NavBar />
        <Outlet />
        </>
        }
        ></Route>
        
        
        </Routes> }


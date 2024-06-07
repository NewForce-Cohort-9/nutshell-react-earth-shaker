import { Outlet, Route, Routes, Navigate } from 'react-router-dom'
import { NavBar } from '../components/nav/NavBar.jsx'
import { EventList } from '../components/events/EventList.jsx'
import { EventDetails } from '../components/events/EventDetails.jsx'
import { EventForm } from '../components/forms/EventForm.jsx'
import { EventEditForm } from '../components/forms/EventEditForm.jsx'
import { AllNews } from '../components/news/AllNews.jsx'
import { NewsForm } from '../components/news/NewsForm.jsx'

export const ApplicationViews = ({currentUser}) => {
  return (
    <>
      <NavBar />
      <Routes>
        {/* /login is default page for when app is first opened */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="events" element={<EventList currentUser={currentUser} />} />
        <Route path="events/new" element={<EventForm currentUser={currentUser} />} />
        <Route path="events/:eventId" element={<EventDetails />} />
        <Route path="events/edit/:eventId" element={<EventEditForm currentUser={currentUser} />} />
        <Route path="news" element={<AllNews currentUser={currentUser}/>} />
        <Route path="news/addArticle" element={<NewsForm currentUser={currentUser}/>} />  
      </Routes>
      <Outlet />
    </>
  )
}

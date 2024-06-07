
// export const ApplicationViews = () => {

//     return <Routes>
//         <Route path="/" 
//         element = { 
//         <>
//         <NavBar />
//         <Outlet />
//         </>
//         }
//         >
//         </Route>
//         <Route path="profile" >
//         <Route index element={<ImageList />} /> 
//         </Route>
        
//         </Routes> 
// }
// create a route that when you are in the "My Profile" component the image list would show up 
import { Image } from '../myAccount/MyProfile/images.jsx';
import { ImageList } from '../myAccount/MyProfile/imageList.jsx';
import { ImageDetails } from '../myAccount/MyProfile/imageDetails.jsx';
import { ImageEditForm } from '../myAccount/MyProfile/editImageForm.jsx';
import { PostForm } from '../myAccount/MyProfile/imageForm.jsx';
import { Outlet, Route, Routes, Navigate } from 'react-router-dom';
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
        <Route path="profile/new" element={< PostForm /> } />
        <Route path="profile" element={<ImageList />} /> 
        <Route path="image-info" element={<ImageDetails />} />
        <Route path="profile/edit/:imageId" element= {<ImageEditForm />} />
        <Route path="events/edit/:eventId" element={<EventEditForm/>} />
        <Route path="events/edit/:eventId" element={<EventEditForm currentUser={currentUser} />} />
        <Route path="news" element={<AllNews />} />
        <Route path="news/addArticle" element={<NewsForm />} />  
      </Routes>
      <Outlet />
    </>
  )
}

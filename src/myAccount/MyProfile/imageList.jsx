
import { getAllImages } from "../../services/imageServices.jsx"
import { Image } from "./images.jsx"
import { useState, useEffect } from "react"
import "./images.css"
//import { Ticket } from "./ticket.jsx"
//import "./tickets.css"
//import { TicketFilterBar } from "./ticketFilterBar.jsx"


export const ImageList = ({currentUser}) => {
    const [allImages, setAllImages] = useState([])
    
    useEffect(() => {
      getAllImages().then((imagesArray) => {
        setAllImages(imagesArray)
      })
    }, []) // runs on initial render of component
  
    
    return (
    <div className="images-container">
     <h2>Images</h2>
     <article className="images">
      {allImages.map(imageObj => {
        return (
          <Image image={imageObj} currentUser={currentUser} key= {imageObj.id}/>
        )
      })}
     </article>
    </div>
    ) 
}


import { getAllImages } from "../../services/imageServices.jsx"
import { Image } from "./images.jsx"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./images.css"


export const ImageList = ({currentUser}) => {
    const [allImages, setAllImages] = useState([])
    
    useEffect(() => {
      getAllImages().then((imagesArray) => {
        setAllImages(imagesArray)
      })
    }, []) // runs on initial render of component
  
    
    return (
    <div className="images-container">
     <h2>Posts</h2>
     <Link to="/profile/new" className="btn btn-primary">Submit New Post</Link>
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

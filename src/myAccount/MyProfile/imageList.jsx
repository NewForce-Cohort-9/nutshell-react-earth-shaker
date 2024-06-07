
import { getAllImages } from "../../services/imageServices.jsx"
import { Image } from "./images.jsx"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./images.css"


export const ImageList = ({currentUser}) => {
    const [allImages, setAllImages] = useState([])
    const [filteredImages, setFilteredImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    
    const getAndSetImages = () => {
      getAllImages().then((imagesArray) => {
        setAllImages(imagesArray)
        setFilteredImages(imagesArray)
      });
    }; 
    
    useEffect(() => {
      getAndSetImages();
  }, [currentUser]);

    
    return (
    <div className="images-container">
     <h2>Posts</h2>
     <Link to="/profile/new" className="btn btn-primary">Submit New Post</Link>
     <article className="images">
     {filteredImages.map((imageObject) => {
                    return (
                        <Image
                            image={imageObject}
                            currentUser={currentUser}
                            getAndSetImages={getAndSetImages}
                            key={imageObject.id}
                        />
                    );
                  })}
     </article>
    </div>
    ) 
}

// feature that shows the images being posted 
import { useEffect, useState } from "react"
import { getAllImages } from "../../services/imageServices.jsx"

export const Image = ({image, currentUser}) => {
    
    



    return (
        <section className="image" key= {image.id}>
           <img src={image.url} ></img>
           <div>
            <span className="image-info">Caption: </span>
                {image.caption}
            </div>
        </section>
        
        )
    }
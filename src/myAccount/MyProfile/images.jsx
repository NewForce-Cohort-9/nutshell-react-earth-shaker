// feature that shows the images being posted 
import { useEffect, useState } from "react"
import { getAllImages } from "../../services/imageServices.jsx"

export const Image = ({image, currentUser}) => {
    //const[employees, setEmployees] = useState([])
    



    return (
        <section className="image" key= {image.id}>
           <img src={image.url} ></img>
        </section>
        )
    }
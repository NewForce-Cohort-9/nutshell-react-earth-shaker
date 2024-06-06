// where you want to only see a single image


import { getAllImages } from "../../services/imageServices.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const ImageDetails= () => {
    const { imageId } = useParams()
    const [image, setImage] = useState(null)

    useEffect(() => {
        getAllImages().then(data => {
            const imageObject = data.find(image => image.id.toString() === imageId);
            setImage(imageObject);
          });
        }, [eventId]);

    return (
        <section className="image">
            <div>
            <span className="image-info">Caption: </span>
                {image.caption}
            </div>
            

        </section>

    )


}
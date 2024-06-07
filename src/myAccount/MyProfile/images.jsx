// feature that shows the images being posted 
import { useNavigate } from "react-router-dom"
import { updatePost } from "../../services/imageServices.jsx"

export const Image = ({ image, currentUser, getAndSetImages }) => {
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(`/profile/edit/${image.id}`);
    };

    const handleDelete = () => {
        deleteImage(image.id).then(() => {
            getAndSetEvents();
        });
    };

    return (
        <section className="image" key= {image.id}>
            <img src={image.url} ></img>
            <div>{image.caption}</div>
            <footer>
                <div className="button-container">
                    <button className="btn btn-warning" onClick={handleUpdate}>Edit</button>
                    <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </footer>
        </section>
    );
};

    

    // return (
    //     <section className="image" key= {image.id}>
    //        <img src={image.url} ></img>
    //        <div>
    //         <span className="image-info">Caption: </span>
    //             {image.caption}
    //         </div>
    //     </section>
        
    //     )
    // }
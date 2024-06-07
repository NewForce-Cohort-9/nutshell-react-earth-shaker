
import { useEffect, useState } from "react";
import "./Form.css";
import { updatePost, getImageById } from "../../services/imageServices.jsx";
import { useNavigate, useParams } from "react-router-dom";

export const ImageEditForm = () => {
    const { imageId } = useParams();
    const [image, setImage] = useState({ url: "", caption: "" });
    const navigate = useNavigate();

    useEffect(() => {
        getImageById(imageId).then((imageData) => {
            setImage(imageData);
        });
    }, [imageId]);

    const handleSave = (e) => {
        e.preventDefault();

        if (image.url && image.caption) {
            updatePost(image).then(() => {
                navigate("/profile");
            });
        } else {
            window.alert("Please fill out all fields");
        }
    };

    return (
        <form>
            <h2>Edit Post</h2>
            <fieldset>
                <div className="form-group">
                    <label>Url</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image Url"
                        value={image.url}
                        onChange={(e) => {
                            const imageCopy = { ...image };
                            imageCopy.name = e.target.value;
                            setImage(imageCopy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Caption</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Caption"
                        value={image.caption}
                        onChange={(e) => {
                            const imageCopy = { ...image };
                            imageCopy.date = e.target.value;
                            setImage(imageCopy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-info" onClick={handleSave}>
                        Save Changes
                    </button>
                </div>
            </fieldset>
        </form>
    );
};
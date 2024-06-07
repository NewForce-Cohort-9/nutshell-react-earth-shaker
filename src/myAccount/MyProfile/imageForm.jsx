import { createPost } from "../../services/imageServices.jsx";
import { useState } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";

export const PostForm = () => {
    const [image, setImage] = useState({ url: "", caption: ""});
    const navigate = useNavigate();

    const handleSave = (e) => {
        e.preventDefault();

        if (image.url && image.caption) {
            const newPost = {
                link: image.url,
                caption: image.caption
            };

            createPost(newPost).then(() => {
                navigate("/profile");
            });
        } else {
            window.alert("Please fill out all fields");
        }
    };

    return (
        <form>
            <h2>New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label>Link</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Image URL"
                        value={image.url}
                        onChange={(e) => {
                            const imageCopy = { ...image };
                            imageCopy.url = e.target.value;
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
                        placeholder="insert Caption"
                        value={image.caption}
                        onChange={(e) => {
                            const imageCopy = { ...image };
                            imageCopy.caption = e.target.value;
                            setImage(imageCopy);
                        }}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button className="form-btn btn-info" onClick={handleSave}>
                        Post Image
                    </button>
                </div>
            </fieldset>
        </form>
    );
};

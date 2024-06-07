// feature that lets me get images 


export const getAllImages =() => {
    return fetch (`http://localhost:8088/images`).then((res) => res.json())
}

// feature lets me create a post
export const createPost = (image) => {
    return fetch(`http://localhost:8088/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
    })
}
// lets me update post
export const updatePost = (image) => {
    return fetch(`http://localhost:8088/images/${image.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(image),
    })
}
// lets me get image bt Id
export const getImageById = (id) => {
    return fetch(`http://localhost:8088/images/${id}`).then((res) => res.json());
};

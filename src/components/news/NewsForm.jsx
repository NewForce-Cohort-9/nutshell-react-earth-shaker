import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createNewArticle } from '../../services/newsServices' 

export const NewsForm = ({currentUser}) => {
    const [newArticle, setNewArticle] = useState({ title: '', synopsis: '', url: '' })
    const navigate = useNavigate() // useNavigate hook

    const handleAddArticle = async (event) => {
        event.preventDefault() // prevent default form submission
        if (!newArticle.title || !newArticle.synopsis || !newArticle.url) {
            alert('Please fill out the title, synopsis, and URL!')
            return
        }
        const article = {
            title: newArticle.title,
            synopsis: newArticle.synopsis,
            url: newArticle.url,
            userId: currentUser.id, // track currentUser
            timestamp: new Date().toISOString(), // give new article a timestamp
        }
        await createNewArticle(article)
        setNewArticle({ title: '', synopsis: '', url: '' }) // clear input fields

        navigate('/news') // navigate back to news after saving
    }

    return (
        <form>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter title"
                    value={newArticle.title}
                    // Update the newArticle state with the value typed by the user:
                    onChange={(event) => setNewArticle({ ...newArticle, title: event.target.value })}
                    // spread operator (...) creates copy of existing state object, newArticle with all its existing properties being preserved (synopsis and url), except user input of title 
                />
            </div>

            <div className="form-group">
                <label>Synopsis</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter synopsis"
                    value={newArticle.synopsis}
                    onChange={(event) => setNewArticle({ ...newArticle, synopsis: event.target.value })}
                />
            </div>

            <div className="form-group">
                <label>URL</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter URL"
                    value={newArticle.url}
                    onChange={(event) => setNewArticle({ ...newArticle, url: event.target.value })}
                />
            </div>
            <div className="button-group">
                <button type="submit" className="btn btn-success" onClick={handleAddArticle}>
                    Save Article
                </button>
            </div>
        </form>
    )
}

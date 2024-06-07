import { useEffect, useState } from 'react'
import { getAllNews, deleteArticle, modifyArticle } from '../../services/newsServices'
import "./AllNews.css"
import { useNavigate } from 'react-router-dom'
import { Messages } from '../messages/Messages.jsx'


export const AllNews = ({currentUser}) => {
  const navigate = useNavigate() // useNavigate hook
  const [allArticles, setAllArticles] = useState([])
  const [articleBeingEdited, setArticleBeingEdited] = useState({}) // track which article is being edited

  // fetch all articles on initial render
  useEffect(() => { 
      getAllNews().then((articlesArray) => 
      //Format for sorting date in descending order: data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      // Sort articles by timestamp in descending order:
      setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))))
  }, []) 

  // handle editing article
  // handleEditClick sets the articleBeingEdited state to the article that needs to be edited
  const handleEditClick = (article) => {  
      setArticleBeingEdited({ ...article, originalTimestamp: article.timestamp })
  }

  // handle saving the edited article
  // handleEditSave sends the updated article to the server and resets articleBeingEdited to null
  const handleEditSave = async (event) => {
    event.preventDefault() // prevent default form submission
    if (!articleBeingEdited.title || !articleBeingEdited.synopsis || !articleBeingEdited.url) {
      alert('Please fill out the title, synopsis, and URL!')
      return
    }
    await modifyArticle(articleBeingEdited)
    setArticleBeingEdited({}) // exit editing mode
    getAllNews().then((articlesArray) => setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))))
  }

  // handleDeleteArticle
  const handleDeleteArticle = async (articleId) => { 
    await deleteArticle(articleId)
    getAllNews().then((articlesArray) => {
      setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
    })
  }
 
  return (
    <>
      <h2>News</h2>
      <div className='button-group'>
        <button className="btn btn-success" onClick={() => navigate('/news/addArticle')}>+ New Article</button>
      </div>
      <div className="article-lists-container">
        <div className="article-list-container">
          <article className="article">   
            {allArticles.map((article) => {
              //articleBeingEdited.id === article.id: only targeted article shows edit form. Otherwise all articles display edit form.
              if (articleBeingEdited && articleBeingEdited.id === article.id) {
                return (
                  <form key={article.id}>
                    <div className="form-group">
                      <label>Title: </label>
                      <input
                        type="text" className="form-control" 
                        value={articleBeingEdited.title}
                        onChange={(event) => setArticleBeingEdited({ ...articleBeingEdited, title: event.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Synopsis: </label>
                      <input
                        type="text" className="form-control" 
                        value={articleBeingEdited.synopsis}
                        onChange={(event) => setArticleBeingEdited({ ...articleBeingEdited, synopsis: event.target.value })}
                      />
                    </div>

                    <div className="form-group">
                      <label>URL: </label>
                      <input
                        type="text" className="form-control" 
                        value={articleBeingEdited.url}
                        onChange={(event) => setArticleBeingEdited({ ...articleBeingEdited, url: event.target.value })}
                      />
                    </div>
                    <div className='button-group'>
                      <button className="btn btn-success" onClick={handleEditSave}>Save</button>
                      <button className="btn btn-warning" onClick={() => setArticleBeingEdited({})}>Cancel</button>
                    </div>
                  </form>
                )
              } else {
                return (
                  <div className="article-list-item" key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.synopsis}</p>
                    <a href={article.url}>{article.url}</a>
                    {article.userId === currentUser.id && (
                      <div className='button-group'>
                        <button className="btn btn-primary btn-sm" onClick={() => handleEditClick(article)}>Modify</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )
              }
            })}
          </article>
        </div>     
      </div>
      <div>
        < Messages />
      </div>
    </>
  )
}
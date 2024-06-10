import React, { useEffect, useState } from 'react'
import { getAllNews, deleteArticle, modifyArticle } from '../../services/newsServices'
import "./AllNews.css"
import { useNavigate } from 'react-router-dom'
import { Messages } from '../messages/Messages.jsx'

export const AllNews = ({ currentUser }) => {
  const navigate = useNavigate() // useNavigate hook
  const [allArticles, setAllArticles] = useState([])
  const [articleBeingEdited, setArticleBeingEdited] = useState({}) // track which article is being edited

  // fetch all articles on initial render
  useEffect(() => { 
    getAllNews().then((articlesArray) => 
      setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))))
  }, []) 

  // handle editing article
  const handleEditClick = (article) => {  
    setArticleBeingEdited({ ...article, originalTimestamp: article.timestamp })
  }

  // handle saving the edited article
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

  // handle deleting an article
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
        <button className="btn btn-primary" onClick={() => navigate('/news/addArticle')}>+ New Article</button>
      </div>
          <article className="article">   
            {allArticles.map((article) => {
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
                    <a className="article-url" href={article.url}>{article.url}</a>
                    {article.userId === currentUser.id && (
                      <div className='button-group'>
                        <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(article)}>Modify</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                      </div>
                    )}
                  </div>
                )
              }
            })}
          </article>  
      <div>
        <Messages />
      </div>
    </>
  )
}

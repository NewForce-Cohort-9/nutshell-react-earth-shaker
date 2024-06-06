import { useEffect, useState } from 'react'
import { getAllNews, deleteArticle, modifyArticle, createNewArticle } from '../services/newsServices'
//import { NewArticleForm }  from './NewArticleForm'

export const AllNews = () => {
  const [allArticles, setAllArticles] = useState([])
  const [newArticle, setNewArticle] = useState({ title: '', synopsis: '', url: '' })
  const [articleBeingEdited, setArticleBeingEdited] = useState({})// track which article is being edited

  // fetch all articles on initial render
useEffect(() => { 
  getAllNews().then((articlesArray) => 
    //Format for sorting date in descending order: data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    // Sort articles by timestamp in descending order:
 setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))))
}, []) 

  //handleAddArticle
  const handleAddArticle= async ()=>{
    const article ={
      title: newArticle.title,
      synopsis: newArticle.synopsis,
      url: newArticle.url,
      timestamp: new Date().toISOString(), // give new article a timestamp
    }
    await createNewArticle(article)
    setNewArticle({ title: '', synopsis: '', url: '' })//clear input field when you're done

  getAllNews().then((articlesArray) => {
    setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
  })
  }

// handle editing article
// handleEditClick sets the editingArticle state to the article that needs to be edited.
const handleEditClick= (article)=>{  
    setArticleBeingEdited({ ...article, originalTimestamp: article.timestamp })
  }

// handle saving the edited article
// handleEditSave sends the updated article to the server and resets editingArticle to null.
const handleEditSave = async () => {
  await modifyArticle(articleBeingEdited)
  setArticleBeingEdited({}) // exit editing mode, , set back to {}
  getAllNews().then((articlesArray) => setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))))
}

  // handleDeleteArticle
 const handleDeleteArticle= async (articleId)=>{ 
  await deleteArticle(articleId)
  getAllNews().then((articlesArray) => {
    setAllArticles(articlesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
  })
}

  return (
  <>
      <h2>News</h2>
  
      <div className="news-add-form">
        <label>Title: </label>
      <input className="news-input-title" type="text" value={newArticle.title} onChange={(event) => {
      //spreads the existing properties of newArticle into the new object, and then sets the title property to the new value from event.target.value
      //so other properties (synopsis and url) are preserved.
      //spread operator (...) creates copy of the existing state object, preserving all the current properties and their values. Then, you update only the specific property that changed (e.g., title), while the other properties (e.g., synopsis and url) remain unchanged. This ensures that the user doesn't lose any data they have already entered in other fields.
      //Update the newArticle state with the value typed by the user:
      setNewArticle({ ...newArticle, title: event.target.value })
      //console.log(onChange)//Log the event to see the user's input
          }}
        /><br/>
        <label>Synopsis: </label>
        <input className="news-input-synopsis" type="text" value={newArticle.synopsis} onChange={(event) => {
      setNewArticle({ ...newArticle, synopsis: event.target.value })
          }}
        /><br/>
        <label>URL: </label>
        <input className="news-input-url" type="text" value={newArticle.url} onChange={(event) => {
      // Update the newArticle state with the value typed by the user:
      setNewArticle({ ...newArticle, url: event.target.value })
          }}
        /><br/>
      <button className="news-input-submit" onClick={handleAddArticle}>Save Article</button>  
      </div>
  
  <div className="article-lists-container">
  <div className="article-list-container">
      <article className="article">   
         {allArticles.map((article) => {
          //articleBeingEdited.id === article.id: only targeted article shows edit form. Otherwise all articles display edit form.
              if (articleBeingEdited && articleBeingEdited.id === article.id) {
                return (
                  <div className="article-list-item" key={article.id}>
                    <input
                      type="text"
                      value={articleBeingEdited.title}
                      onChange={(e) => setArticleBeingEdited({ ...articleBeingEdited, title: e.target.value })}
                    />
                    <input
                      type="text"
                      value={articleBeingEdited.synopsis}
                      onChange={(e) => setArticleBeingEdited({ ...articleBeingEdited, synopsis: e.target.value })}
                    />
                    <input
                      type="text"
                      value={articleBeingEdited.url}
                      onChange={(e) => setArticleBeingEdited({ ...articleBeingEdited, url: e.target.value })}
                    />
                    <button onClick={handleEditSave}>Save</button>
                    {/* <button onClick={() => setArticleBeingEdited({})}>Cancel</button> */}
                  </div>
                )
              } else {
                return (
                  <div className="article-list-item" key={article.id}>
                    <h2>{article.title}</h2>
                    <p>{article.synopsis}</p>
                    <a href='{article.url}'>{article.url}</a>
                    <div>
                    <button onClick={() => handleEditClick(article)}>Modify</button>
                    <button onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                    </div>
                  </div>
                )
              }
            })}
       

          </article>
  </div>     
        </div>
      </>
        )
  
}
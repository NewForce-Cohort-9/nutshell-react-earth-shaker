import { useEffect, useState } from 'react'
import { getAllNews, deleteArticle, modifyArticle, createNewArticle } from '../services/newsServices'
import { NewArticleForm }  from './NewArticleForm'

export const AllNews = () => {
  const [articles, setArticles] = useState([])
  const [editingArticle, setEditingArticle] = useState(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const articles = await getAllNews()
    // Sort articles by timestamp in descending order
    setArticles(articles.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
  }

  const handleArticleCreated = async (newArticle) => {
    try {
      const createdArticle = await createNewArticle(newArticle)
      setArticles(prevArticles => [createdArticle, ...prevArticles].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)))
    } catch (error) {
      console.error('Error creating article:', error.message)
    }
  }

  const handleDelete = async (id) => {
    await deleteArticle(id)
    fetchArticles()
  }

  const handleEdit = (article) => {
    // Pass the original timestamp along with the article to preserve its place in the order
    setEditingArticle({ ...article, originalTimestamp: article.timestamp });
  }

  const handleUpdate = async (updatedArticle) => {
    const { id, title, synopsis, url, originalTimestamp } = updatedArticle; //originalTimestamp to preserve its place in the order 
    await modifyArticle(id, { title, synopsis, url }, originalTimestamp); //originalTimestamp to preserve its place in the order
    setEditingArticle(null);
    fetchArticles();
  }
  

  return (
    <div>
      <h1>All News Articles</h1>
      <NewArticleForm onArticleCreated={handleArticleCreated} />
      <div>
        {articles.map(article => (
          <div key={article.id} className="article">
            {editingArticle?.id === article.id ? (
              <form onSubmit={(e) => {
                e.preventDefault()
                handleUpdate(editingArticle)
              }}>
                <label>
                  News Title:
                  <input type="text" value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} required />
                </label>
                <br />
                <label>
                  Synopsis:
                  <textarea value={editingArticle.synopsis} onChange={(e) => setEditingArticle({ ...editingArticle, synopsis: e.target.value })} required />
                </label>
                <br />
                <label>
                  URL:
                  <input type="url" value={editingArticle.url} onChange={(e) => setEditingArticle({ ...editingArticle, url: e.target.value })} required />
                </label>
                <br />
                <button type="submit">Update Article</button>
                <button type="button" onClick={() => setEditingArticle(null)}>Cancel</button>
              </form>
            ) : (
              <div>
                <h2>{article.title}</h2>
                <p>{article.synopsis}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a>
                <br /><br />
                <button onClick={() => handleEdit(article)}>Edit</button>
                <button onClick={() => handleDelete(article.id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}







// import React, { useEffect, useState } from 'react';
// import { getAllNews, deleteArticle, modifyArticle } from '../newsServices';
// import NewArticleForm from './NewArticleForm';

// const AllNews = () => {
//   const [articles, setArticles] = useState([]);
//   const [editingArticle, setEditingArticle] = useState(null);

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     const articles = await getAllNews();
//     setArticles(articles.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
//   };

//   const handleArticleCreated = (newArticle) => {
//     setArticles([newArticle, ...articles]);
//   };

//   const handleDelete = async (id) => {
//     await deleteArticle(id);
//     setArticles(articles.filter(article => article.id !== id));
//   };

//   const handleEdit = (article) => {
//     setEditingArticle(article);
//   };

//   const handleUpdate = async (updatedArticle) => {
//     const { id, title, synopsis, url } = updatedArticle;
//     const modifiedArticle = await modifyArticle(id, { title, synopsis, url, timestamp: new Date().toISOString() });
//     setArticles(articles.map(article => article.id === id ? modifiedArticle : article));
//     setEditingArticle(null);
//   };

//   return (
//     <div>
//       <h1>All News Articles</h1>
//       <NewArticleForm onArticleCreated={handleArticleCreated} />
//       <div>
//         {articles.map(article => (
//           <div key={article.id} className="article">
//             {editingArticle?.id === article.id ? (
//               <form onSubmit={(e) => {
//                 e.preventDefault();
//                 handleUpdate(editingArticle);
//               }}>
//                 <label>
//                   News Title:
//                   <input type="text" value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} required />
//                 </label>
//                 <br />
//                 <label>
//                   Synopsis:
//                   <textarea value={editingArticle.synopsis} onChange={(e) => setEditingArticle({ ...editingArticle, synopsis: e.target.value })} required />
//                 </label>
//                 <br />
//                 <label>
//                   URL:
//                   <input type="url" value={editingArticle.url} onChange={(e) => setEditingArticle({ ...editingArticle, url: e.target.value })} required />
//                 </label>
//                 <br />
//                 <button type="submit">Update Article</button>
//                 <button type="button" onClick={() => setEditingArticle(null)}>Cancel</button>
//               </form>
//             ) : (
//               <div>
//                 <h2>{article.title}</h2>
//                 <p>{article.synopsis}</p>
//                 <a href={article.url} target="_blank" rel="noopener noreferrer">{article.url}</a>
//                 <br /><br />
//                 <button onClick={() => handleEdit(article)}>Edit</button>
//                 <button onClick={() => handleDelete(article.id)}>Delete</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllNews;












import React, { useEffect, useState } from 'react';
import { getAllNews, deleteArticle, modifyArticle, createNewArticle } from '../services/newsServices';
import NewArticleForm from './NewArticleForm';

const AllNews = () => {
  // State variables to hold articles and the article being edited
  const [articles, setArticles] = useState([]);
  const [editingArticle, setEditingArticle] = useState(null);

  // Fetch articles from the database when the component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  // Function to fetch articles from the database
  const fetchArticles = async () => {
    const articles = await getAllNews();
    // Sort articles by timestamp in descending order
    setArticles(articles.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const handleArticleCreated = async (newArticle) => {
    try {
      const createdArticle = await createNewArticle(newArticle);
      setArticles(prevArticles => [createdArticle, ...prevArticles]); // Add the new article to the existing articles
    } catch (error) {
      console.error('Error creating article:', error.message);
    }
  };
  

  // Function to handle deletion of an article
  const handleDelete = async (id) => {
    // Delete the article from the database
    await deleteArticle(id);
    // After deletion, fetch articles again to update the list
    fetchArticles();
  };

  // Function to handle editing of an article
  const handleEdit = (article) => {
    // Set the article being edited
    setEditingArticle(article);
  };

  // Function to handle updating of an article
  const handleUpdate = async (updatedArticle) => {
    const { id, title, synopsis, url } = updatedArticle;
    // Update the article in the database
    await modifyArticle(id, { title, synopsis, url });
    // After update, reset editing state and fetch articles again to update the list
    setEditingArticle(null);
    fetchArticles();
  };

  return (
    <div>
      <h1>All News Articles</h1>
      {/* Render the form component to create new articles */}
      <NewArticleForm onArticleCreated={handleArticleCreated} />
      <div>
        {/* Map through the articles and render each one */}
        {articles.map(article => (
          <div key={article.id} className="article">
            {/* If an article is being edited, render its edit form */}
            {editingArticle?.id === article.id ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editingArticle);
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
              // If not editing, render the article details and options to edit or delete
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
  );
};

export default AllNews;

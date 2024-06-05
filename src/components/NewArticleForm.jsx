// import React, { useState } from 'react';
// import { createNewArticle } from '../services/newsServices';

// const NewArticleForm = ({ onArticleCreated }) => {
//   const [title, setTitle] = useState('');
//   const [synopsis, setSynopsis] = useState('');
//   const [url, setUrl] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newArticle = {
//       title,
//       synopsis,
//       url,
//       timestamp: new Date().toISOString(),
//       userId: 1 // Assuming user ID is 1 for simplicity
//     };
//     const createdArticle = await createNewArticle(newArticle);
//     onArticleCreated(createdArticle);
//     setTitle('');
//     setSynopsis('');
//     setUrl('');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         News Title:
//         <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//       </label>
//       <br />
//       <label>
//         Synopsis:
//         <textarea value={synopsis} onChange={(e) => setSynopsis(e.target.value)} required />
//       </label>
//       <br />
//       <label>
//         URL:
//         <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} required />
//       </label>
//       <br />
//       <button type="submit">Save Article</button>
//     </form>
//   );
// };

// export default NewArticleForm;


import React, { useState } from 'react';

const NewArticleForm = ({ onArticleCreated }) => {
  const [newArticle, setNewArticle] = useState({ title: '', synopsis: '', url: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle({ ...newArticle, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onArticleCreated(newArticle);
    setNewArticle({ title: '', synopsis: '', url: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        News Title:
        <input type="text" name="title" value={newArticle.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Synopsis:
        <textarea name="synopsis" value={newArticle.synopsis} onChange={handleChange} required />
      </label>
      <br />
      <label>
        URL:
        <input type="url" name="url" value={newArticle.url} onChange={handleChange} required />
      </label>
      <br />
      <button type="submit">Save Article</button>
    </form>
  );
};

export default NewArticleForm;

//getAllNews, createNewArticle,deleteArticle,modifyArticle 

// export const getAllNews = async () => {
//     const response = await fetch(`http://localhost:8088/articles`);
//     const data = await response.json();
//     return data;
//   };
  
//   export const createNewArticle = async (newArticle) => {
//     const response = await fetch(`http://localhost:8088/articles`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newArticle),
//     });
//     const data = await response.json();
//     return data;
//   };
  
//   export const deleteArticle = async (id) => {
//     await fetch(`http://localhost:8088/articles/${id}`, {
//       method: 'DELETE',
//     });
//   };
  
//   export const modifyArticle = async (article) => {
//     const response = await fetch(`http://localhost:8088/articles/${article.id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(article),
//     });
//     const data = await response.json();
//     return data;
//   };
  
  


const apiUrl = 'http://localhost:8088';

export const getAllNews = async () => {
  const response = await fetch(`${apiUrl}/articles`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  const data = await response.json();
  return data;
};

export const createNewArticle = async (article) => {
  const response = await fetch(`${apiUrl}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create article: ${errorText}`);
  }
  const data = await response.json();
  return data;
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${apiUrl}/articles/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete article');
  }
  return;
};

export const modifyArticle = async (id, updatedArticle) => {
  const response = await fetch(`${apiUrl}/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedArticle),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update article: ${errorText}`);
  }
  const data = await response.json();
  return data;
};



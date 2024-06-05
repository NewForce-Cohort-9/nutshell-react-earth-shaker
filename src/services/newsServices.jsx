export const getAllNews=()=>{
  return fetch(`http://localhost:8088/articles`).then ((res)=>res.json())}

export const createNewArticle = (article) => {
  return fetch('http://localhost:8088/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  }).then ((res)=>res.json())
  
}

export const deleteArticle=(id)=>{
  return fetch(`http://localhost:8088/articles/${id}`,{ 
  method: "DELETE",
})
}

// export const modifyArticle = (id, updatedArticle) => {
//   return fetch(`http://localhost:8088/articles/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedArticle),
//   }).then ((res)=>res.json())

// }


export const modifyArticle = async (id, updatedArticle, originalTimestamp) => {
  // Include the original timestamp in the updated article
  updatedArticle.timestamp = originalTimestamp;

  const response = await fetch(`http://localhost:8088/articles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedArticle),
  });
  
  return response.json();
};

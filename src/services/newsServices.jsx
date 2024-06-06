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


// export const modifyArticle = async (id) => { //, updatedArticle, originalTimestamp
//   // Include the original timestamp in the updated article
//   //updatedArticle.timestamp = originalTimestamp

// return fetch(`http://localhost:8088/articles/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(), //(updatedArticle)
//   }).then ((res)=>res.json())
  
//   //return response.json()
// }

//No:
// export const modifyArticle=async(editedArticleObject)=>{ 
//   const putOptions = {
//       method: "PUT",
//       headers: {"Content-Type": "application/json"
//   },body: JSON.stringify(editedArticleObject) 
// }
// const response = await fetch (`http://localhost:8088/articles/${editedArticleObject.id}`,putOptions) 
// }

export const modifyArticle = async (article) => {
  const response = await fetch(`http://localhost:8088/articles/${article.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });
  return response.json();
};
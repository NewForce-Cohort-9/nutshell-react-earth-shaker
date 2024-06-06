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

export const modifyArticle = async (article) => {
  const response = await fetch(`http://localhost:8088/articles/${article.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  })
  return response.json()
}
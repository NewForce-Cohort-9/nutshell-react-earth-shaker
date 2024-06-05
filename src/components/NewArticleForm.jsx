import  { useState } from 'react'

export const NewArticleForm = ({ onArticleCreated }) => {
  const [newArticle, setNewArticle] = useState({ title: '', synopsis: '', url: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewArticle({ ...newArticle, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const articleWithTimestamp = { ...newArticle, timestamp: new Date().toISOString() }
    await onArticleCreated(articleWithTimestamp)
    setNewArticle({ title: '', synopsis: '', url: '' })
  }

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
  )
}




import  { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'


const CreateBlog = () => {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [context, setContext] = useState('')
  const [error, setError] = useState(null)
  const [redirect, setRedirect] = useState(false)
  const [emptyFields, setEmptyFields] = useState([])
  const {user} = useAuthContext()


  // post new blog to server
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!user){
      setError('You need to be logged in')
      return
    }
    const blog = {title, summary, context}
    const response = await fetch('/api/blogs/', {
      method: 'POST',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    }
    })
    const json = await response.json()
    if(!response.ok){
      setError(json.error)
      setEmptyFields(json.emptyFields || [])
      setRedirect(false)
    }
    if(response.ok){
      setEmptyFields([])
      console.log('New blog has been added.')
      setRedirect(true)
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }
 
  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add New Blog</h3>
      <input
        type="text"
        placeholder='Blog Title'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
   
      <input
      type="text" 
      placeholder='Blog Summary'
      onChange={(e) => setSummary(e.target.value)}
      value={summary}
      className={emptyFields.includes('summary') ? 'error' : ''}
      />
    
      <textarea
      rows="10"
      placeholder="Start typing your blog content..."
      onChange={(e) => setContext(e.target.value)}
      value={context}
      className={emptyFields.includes('context') ? 'error' : ''}
      ></textarea>

<button>Add new blog</button>
      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default CreateBlog

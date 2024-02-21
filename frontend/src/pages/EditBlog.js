import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"

const EditBlog = () => {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [context, setContext] = useState('')
  const [redirect, setRedirect] = useState('')
  const {id} = useParams()
  const {user} = useAuthContext()

// load info of the blog you want to update
  useEffect(() => {
    const fetchBlogInfo = async () => {
      try{
        const response = await fetch(`/api/blogs/${id}`,{
          headers: {Authorization: `Bearer ${user.token}`}
        })
        const blogInfo = await response.json()
        setTitle(blogInfo.title)
        setSummary(blogInfo.summary)
        setContext(blogInfo.context)

      } catch(err) {
        throw Error('Error fetching blog details:', err)
      }
    }
    fetchBlogInfo()
  }, [id, user.token])

  // update post
  function updatePost(e) {
    e.preventDefault()
    const blog = {title, summary, context}
    fetch(`/api/blogs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(blog),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
    }
    })
    setRedirect(true)

  }


  if(redirect){
    return <Navigate to={'/blog/' + id} />
  }
  return (
    <form className="edit-page"  onSubmit={updatePost}>
      <h3>Edit Blog</h3>
      <input
        type="text"
        placeholder='Blog Title'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
   
      <input
      type="text" 
      placeholder='Blog Summary'
      onChange={(e) => setSummary(e.target.value)}
      value={summary}
      />
    
      <textarea
      rows="10"
      placeholder="Start typing your blog content..."
      onChange={(e) => setContext(e.target.value)}
      value={context}
      ></textarea>

      <button>Update post</button>
    </form>
  );
}

export default EditBlog

import React from 'react'
import { Link } from 'react-router-dom'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BlogDetails = ({blog}) => {
  return (
    <Link to={`/blog/${blog._id}`} className='blog-link'>
    <div className='blog-details'>
      <h4 className='blog-title'>{blog.title}</h4>
      <p className='blog-summary'>{blog.summary}</p>
      <p className='blog-createdat'>{formatDistanceToNow(new Date(blog.createdAt), { addSuffix: true })}</p>
   
  </div>
  </Link>
  )
}

export default BlogDetails

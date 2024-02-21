import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const BlogPage = () => {
  const [blogInfo, setBlogInfo] = useState('');
  const { user } = useAuthContext();
  const { id } = useParams();
  const [redirect, setRedirect] = useState('')

  useEffect(() => {
    const fetchBlogInfo = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.ok) {
          throw new Error('Unable to fetch blog details');
        }

        const blogInfo = await response.json();
        setBlogInfo(blogInfo);
      } catch (error) {
        console.error('Error fetching blog details:', error);
      }
    };

    fetchBlogInfo();
  }, [id, user.token]);

  const deleteBlog = async () => {
    try {
      const response = await fetch('/api/blogs/' + id, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${user.token}` },
      });
  
      if (response.status === 200) {
        setRedirect(true);
      } else {
        console.error('Error deleting blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
<div className="blog-page">
      {blogInfo && (
        <div className="blog">
          <Link className="goback" to={'/'}>
            Go back
          </Link>
          <div className="blog-info">
            <h1>{blogInfo.title}</h1>
            <p className="blog-createdat">
              {formatDistanceToNow(new Date(blogInfo.createdAt), {
                addSuffix: true,
              })}
            </p>
            {blogInfo.user && (
              <p>
                <strong>Created by:</strong> {blogInfo.user.email}
              </p>
            )}
          </div>
          <p className="context">{blogInfo.context}</p>
          {user.email === blogInfo.user.email ? (
            <div>
              <div className="buttons">
                <Link to={`/edit/${id}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button onClick={deleteBlog} className="delete-btn">
                  Delete
                </button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
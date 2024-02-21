import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="notfound">
            <h1>Oops!</h1>
            <h2>404 - Page not found</h2>
            <p> Page that you are looking for, might have been deleted.</p>
            <Link to="/">
                Go back
            </Link>
        </div>
  )
}

export default ErrorPage

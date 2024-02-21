import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()
  const handleClick = (e) => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link className='logo' to='/'>
          <h1>OurTravelBook</h1>
        </Link>
        {user && (
          <Link to='/createblog' className='nav-create'>Create new blog</Link>
        )}
        <nav>
          {user && (
            <div>
              <span>Hello, {user.email}</span>
              <button onClick={handleClick}>Logout</button>
            </div>
          )}
          {!user && (
            <div className='login-signup'>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Sign up</Link>
            </div>
          )}
          </nav>
      </div>
    </header>
  )
}

export default Navbar

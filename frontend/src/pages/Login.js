import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link } from "react-router-dom"


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text" 
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
       />
       <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
      <p>Don't have an account? <Link to={'/signup'}>Sign up</Link> </p>
    </form>

  )
}

export default Login

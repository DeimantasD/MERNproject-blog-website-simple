import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom"


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password)
  }
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h2>Sign up</h2>
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
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      <p>Already have an account? <Link to={'/login'}>Login</Link> </p>
    </form>

  )
}

export default Signup

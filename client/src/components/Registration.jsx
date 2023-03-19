import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import ErrorMessage from "./ErrorMessage"
import { checkUser, signUp } from "../api/registration"

const Registration = () => {
  const [ userData, setUserData] = useState({ username: "", email: "", password: ""})
  const [ errorMessage, setErrorMessage ] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const check = async () => {
        const response = await checkUser(userData)
        setErrorMessage(await response.json())
      }
      check()
    }, 500)
    return () => clearTimeout(timeout)
  }, [userData])

  const register = async (e) => {
    e.preventDefault()
    const response = await signUp(userData)
    if ( !response.status === 201 ) return setErrorMessage(await response.json())
    navigate("/login")
  }

  return (
    <form onSubmit={register}>
      <p>Sign Up</p>
      <label>Username
        <input type="text" placeholder="Enter your username" value={userData.username} onChange={(e) => setUserData({...userData, username: e.target.value})} />
      </label>
      <label>Email
        <input type="email" placeholder="Enter your email" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
      </label>
      <label>Password
        <input type="password" placeholder="●●●●●●●●" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})}/>
      </label>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      <button>Create account</button>
      <div>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </form>
  )
}

export default Registration
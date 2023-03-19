import { useState } from "react"
import { useOutletContext, useNavigate, Link } from "react-router-dom"
import ErrorMessage from "./ErrorMessage"
import login from "../api/login"

const Login = () => {
  const [ loginData, setLoginData] = useState({ username: "", password: ""})
  const [ errorMessage, setErrorMessage ] = useState("")
  const { setIsLoggedIn } = useOutletContext()
  const navigate = useNavigate()

  const logIn = async (e) => {
    e.preventDefault()
    const response = await login(loginData)
    if ( !response.ok ) return setErrorMessage(await response.json())
    const token = await response.json()
    localStorage.setItem("token", token)
    setIsLoggedIn(true)
    navigate("/")
  }

  return (
    <form onSubmit={logIn}>
      <p>Login</p>
      <label>Username
        <input type="text" placeholder="Enter your username or email" value={loginData.username} onChange={(e) => setLoginData({...loginData, username: e.target.value})} />
      </label>
      <label>Password
        <input type="password" placeholder="●●●●●●●●" value={loginData.password} onChange={(e) => setLoginData({...loginData, password: e.target.value})}/>
      </label>
      <Link to="/password-reset" className="password-reset">Forgot password?</Link>
      <ErrorMessage>{ errorMessage }</ErrorMessage>
      <button>Login</button>
      <div>
        <p>Don't have an account?</p>
        <Link to="/register">Sign up</Link>
      </div>
    </form>
  )
}

export default Login
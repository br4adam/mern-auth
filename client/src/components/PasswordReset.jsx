import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import Lottie from "lottie-react"
import emailAnimation from "../assets/email.json"
import { Link } from "react-router-dom"
import { resetPassword } from "../api/password"

const PasswordReset = () => {
  const [ username, setUsername ] = useState("")
  const [ emailSent, setEmailSent ] = useState(false)
  const [ errorMessage, setErrorMessage ] = useState("")

  const resetRequest = async (e) => {
    e.preventDefault()
    const response = await resetPassword(username)
    if ( !response.ok ) return setErrorMessage(await response.json())
    setEmailSent(true)
    setErrorMessage("")
  }

  return (
    <form onSubmit={resetRequest}>
      <p>Forgot password?</p>
      { emailSent 
      ? <div className="success-message">
          <Lottie animationData={emailAnimation} style={{ width: "26rem", margin: "-5rem 0 -3rem"}} />
          <p>E-mail has been sent.</p>
        </div> 
      : <>
          <label>Username
            <input type="text" placeholder="Enter your username or email" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <ErrorMessage>{ errorMessage }</ErrorMessage>
          <button>Reset password</button>
          <div>
            <p>Remember password?</p>
            <Link to="/login">Login</Link>
          </div>
        </>
      }
    </form>
  )
}

export default PasswordReset
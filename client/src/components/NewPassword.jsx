import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import Lottie from "lottie-react"
import passwordAnimation from "../assets/password.json"
import { useSearchParams, useNavigate } from "react-router-dom"
import { createNewPassword } from "../api/password"

const PasswordReset = () => {
  const [ newPassword, setNewPassword ] = useState("")
  const [ passwordAgain, setPasswordAgain ] = useState("")
  const [ errorMessage, setErrorMessage ] = useState("")
  const [ passwordSaved, setPasswordSaved ] = useState(false)
  const navigate = useNavigate()

  const [ searchParams ] = useSearchParams()
  const code = searchParams.get("code")
  const username = searchParams.get("user")

  const passwordReset = async (e) => {
    e.preventDefault()
    const response = await createNewPassword(username, newPassword, passwordAgain, code)
    if ( !response.ok ) return setErrorMessage(await response.json())
    setPasswordSaved(true)
    setTimeout(() => navigate("/login"), 4000)
  }

  return (
    <form onSubmit={passwordReset}>
      <p>Password reset</p>
      { passwordSaved 
        ? <div className="success-message">
            <Lottie animationData={passwordAnimation} loop={false} style={{ width: "16rem", marginTop: "-1rem" }} />
            <p>Your password has been changed.</p>
          </div> 
        : <>
            <label>New password
              <input type="password" placeholder="●●●●●●●●" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </label>
            <label>Confirm new password
              <input type="password" placeholder="●●●●●●●●" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} />
            </label>
            <ErrorMessage>{ errorMessage }</ErrorMessage>
            <button>Reset</button>
          </>
      }
    </form>
  )
}

export default PasswordReset
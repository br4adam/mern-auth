import { useEffect, useState } from "react"
import ErrorMessage from "./ErrorMessage"
import Lottie from "lottie-react"
import confirmAnimation from "../assets/confirm.json"
import { useSearchParams, useNavigate } from "react-router-dom"
import confirm from "../api/confirm"

const Confirm = () => {
  const [ errorMessage, setErrorMessage ] = useState("")
  const navigate = useNavigate()

  const [ searchParams ] = useSearchParams()
  const code = searchParams.get("code")
  const username = searchParams.get("user")

  useEffect(() => {
    const confirmRegistration = async () => {
      const response = await confirm(username, code)
      if ( !response.ok ) return setErrorMessage(await response.json())
      setTimeout(() => navigate("/login"), 4000)
    }
    confirmRegistration()
  }, [])

  return (
    <div className="confirm">
      <p>{ errorMessage ? "Confirmation" : "Congratulations!" }</p>
      { !errorMessage && 
        <div className="success-message">
          <Lottie animationData={confirmAnimation} loop={false} style={{ width: "16rem", marginBottom: "2rem" }} />
          <p>Your account has been successfully created.</p>
        </div>
      } 
      <ErrorMessage>{ errorMessage }</ErrorMessage>
    </div>
  )
}

export default Confirm
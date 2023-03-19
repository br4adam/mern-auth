import { BiError } from "react-icons/bi"

const ErrorMessage = ({ children }) => {
  return (
    <>
    { children && 
      <div className="error-message">
        <BiError />
        { children }
      </div>
    }
    </>
  )
}

export default ErrorMessage
import { NavLink, Link } from "react-router-dom"
import { FaHome } from "react-icons/fa"

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

  const logOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem("token")
  }

  return (
    <nav>
      <Link to="/"><FaHome />Home</Link>
      <div className="buttons">
        { !isLoggedIn ? <>
            <NavLink to="register">Register</NavLink>
            <NavLink to="login">Login</NavLink>
          </>
          : <button onClick={logOut}>Logout</button> }
      </div>
    </nav>
  )
}

export default Navbar
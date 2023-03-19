import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Buttons from "../components/Buttons"

const RootLayout = () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true)
  }, [])

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <main>
        <Outlet context={{setIsLoggedIn}} />
        <Buttons isLoggedIn={isLoggedIn} />
      </main>
    </>
  )
}

export default RootLayout
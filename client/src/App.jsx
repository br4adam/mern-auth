import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Registration from "./components/Registration"
import Login from "./components/Login"
import PasswordReset from "./components/PasswordReset"
import NewPassword from "./components/NewPassword"
import Confirm from "./components/Confirm"
import RootLayout from "./layouts/RootLayout"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Registration />} />
      <Route path="password-reset" element={<PasswordReset />} />
      <Route path="reset" element={<NewPassword />} />
      <Route path="confirm" element={<Confirm />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App

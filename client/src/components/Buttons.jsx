import { useState } from "react"
import { getPublic, getPrivate } from "../api/content"

const Buttons = ({ isLoggedIn }) => {
  const [ data, setData ] = useState("")

  const getPublicData = async () => {
    const response = await getPublic()
    const data = await response.json()
    setData(data)
  }

  const getPrivateData = async () => {
    const response = await getPrivate()
    if ( !response.ok ) setData("Cannot load data.")
    const data = await response.json()
    setData(data)
  }

  return (
    <>
      <div className="buttons-container">
        <button onClick={getPublicData}>Public</button>
        { isLoggedIn && <button onClick={getPrivateData}>Private</button> }
      </div>
      <p>{data}</p>
    </>
  )
}

export default Buttons
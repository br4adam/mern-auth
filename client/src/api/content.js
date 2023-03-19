const getPublic = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/public")
    return response
  } catch (error) {
    console.log(error)
  }
}

const getPrivate = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/private", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export { getPublic, getPrivate }
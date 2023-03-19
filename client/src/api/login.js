const login = async (loginData) => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export default login
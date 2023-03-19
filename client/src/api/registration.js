const checkUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/signup/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

const signUp = async (userData) => {
  try {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export { checkUser, signUp }
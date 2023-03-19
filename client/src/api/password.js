const createNewPassword = async (username, newPassword, passwordAgain, code) => {
  try {
    const response = await fetch("http://localhost:3000/api/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, newPassword, passwordAgain, code })
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

const resetPassword = async (username) => {
  try {
    const response = await fetch("http://localhost:3000/api/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export { createNewPassword, resetPassword }
const confirm = async (username, code) => {
  try {
    const response = await fetch("http://localhost:3000/api/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, code })
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

export default confirm
const express = require("express")
const router = express.Router()
const users = require("../../fakeDB/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const secretKey = "my_secret_key"

function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username)
  if (!user) {
    return null
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) {
    return null
  }
  return { id: user.id, username: user.username }
}

router.post("/login", (req, res) => {
  //we generate the salt for the password
  const { username, password } = req.body

  const user = authenticateUser(username, password)

  if (!user) return res.status(401).send({ message: "Invalid username or password" })

  const accessToken = jwt.sign(user, secretKey, { expiresIn: "1d" })

  res.send({ accessToken })
})

module.exports = router

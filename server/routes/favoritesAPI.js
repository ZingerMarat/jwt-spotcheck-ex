const express = require("express")
const router = express.Router()
const users = require("../../fakeDB/users")

const secretKey = "my_secret_key"

router.get("/animals", (req, res) => {
  try {
    const user = findUser(req.user.id, req.user.username)
    console.log(user)
    const favAnimal = { animal: user.animal }
    console.log(favAnimal)
    res.send(favAnimal)
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: "Invalid token" })
  }
})

function findUser(id, username) {
  return users.filter((user) => user.id === id && user.username === username)[0]
}

module.exports = router

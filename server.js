const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const loginRouter = require("./server/routes/loginAPI")
const favRouter = require("./server/routes/favoritesAPI")
const jwt = require("jsonwebtoken")

const secretKey = "my_secret_key"

const app = express()
app.use(express.static(path.join(__dirname, "dist")))
app.use(express.static(path.join(__dirname, "node_modules")))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Middleware function
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.sendStatus(401)
    }
    //defnie which user is this after token authentication
    req.user = decoded
    next()
  })
}

app.get("/sanity", (req, res) => {
  res.send("Alive and running")
})

app.use("/", loginRouter)
app.use("/favorites", authenticateToken, favRouter)

app.listen(3000, () => {
  console.log("Server started on port 3000")
})

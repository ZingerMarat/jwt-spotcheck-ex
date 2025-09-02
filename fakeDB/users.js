const bcrypt = require("bcryptjs")

const users = [
  {
    id: 1,
    username: "ameerj",
    password: "password", // hashed password: 'password'
    animal: "cat",
  },
  {
    id: 2,
    username: "lotemh",
    password: "123456", // hashed password: '123456'
    animal: "owl",
  },
]

//we generate the salt for the password
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)

users.forEach((user) => {
  const hashedPassword = bcrypt.hashSync(user.password, salt)
  user.password = hashedPassword
})

module.exports = users

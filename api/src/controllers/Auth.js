const { Users } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authRegister = async (req, res) => {
  try {
    const { fullname, email, password } = req.body
    const findEmail = await Users.findOne({ where: { email: email } })
    if (!findEmail) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const user = await Users.create({
        fullname,
        email: email.toLowerCase(),
        password: encryptedPassword,
      })
      const token = jwt.sign({ user_id: user.id, email }, "secret", { expiresIn: "10h" });
      user.token = token;
      res.send({
        "message": "Account created successfully!",
        "token": token
      })
    } else {
      return res.status(404).send('The email is already registered')
    }
  } catch (error) {
    console.log(error)
  }
};

const authLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log("le llega: ", req.body)
    const findUser = await Users.findOne({ where: { email: email } })
    if (findUser && (await bcrypt.compare(password, findUser.password))) {
      const token = jwt.sign({ user_id: findUser.id, email }, "secret", { expiresIn: "10h" });
      findUser.token = token;
      res.status(201).json({
        "user": findUser,
        "token": token
      })
    } else {
      return res.status(404).send('User incorrect')
    }
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  authRegister,
  authLogin
};
const { Router } = require('express');
const router = Router();
const { Dogs, Temperaments, Users, Comments } = require('../db')
const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getDb = async () => {
  const dbData = await Dogs.findAll()
  return dbData
}

router.get('/dogs', async (req, res) => {
  try {
    const runDb = await getDb()
    if (!runDb.length) {
      const infoApi = await axios.get('https://api.thedogapi.com/v1/breeds')
      const dateDog = infoApi.data.map(d => {
        return {
          id: d.id,
          name: d.name,
          weight: d.weight.imperial,
          bred_for: d.bred_for,
          breed_group: d.breed_group ? d.breed_group : "",
          life_span: d.life_span,
          temperament: d.temperament ? d.temperament : "empty",
          origin: d.origin ? d.origin : "",
          image: d.image.url
        }
      })
      const container = await Dogs.bulkCreate(dateDog)
      res.status(200).send(container)
    } else {
      const { name } = req.query
      if (name) {
        const searchDb = runDb.filter(n => n.name.toLowerCase().includes(name.toLowerCase()))
        searchDb.length ? res.status(200).send(searchDb) : res.status(404).send("Not result")
      }
      else {
        res.status(200).send(runDb)
      }
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/temperaments', async (req, res) => {
  try {
    const getTemperament = await axios('https://api.thedogapi.com/v1/breeds')
    const allTemperaments = getTemperament.data.map(t => t.temperament ? t.temperament : "No temper").toString().split(",")
    const mapTemperaments = allTemperaments.map(t => t.trim())
    mapTemperaments.forEach(t => {
      Temperaments.findOrCreate({
        where: {
          name: t
        }
      })
    })
    const result = await Temperaments.findAll({ attributes: ["id", "name"] });
    res.send(result)
  } catch (error) {
    console.log(error)
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await Users.findAll()
    users.length ? res.send(users) : res.status(404).send("There are no registered users")
  } catch (error) {
    console.log(error)
  }
})

router.get('/dogs/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (id) {
      const dogId = await Dogs.findOne({
        where: {
          id: id
        },
        include: Temperaments
      })
      dogId ? res.status(200).send(dogId) : res.status(404).send("Not result")
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/dogs', async (req, res) => { // revisar esta ruta
  try {
    console.log("le llega: ", req.body)
    const { name, weight, bred_for, breed_group, life_span, origin, image, temperament } = req.body
    let id = Math.round(Math.random()*10000)
    let createDog = await Dogs.create({
      id,
      name,
      weight,
      bred_for,
      breed_group,
      life_span,
      origin,
      image
    })
    const temperamentsDb = await Temperaments.findAll({ where: { name: temperament } })
    console.log("temperamentsDb: ", temperamentsDb)
    createDog.addTemperaments(temperamentsDb)
    res.send("Dog created")
  } catch (error) {
    console.log(error)
  }
})

router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body
    console.log("email: ", email)
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
})

router.post('/login', async (req, res) => {
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
})

router.post('/comments', async (req, res) => {
  try {
    console.log("le llega: ", req.body)
    const createComment = await Comments.create({
      comment: req.body.comment,
      UserId: req.body.userId,
      DogId: req.body.id
    })
    const container = await Comments.findAll({
      where: {
        DogId: req.body.id
      }
    })
    res.send(container)
  } catch (error) {
    console.log(error)
  }
})

router.get('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params
    const container = await Comments.findAll({
      where: {
        DogId: id
      }, include: Users
    })
    container.length ? res.send(container) : res.status(404).send('Comments not existent')
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;




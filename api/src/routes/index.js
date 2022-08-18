const { Router } = require('express');
const router = Router();
const { Dogs, Temperaments } = require('../db')
const axios = require('axios');

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
        console.log("busqueda: ", searchDb)
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
})

router.get('/dogs/:id', async (req, res) => {
  try {
    const id = req.params.id
    if (id) {
      const dogId = await Dogs.findOne({
        where: {
          id: id
        }
      })
      console.log("dogId: ", dogId)
      dogId ? res.status(200).send(dogId) : res.status(404).send("Not result")
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/dogs', async (req, res) => {
  try {
    console.log("le llega: ", req.body)
    const { name, weight, bred_for, breed_group, life_span, origin, image, temperament } = req.body
    const id = 222244
    let createDog = await Dogs.create({
      where: {
        id: id,
        name,
        weight,
        bred_for,
        breed_group,
        life_span,
        origin,
        image
      }
    })
    const temperamentsDb = await Temperaments.findAll({ where: { name: temperament } })
    console.log("temperamentsDb: ", temperamentsDb)
    createDog.addTemperaments(temperamentsDb)
    res.send("Dog created")
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;




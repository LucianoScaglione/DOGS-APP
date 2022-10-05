const { Dogs, Temperaments } = require('../db');
const axios = require('axios');

const getDb = async () => {
  const dbData = await Dogs.findAll()
  return dbData
};

const findAll = async (req, res) => {
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
};

const findOne = async (req, res) => {
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
};

const create = async (req, res) => {
  try {
    const { name, weight, bred_for, breed_group, life_span, origin, image, temperaments } = req.body
    let id = Math.round(Math.random() * 10000)
    let createDog = await Dogs.create({
      id,
      name,
      weight,
      bred_for,
      breed_group,
      life_span,
      origin,
      image: image.map(i => i.url).join(''),
      temperament: temperaments.join(', '),
      createdInDb: true
    })
    const temperamentsDb = await Temperaments.findAll({ where: { name: temperaments } })
    await createDog.addTemperaments(temperamentsDb)
    res.send("Dog created")
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  findAll,
  findOne,
  create
};
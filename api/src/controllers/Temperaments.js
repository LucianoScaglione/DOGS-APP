const { Temperaments } = require('../db');
const axios = require('axios');

const allTemperaments = async (req, res) => {
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
};

module.exports = {
  allTemperaments
};
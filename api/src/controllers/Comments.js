const { Users, Comments } = require('../db');

const getCommentsByDog = async (req, res) => {
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
};

const createComment = async (req, res) => {
  try {
    console.log("le llega: ", req.body)
    await Comments.create({
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
};

module.exports = {
  getCommentsByDog,
  createComment
};
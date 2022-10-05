const { Users } = require('../db');

const findAllUsers = async (req, res) => {
    try {
        const users = await Users.findAll()
        users.length ? res.send(users) : res.status(404).send("There are no registered users")
    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    findAllUsers
};


require('dotenv');
const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

const login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        throw new BadRequestError('Please provide username or/and password');
    }

    // Just for demo, normally provided by DB
    const id = new Date().getDate()

    // Try to keep payload small, better experience for user
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(200).send({msg: 'User created', token});

};

const dashboard = async (req, res) => {
    const luckyNumber =  Math.floor(Math.random()*100);
        
    res.status(200).json({msg: `Hello ${req.user.username},`, secret: `Here your authorized data, your lucky number is ${luckyNumber}`});
};

module.exports = {
    login,
    dashboard
};
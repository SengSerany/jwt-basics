require('dotenv');
const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        throw new CustomAPIError('Please provide username or/and password', 400);
    }

    // Just for demo, normally provided by DB
    const id = new Date().getDate()

    // Try to keep payload small, better experience for user
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(200).send({msg: 'User created', token});

};

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 400)
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const luckyNumber =  Math.floor(Math.random()*100);
        
        res.status(200).json({msg: `Hello ${decoded.username},`, secret: `Here your authorized data, your lucky number is ${luckyNumber}`});
    } catch (error) {
        throw new CustomAPIError('Not authorized access to this route', 401)
    }

   
};

module.exports = {
    login,
    dashboard
};
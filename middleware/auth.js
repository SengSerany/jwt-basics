const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 400)
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const { id, username } = decoded
        req.user = { id, username }
        next();
       
    } catch (error) {
        throw new CustomAPIError('Not authorized access to this route', 401)
    }
}

module.exports = authenticationMiddleware;
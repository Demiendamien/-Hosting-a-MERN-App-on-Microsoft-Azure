import jwt from 'jsonwebtoken'
import User from '../models/userModel'
import asyncHandler from './asyncHandler'

const authenticate = asyncHandler(async(req, res, next) =>{
    let token;

    // Read JWT from teh 'jwt' cookie

    token = req.cookies.jwt;


    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
            
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed.")
        }   
    } else {
        res.status(401)
        throw new Error("Not authorized, no token.")
    }
});

const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401).send("not authorized as an admin")
    }
}


export {authenticate, authorizeAdmin};
import jwt from 'jsonwebtoken';
import {User} from '../models/userModel.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized access, no token provided'});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(400).json({message: 'User not found'});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({message: 'Internal server error'});
    }
}
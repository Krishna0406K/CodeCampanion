import user from '../models/userModel.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) =>{
    const{name, email, password} = req.body;
    try {
        const existUser = await user.findOne({email});
        if(existUser){
            return res.status(400).json({message: "User already exists"});
        };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await user.create({name, email, password: hashedPassword});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
        res.status(201).json({message: 'User registered successfully', user: newUser, token});

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const login = async (req, res) =>{
    const { email, password} = req.body;
    try {
        const existUser = await user.findOne({email});
        if(!existUser){
            return res.status(400).json({message: 'User does not exist'});
        }
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (isMatch) {
            const token = jwt.sign({id: existUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'});
            return res.status(200).json({message: 'Login successful', user: existUser, token});
        } else {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
}
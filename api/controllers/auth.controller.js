import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body;

    if(!username || !email || !password || username=="" || email=="" || password==""){
       next(errorHandler(400,'All fields are required'));
    }

    const hashedPassword =  bcryptjs.hashSync(password,10);

    const newUser  = new User({
        username,
        email,
        password : hashedPassword

    });

    try {
        await newUser.save();
        res.json('signup succuesfuly');
    } catch (error) {
        next(error);
    }

 
};

export const signin = async(req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password || email==="" || password===""){
        next(errorHandler(400,'All fields are required'));
    }
    try {
        const validUser = await User.findOne({email})
        if(!validUser){
            next(errorHandler(400,'Invalid email or password'));
        }
        
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            next(errorHandler(400,'Invalid email or password'));
        }

    } catch (error) {
        next(error);
    }
        
};
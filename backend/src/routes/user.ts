import { Application, Request, Response } from "express"
import { Router } from "express";
import { User } from "../schema/userSchema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;

const userRouter = Router();


userRouter.post("/signup", async function(req: Request, res: Response): Promise<Response | any> {

    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({
            email
        })
        if(existingUser) {
            return res.status(403).json({
                msg: "user alreaady exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            firstName, 
            lastName,
            password: hashedPassword
        })

        const token = await jwt.sign({ userId: user._id }, SECRET )

        return res.json({
            user,
            token: token,
            msg: "signed up successfully"
        })
    } catch (error) {
        console.log("signup failed")
    }
})

userRouter.post("/signin", async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(411).json({
                msg: "user not found"
            });
        }
        if(!existingUser.password){
            return res.status(411).json({
                msg: "password not found"
            })
        }

        const isPassCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPassCorrect) {
            return res.status(411).json({
                msg: "incorrect password"
            });
        }

        const token = jwt.sign({ userId: existingUser._id }, SECRET);
        return res.status(200).json({
            token,
            msg: "signed in successfully"
        });
    } catch (error) {
        console.log("signin failed")
    }
});


userRouter.get("/purchases", async (req: Request, res: Response) => {
    res.json({
        msg: "inside signup"
    })
})


export { userRouter }
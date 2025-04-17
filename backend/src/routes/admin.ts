import { Router, Request, Response } from "express";
import { adminModel } from "../schema/adminSchema";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { courseModel } from "../schema/courseSchema";

dotenv.config();
const SECRET = process.env.JWT_SECRET as string;
const adminRouter = Router();


adminRouter.post("/signup", async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingAdmin = await adminModel.findOne({ email })

        if(existingAdmin){
            return res.status(403).json({
                msg: "admin already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("after hadshing pass")

        const admin = await adminModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        const token = await jwt.sign({ adminId: admin._id }, SECRET)
        return res.json({
            msg: "admin signed up successfully",
            token: token,
            admin
        });

    } catch (error) {
        console.log("admin signup failed")
    }
})

adminRouter.post("/signin", async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });

        if(!admin){
            return res.status(411).json({
                msg: "admin not found"
            })
        }
        if(!admin.password){
            return res.status(411).json({
                msg: "password not found"
            })
        }

        const isPassCorrect = await bcrypt.compare( password, admin.password );
        if(!isPassCorrect){
            return res.json({
                msg: "invalid password"
            })
        }

        const token = await jwt.sign({ adminId: admin._id }, SECRET);
        return res.json({
            token: token,
            msg: "admin signin succeeded"
        })
    } catch (error) {
        
        console.log("admin signin failed", error)
    }




    // const hashedPassword = bcrypt.hash(existingUser.password, 10)
})


adminRouter.post("/course", adminMiddleware, async (req: Request, res: Response): Promise<Response | any> => {
    try {
        const adminId = req.adminId;

        const { title, description, imageUrl, price } = req.body;
        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        })

        res.json({
            msg: "Course created",
            courseId: course._id
        })
    } catch (error) {
        console.log("course creation failed")
    }

})

adminRouter.put("/course", adminMiddleware, async (req: Request, res: Response) => {
    
    const { title, description, imageUrl, price } = req.body;

    
})

adminRouter.get("/courses/bulk", async (req: Request, res: Response) => {
    res.json({
        msg: "admin signin"
    })
})

export { adminRouter }
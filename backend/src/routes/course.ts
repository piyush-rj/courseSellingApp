import { Request, Response, Router } from "express";
import { courseModel } from "../schema/courseSchema";

const courseRoute = Router();

courseRoute.post("/purchase", async(req: Request, res: Response) => {

})

courseRoute.get("/all", async(req: Request, res: Response) => {
    res.json({
        msg: "these are all courses"
    })
})



export { courseRoute };
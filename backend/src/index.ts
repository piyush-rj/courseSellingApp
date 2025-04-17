import express from "express"
import { userRouter } from "./routes/user"
import { courseRoute } from "./routes/course";
import { adminRouter } from "./routes/admin";
import { connectDB } from "./db";

const app = express()
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/course", courseRoute)
app.use("/api/admin", adminRouter)


const startServer = async () => {
    try {
        await connectDB();
        app.listen(3000, () => {
            console.log("server running on port 3000")
        })
    } catch (error) {
        console.log("server connection failed")
    }
}

startServer();
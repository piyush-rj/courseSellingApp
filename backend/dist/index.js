"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const course_1 = require("./routes/course");
const admin_1 = require("./routes/admin");
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/user", user_1.userRouter);
app.use("/api/course", course_1.courseRoute);
app.use("/api/admin", admin_1.adminRouter);
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        app.listen(3000, () => {
            console.log("server running on port 3000");
        });
    }
    catch (error) {
        console.log("server connection failed");
    }
});
startServer();

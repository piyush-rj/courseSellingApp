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
exports.userRouter = void 0;
const express_1 = require("express");
const userSchema_1 = require("../schema/userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET;
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/signup", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstName, lastName, email, password } = req.body;
            const existingUser = yield userSchema_1.User.findOne({
                email
            });
            if (existingUser) {
                return res.status(403).json({
                    msg: "user alreaady exists"
                });
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const user = yield userSchema_1.User.create({
                email,
                firstName,
                lastName,
                password: hashedPassword
            });
            const token = yield jsonwebtoken_1.default.sign({ userId: user._id }, SECRET);
            return res.json({
                user,
                token: token,
                msg: "signed up successfully"
            });
        }
        catch (error) {
            console.log("signup failed");
        }
    });
});
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const existingUser = yield userSchema_1.User.findOne({ email });
        if (!existingUser) {
            return res.status(411).json({
                msg: "user not found"
            });
        }
        if (!existingUser.password) {
            return res.status(411).json({
                msg: "password not found"
            });
        }
        const isPassCorrect = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!isPassCorrect) {
            return res.status(411).json({
                msg: "incorrect password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: existingUser._id }, SECRET);
        return res.status(200).json({
            token,
            msg: "signed in successfully"
        });
    }
    catch (error) {
        console.log("signin failed");
    }
}));
userRouter.get("/purchases", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: "inside signup"
    });
}));

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
exports.adminRouter = void 0;
const express_1 = require("express");
const adminSchema_1 = require("../schema/adminSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET;
const adminRouter = (0, express_1.Router)();
exports.adminRouter = adminRouter;
adminRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingAdmin = yield adminSchema_1.adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(403).json({
                msg: "admin already exists"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        console.log("after hadshing pass");
        const admin = yield adminSchema_1.adminModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        const token = yield jsonwebtoken_1.default.sign({ adminId: admin._id }, SECRET);
        return res.json({
            msg: "admin signed up successfully",
            token: token,
            admin
        });
    }
    catch (error) {
        console.log("admin signup failed");
    }
}));
adminRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield adminSchema_1.adminModel.findOne({ email });
        if (!admin) {
            return res.status(411).json({
                msg: "admin not found"
            });
        }
        if (!admin.password) {
            return res.status(411).json({
                msg: "password not found"
            });
        }
        const isPassCorrect = yield bcrypt_1.default.compare(password, admin.password);
        if (!isPassCorrect) {
            return res.json({
                msg: "invalid password"
            });
        }
        const token = yield jsonwebtoken_1.default.sign({ adminId: admin._id }, SECRET);
        return res.json({
            token: token,
            msg: "admin signin succeeded"
        });
    }
    catch (error) {
        console.log("admin signin failed", error);
    }
    // const hashedPassword = bcrypt.hash(existingUser.password, 10)
}));
adminRouter.post("/course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: "admin signin"
    });
}));
adminRouter.put("/course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: "admin signin"
    });
}));
adminRouter.get("/courses/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: "admin signin"
    });
}));

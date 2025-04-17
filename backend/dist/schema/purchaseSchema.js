"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const purchaseSchema = new mongoose_1.default.Schema({
    userId: mongoose_1.default.Types.ObjectId,
    courseId: mongoose_1.default.Types.ObjectId,
});
exports.purchaseModel = mongoose_1.default.model("purchase", purchaseSchema);

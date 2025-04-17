import mongoose, { Schema } from "mongoose";

const purchaseSchema = new mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    courseId: mongoose.Types.ObjectId,
})

export const purchaseModel = mongoose.model("purchase", purchaseSchema)
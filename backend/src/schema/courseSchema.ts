import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },

    imageUrl: {
        type: String
    },

    creatorId: mongoose.Types.ObjectId

})

export const courseModel = mongoose.model("course", courseSchema)
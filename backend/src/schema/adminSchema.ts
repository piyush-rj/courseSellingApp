import mongoose, { Schema } from "mongoose";

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    }

})

export const adminModel = mongoose.model("admin", adminSchema)
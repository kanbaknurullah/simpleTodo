import mongoose from "mongoose";
const { Schema } = mongoose;
const todoSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
})

export default mongoose.model("Todo", todoSchema);
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant', 'tool'],
        required: true
    },
    conten: {
        type: String,
        required: true
    },
    conversation: {
        type: mongoose.Types.ObjectId,
        ref: "Conversation"
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } });


export const MessageModel = mongoose.model('Message', messageSchema);
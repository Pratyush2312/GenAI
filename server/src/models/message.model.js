import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'assistant', 'tool'],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: false } });


export const MessageModel = mongoose.model('Message', messageSchema);
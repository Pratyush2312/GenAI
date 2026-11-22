import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    lastMessage: {
        type: Date,
        default: null
    }
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'lastUpdated' } })

export const ConversationModel = mongoose.model('Conversation', conversationSchema);
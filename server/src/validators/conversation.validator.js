import { body } from "express-validator";

/** Validation chain for creating a conversation message. */
export const conversationValidator = [
  body("content")
    .trim()
    .exists()
    .withMessage("Content is required")
    .bail()
    .isString()
    .withMessage("Content must be a string"),
  body("conversation")
    .optional({ values: null })
    .isMongoId()
    .withMessage("Conversation must be a valid MongoDB ObjectId")
];

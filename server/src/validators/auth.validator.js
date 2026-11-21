import { body } from "express-validator";

/** Validation chain for account registration. */
export const registerValidator = [
  body("name").trim().notEmpty().withMessage("Name is required").bail().isLength({ min: 2, max: 50 }).withMessage("Name must be between 2 and 50 characters"),
  body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters").bail().matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage("Password must contain a letter and a number")
];

/** Validation chain for login credentials. */
export const loginValidator = [
  body("email").isEmail().withMessage("Enter a valid email address").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required")
];

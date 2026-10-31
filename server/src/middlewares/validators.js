import { body, validationResult } from "express-validator"


export const validatePlayer = [
    body("player")
        .trim()
        .notEmpty().withMessage("Player is required").bail()
        .isLength({max: 20}).withMessage("Player must be 20 characters max"),
]

// -----------
export function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
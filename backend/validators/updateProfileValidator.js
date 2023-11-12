const { body, validationResult } = require('express-validator');

const updateProfileValidator = [
    body('username').isString().isLength({ min: 1, max: 15 }).optional(),
    body('email').isEmail().optional(),
    body('name').isString().optional(),
    body('avatar').isURL().optional(),
    body('bio').isString().optional(),
    body('birthday').isDate().optional(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Syntax error' });
        }
        next();
    }
];

module.exports = updateProfileValidator;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const response_1 = require("../utils/response");
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message).join(', ');
            res.status(400).json(response_1.ApiResponseBuilder.error('Validation failed', errorMessage));
            return;
        }
        next();
    };
};
exports.validate = validate;
//# sourceMappingURL=validation.js.map
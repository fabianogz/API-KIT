"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCondicional = void 0;
const auth_1 = require("./auth");
const ROTAS_PUBLICAS = [
    '/',
    '/favicon.ico'
];
const authCondicional = (req, res, next) => {
    if (ROTAS_PUBLICAS.includes(req.path)) {
        return next();
    }
    return (0, auth_1.apiKeyAuth)(req, res, next);
};
exports.authCondicional = authCondicional;
//# sourceMappingURL=authCondicional.js.map
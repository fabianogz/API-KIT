"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_1 = __importDefault(require("./health"));
const router = (0, express_1.Router)();
router.use('/api/v1', health_1.default);
router.get('/', (req, res) => {
    res.json({
        name: 'API Kit',
        version: '1.0.0',
        description: 'Base dinâmica para criação de APIs modernas, com autenticação opcional, modularidade e foco em performance.',
        endpoints: {
            health: '/api/v1/health',
            status: '/api/v1/status'
        },
        documentation: {
            readme: 'README.md',
            examples: 'EXAMPLES.md',
            bestPractices: 'BOAS_PRATICAS.md'
        }
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map
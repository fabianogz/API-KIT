"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const healthController_1 = require("../controllers/healthController");
const router = (0, express_1.Router)();
router.get('/health', healthController_1.HealthController.getHealth);
router.get('/status', healthController_1.HealthController.getStatus);
exports.default = router;
//# sourceMappingURL=health.js.map
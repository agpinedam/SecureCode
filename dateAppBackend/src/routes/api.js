"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dateController_1 = require("../controllers/dateController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1["default"].Router();
// Ruta protegida que requiere autenticación
router.get('/date', authMiddleware_1.authenticateToken, dateController_1.getCurrentDate);
exports["default"] = router;

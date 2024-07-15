"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var router = express_1["default"].Router();
var users = [{ username: 'user1', passwordHash: '$2a$10$Q2ivlEYy4I2S.4Yr1X6SOu7jQ8K6P8Dd5rwX09DzQiaX8lZ1X87My' }];
router.post('/login', function (req, res) {
    // Autenticación de usuario
    var _a = req.body, username = _a.username, password = _a.password;
    var user = users.find(function (u) { return u.username === username; });
    if (!user) {
        return res.status(404).send('Usuario no encontrado');
    }
    bcryptjs_1["default"].compare(password, user.passwordHash, function (err, result) {
        if (err || !result) {
            return res.status(401).send('Credenciales inválidas');
        }
        // Generación del token JWT
        var accessToken = jsonwebtoken_1["default"].sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken }); // Envía el token JWT al cliente
    });
});
exports["default"] = router;

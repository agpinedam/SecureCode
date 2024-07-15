"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.authenticateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401); // Unauthorized si no hay token
    }
    jsonwebtoken_1["default"].verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, user) {
        if (err) {
            return res.sendStatus(403); // Forbidden si hay un error en la verificación del token
        }
        req.user = user; // Asigna el usuario decodificado al objeto 'user' en 'req'
        next(); // Pasa al siguiente middleware o controlador
    });
};
exports.authenticateToken = authenticateToken;

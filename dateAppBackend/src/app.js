"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var api_1 = __importDefault(require("./routes/api"));
var auth_1 = __importDefault(require("./routes/auth"));
var app = (0, express_1["default"])();
var PORT = process.env.PORT || 5000;
// Middleware
app.use(body_parser_1["default"].json());
// Routes
app.use('/api', api_1["default"]);
app.use('/auth', auth_1["default"]);
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});

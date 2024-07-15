"use strict";
// Ejemplo en un controlador (dateController.ts)
exports.__esModule = true;
exports.getCurrentDate = void 0;
var getCurrentDate = function (req, res) {
    if (req.user) {
        var currentDate = new Date().toDateString();
        res.json({ date: currentDate, user: req.user });
    }
    else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.getCurrentDate = getCurrentDate;

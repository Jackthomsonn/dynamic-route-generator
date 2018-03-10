"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class ErrorHandler {
    static handleError(error) {
        process.stdout.write(chalk_1.default.bold.magentaBright('Route Generator Plugin Error: ') + chalk_1.default.blue(error.message));
    }
}
exports.ErrorHandler = ErrorHandler;

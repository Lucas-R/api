"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Person = (0, mongoose_1.model)('Person', new mongoose_1.Schema({
    name: String,
    age: Number,
    email: String,
}));
exports.default = Person;

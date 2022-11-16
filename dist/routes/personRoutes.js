"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Person_1 = __importDefault(require("./../models/Person"));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const person = yield Person_1.default.findOne({ _id: id });
        if (!person) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(person);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const persons = yield Person_1.default.find();
        res.status(200).json(persons);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, age, email } = req.body;
    const person = {
        name,
        age,
        email
    };
    try {
        const addPerson = yield Person_1.default.create(person);
        res.status(201).json(addPerson);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { name, age, email } = req.body;
    const person = { name, age, email };
    try {
        const updated = yield Person_1.default.updateOne({ _id: id }, person);
        if (updated.matchedCount === 0) {
            res.status(422).json({ message: 'User not found' });
            return;
        }
        res.status(201).json(person);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deletePerson = yield Person_1.default.deleteOne({ _id: id });
        if (!deletePerson) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(201).json({ message: 'deleted person' });
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = router;

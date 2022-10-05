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
exports.getBooks = void 0;
const Words_1 = __importDefault(require("../models/Words"));
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let groupIndex = 0;
        let total = 1;
        const groupMas = [];
        while (total > 0) {
            total = yield Words_1.default.count({ group: groupIndex });
            if (total) {
                groupMas.push({ group: groupIndex, total: total });
                groupIndex += 1;
            }
        }
        res.json({
            groupMas,
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
});
exports.getBooks = getBooks;

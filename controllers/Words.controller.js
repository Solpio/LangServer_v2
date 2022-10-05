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
exports.getWords = void 0;
const word_service_1 = require("../services/word.service");
const Words_1 = __importDefault(require("../models/Words"));
const getWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errorHandler = (num, mess) => {
            res.status(num).json({
                message: mess,
            });
        };
        const words = yield (0, word_service_1.getWordsService)(req.query, errorHandler);
        if (!words.length) {
            return res.status(404).json({
                message: 'Не удалось найти слова из раздела или страницы',
            });
        }
        res.json({
            words: [...words],
            total: yield Words_1.default.count({ group: req.query.group }),
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
});
exports.getWords = getWords;

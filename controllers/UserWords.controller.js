"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getWord = exports.setWordStatus = exports.getUserWords = exports.createUserWords = void 0;
const User_1 = __importDefault(require("../models/User"));
const UserWords_1 = __importStar(require("../models/UserWords"));
const word_service_1 = require("../services/word.service");
const createUserWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errorHandler = (num, mess) => {
            res.status(num).json({
                message: mess,
            });
        };
        const user = yield User_1.default.findById(req.body.id);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        const words = yield (0, word_service_1.getWordsService)(req.query, errorHandler);
        if (!words.length) {
            return res.status(404).json({
                message: 'Слова не найдены',
            });
        }
        let userWords = [];
        for (let word of words) {
            const wordInBase = yield UserWords_1.default.findOne({
                userId: user._id,
                wordId: word._id,
            });
            if (wordInBase) {
                userWords.push(wordInBase);
            }
            else {
                const userWord = new UserWords_1.default({
                    wordId: word._id,
                    userId: user._id,
                    status: 'new',
                });
                userWords.push(userWord);
                yield userWord.save();
            }
        }
        res.json({
            userWords,
        });
    }
    catch (err) {
        res.status(409).json({
            message: 'Солова уже были созданы',
        });
    }
});
exports.createUserWords = createUserWords;
const getUserWords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userWords = yield UserWords_1.default.find({ user: req.body.id });
        if (!userWords) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        res.json({
            userWords,
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
});
exports.getUserWords = getUserWords;
const setWordStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (Object.keys(UserWords_1.IWordStatus).indexOf(req.params.status) === -1) {
            return res.status(400).json({
                message: 'Неверный запрос',
            });
        }
        const userWord = yield UserWords_1.default.findOneAndUpdate({ userId: req.body.id, wordId: req.params.id }, { status: req.params.status }, {
            new: true,
        });
        if (!userWord) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        res.json(Object.assign({}, userWord._doc));
    }
    catch (err) {
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
});
exports.setWordStatus = setWordStatus;
const getWord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.id, req.params.id);
        const word = yield UserWords_1.default.findOne({
            userId: req.body.id,
            wordId: req.params.id,
        });
        if (!word) {
            return res.status(404).json({
                message: 'Не нашло',
            });
        }
        res.json({ word });
    }
    catch (err) {
        res.status(500).json({
            message: 'Ошибка сервера',
        });
    }
});
exports.getWord = getWord;

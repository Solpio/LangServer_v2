"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const WordsSchema = new mongoose_1.default.Schema({
    group: { type: Number, required: true },
    word: { type: String, required: true, max: 100 },
    image: { type: String, required: false, max: 150 },
    audio: { type: String, required: false, max: 150 },
    audioMeaning: { type: String, required: false, max: 150 },
    audioExample: { type: String, required: false, max: 150 },
    textMeaning: { type: String, required: false, max: 300 },
    textExample: { type: String, required: false, max: 300 },
    transcription: { type: String, required: false, max: 100 },
    wordTranslate: String,
    textMeaningTranslate: String,
    textExampleTranslate: String,
});
exports.default = mongoose_1.default.model('Words', WordsSchema);

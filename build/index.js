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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const registration_validation_1 = require("./validations/registration.validation");
const UserController = __importStar(require("./controllers/User.controller"));
const WordsController = __importStar(require("./controllers/Words.controller"));
const UserWordsController = __importStar(require("./controllers/UserWords.controller"));
const BookController = __importStar(require("./controllers/Book.controller"));
const checkAuth_1 = __importDefault(require("./utils/checkAuth"));
const { MONGODB_URI, PORT } = process.env;
const app = (0, express_1.default)();
const port = PORT || 4444;
const uri = MONGODB_URI || 'test';
mongoose_1.default
    .connect(uri)
    .then(() => {
    console.log('db ok');
})
    .catch((reason) => {
    console.log(reason);
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/files', express_1.default.static('files'));
app.post('/auth/registration', registration_validation_1.registerValidation, UserController.createUser);
app.post('/auth/login', UserController.login);
app.get('/auth/me', checkAuth_1.default, UserController.getMe);
app.get('/words', WordsController.getWords);
app.get('/books/sections', BookController.getBooks);
app.post('/user/words', checkAuth_1.default, UserWordsController.createUserWords);
app.get('/user/words', checkAuth_1.default, UserWordsController.getUserWords);
app.get('/user/words/:id', checkAuth_1.default, UserWordsController.getWord);
app.put('/user/words/:id/:status', checkAuth_1.default, UserWordsController.setWordStatus);
app.listen(port, () => {
    console.log('Server OK');
});

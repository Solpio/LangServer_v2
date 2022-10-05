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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.createUser = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const pwrdHash = yield bcrypt_1.default.hash(req.body.password, salt);
        const doc = new User_1.default({
            email: req.body.email,
            username: req.body.username,
            passwordHash: pwrdHash,
            avatarUrl: req.body.avatarUrl,
        });
        const user = yield doc.save();
        const token = jsonwebtoken_1.default.sign({
            _id: user.id,
        }, 'secret123', {
            expiresIn: '30d',
        });
        const _a = user._doc, { passwordHash } = _a, UserData = __rest(_a, ["passwordHash"]);
        res.json(Object.assign(Object.assign({}, UserData), { token }));
    }
    catch (err) {
        res.status(500).json({
            message: 'не удалось зарагистрироваться. Возможно у вас уже есть аккаунт',
        });
    }
});
exports.createUser = createUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isEmail = req.body.login.match(/@/);
        let user;
        if (isEmail) {
            user = yield User_1.default.findOne({ email: req.body.login });
        }
        else {
            user = yield User_1.default.findOne({ username: req.body.login });
        }
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        const isValid = yield bcrypt_1.default.compare(req.body.password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({
                message: 'Неправильный логин или пароль',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user.id,
        }, 'secret123', {
            expiresIn: '30d',
        });
        const _b = user._doc, { passwordHash } = _b, UserData = __rest(_b, ["passwordHash"]);
        res.json(Object.assign(Object.assign({}, UserData), { token }));
    }
    catch (err) {
        res.status(400).json({
            message: 'не удалось войти',
        });
    }
});
exports.login = login;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.body.id);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }
        const _c = user._doc, { passwordHash } = _c, userData = __rest(_c, ["passwordHash"]);
        res.json(Object.assign({}, userData));
    }
    catch (err) {
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
});
exports.getMe = getMe;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IWordStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var IWordStatus;
(function (IWordStatus) {
    IWordStatus["new"] = "new";
    IWordStatus["learned"] = "learned";
    IWordStatus["favorite"] = "favorite";
    IWordStatus["forgotten"] = "forgotten";
})(IWordStatus = exports.IWordStatus || (exports.IWordStatus = {}));
const UserWordsSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    wordId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Words',
    },
    status: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model('UserWords', UserWordsSchema);

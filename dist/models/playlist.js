"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("../models/user"));
exports.playlistSchema = new mongoose_1.Schema({
    userId: String,
    name: {
        type: String,
        required: true,
        default: "default"
    },
    songs: [],
    image: {
        type: String,
        default: null
    },
    description: String
});
exports.playlistSchema.post("save", function (next) {
    const playlistId = this._id.toString();
    if (user_1.default.exists({ _id: this.userId })) {
        user_1.default.findByIdAndUpdate(this.userId, { $addToSet: { playlists: playlistId } });
    }
});
const Playlist = mongoose_1.model("playlist", exports.playlistSchema);
exports.default = Playlist;
// name, desc, image, lists of songs.
//# sourceMappingURL=playlist.js.map
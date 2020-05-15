"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.songSchema = new mongoose_1.Schema({
    type: String,
    playlistIndex: Number,
    songURI: String // songId link
});
const Song = mongoose_1.model("song", exports.songSchema);
exports.default = Song;
// songid, type, index (songid for spotifiy is just spotify URI. for soundcloud it may just be the url. etc.)
//# sourceMappingURL=song.js.map
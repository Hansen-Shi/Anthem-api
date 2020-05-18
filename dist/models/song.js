"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const requiredString = {
    type: String,
    required: true
};
exports.songSchema = new mongoose_1.Schema({
    playlistId: requiredString,
    type: requiredString,
    playlistIndex: {
        type: Number,
        required: true
    },
    songURI: requiredString // songId link
});
const Song = mongoose_1.model("song", exports.songSchema);
exports.default = Song;
// songid, type, index (songid for spotifiy is just spotify URI. for soundcloud it may just be the url. etc.)
//# sourceMappingURL=song.js.map
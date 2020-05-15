"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Song?retryWrites=true&w=majority";
mongoose_1.connect(uri, (err) => {
    if (err) {
        console.log("oh no");
        console.log(err.toString());
    }
    else {
        console.log("we did it reddit");
    }
});
exports.songSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    length: {
        type: Number
    },
    artist: String,
    image: String,
    type: String,
    index: String
});
const Song = mongoose_1.model("song", exports.songSchema);
exports.default = Song;
// songid, type, index (songid for spotifiy is just spotify URI. for soundcloud it may just be the url. etc.)
//# sourceMappingURL=song.js.map
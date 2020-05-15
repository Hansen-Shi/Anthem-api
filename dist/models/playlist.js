"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Playlist?retryWrites=true&w=majority";
mongoose_1.connect(uri, (err) => {
    if (err) {
        console.log("oh no");
        console.log(err.toString());
    }
    else {
        console.log("we did it reddit");
    }
});
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
const Playlist = mongoose_1.model("playlist", exports.playlistSchema);
exports.default = Playlist;
// name, desc, image, lists of songs.
//# sourceMappingURL=playlist.js.map
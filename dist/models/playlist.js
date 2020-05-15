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
    name: {
        type: String,
        required: true
    },
    songs: [],
    image: String,
});
//# sourceMappingURL=playlist.js.map
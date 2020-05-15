"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("../models/user"));
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/User?retryWrites=true&w=majority";
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
function establishConnection() {
    return mongoose_1.connect(uri, (err) => {
        if (err) {
            console.log("oh no");
            console.log(err.toString());
        }
        else {
            console.log("we did it reddit");
        }
    });
}
exports.playlistSchema.post("save", function (next) {
    establishConnection().then((db) => {
        const playlistId = this._id.toString();
        if (user_1.default.exists({ _id: this.userId })) {
            console.log("we down here");
            user_1.default.findByIdAndUpdate(this.userId, { $push: { playlists: playlistId } })
                .then(() => {
                db.disconnect();
            });
        }
    });
});
const Playlist = mongoose_1.model("playlist", exports.playlistSchema);
exports.default = Playlist;
// name, desc, image, lists of songs.
//# sourceMappingURL=playlist.js.map
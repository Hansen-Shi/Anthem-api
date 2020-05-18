"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
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
        console.log("we down here");
        console.log(this.userId);
        console.log(playlistId);
        user_1.default.findOneAndUpdate({ _id: this.userId }, { $addToSet: { playlists: playlistId } }, function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                if (res != null) {
                    console.log("This user has a new playlist!");
                    console.log(res);
                }
                else {
                    //shit got fucked up we gotta add shit here fam that deletes the playlist beacause it failed to get added to the user fam
                }
            }
        }).exec().then().catch();
    }
});
const Playlist = mongoose_1.model("playlists", exports.playlistSchema);
exports.default = Playlist;
module.exports = Playlist;
// name, desc, image, lists of songs.
//# sourceMappingURL=playlist.js.map
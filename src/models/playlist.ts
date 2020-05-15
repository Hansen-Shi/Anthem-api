import {connect, model, Schema} from "mongoose";
import User from "../models/user";

export const playlistSchema = new Schema({
    userId: String,
    name: {
        type: String,
        required: true,
        default: "default"
    },
    songs: [],
    image: {
        type: String,
        default : null
    },
    description: String

});

playlistSchema.post("save", function(next) {
    const playlistId = this._id.toString();
    if (User.exists({_id: this.userId})) {
        User.findByIdAndUpdate(this.userId, {$addToSet: {playlists: playlistId}});
    }
});

const Playlist = model("playlist", playlistSchema);
export default Playlist;
// name, desc, image, lists of songs.

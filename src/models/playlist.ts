import {connect, model, Schema} from "mongoose";
import User from "../models/user";

const uri: string = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Playlist?retryWrites=true&w=majority";

connect (uri, (err: any) => {
    if (err) {
        console.log("oh no");
        console.log(err.toString());
    } else {
        console.log("we did it reddit");
    }
});

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

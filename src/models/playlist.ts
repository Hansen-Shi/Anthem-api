import { connect, model, Schema, Mongoose, disconnect } from "mongoose";
import User from "../models/user";
import { IPlaylistDocument } from "../Interfaces/IPlaylistDocument";

const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/User?retryWrites=true&w=majority";

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
        default: null
    },
    description: String

});

function establishConnection(): Promise<Mongoose> {
    return connect(uri, (err: any) => {
        if (err) {
            console.log("oh no");
            console.log(err.toString());
        } else {
            console.log("we did it reddit");
        }
    });
}

playlistSchema.post<IPlaylistDocument>("save", function(next) {
    establishConnection().then(
        (db) => {
            const playlistId = this._id.toString();
            if (User.exists({ _id: this.userId })) {
                console.log("we down here");
                User.findByIdAndUpdate(this.userId, { $push: { playlists: playlistId } })
                .then(
                    () => {
                        db.disconnect();
                    }
                );
            }
        }
    );
});

const Playlist = model<IPlaylistDocument>("playlist", playlistSchema);
export default Playlist;
// name, desc, image, lists of songs.

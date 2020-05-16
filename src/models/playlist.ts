/* tslint:disable */
import { connect, model, Schema, Mongoose, disconnect } from "mongoose";
import User from "../models/user";
import { IPlaylistDocument } from "../Interfaces/IPlaylistDocument";

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


playlistSchema.post<IPlaylistDocument>("save", function (next) {
    const playlistId = this._id.toString();
    if (User.exists({ _id: this.userId })) {
        console.log("we down here");
        console.log(this.userId);
        console.log(playlistId);

        User.findOneAndUpdate(
            {_id:this.userId},
            { $addToSet: {playlists: playlistId}},
            function(err,res) {
                if(err){
                    console.log(err);
                }else{
                    console.log("this is the result of the motherfucking callback motherfucker.");
                    console.log(res);
                }
            }).exec().then().catch();
    }
});

const Playlist = model<IPlaylistDocument>("playlists", playlistSchema);
export default Playlist;
module.exports = Playlist;
// name, desc, image, lists of songs.

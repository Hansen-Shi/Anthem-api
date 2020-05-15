import {connect, model, Schema} from "mongoose";

export const songSchema = new Schema({
    type: String, // service source
    playlistIndex: Number,
    songURI: String // songId link
});

const Song = model("song", songSchema);
export default Song;
// songid, type, index (songid for spotifiy is just spotify URI. for soundcloud it may just be the url. etc.)

import {connect, model, Schema} from "mongoose";

const requiredString = {
    type: String,
    required: true
};
export const songSchema = new Schema({
    playlistId: requiredString,
    type: requiredString, // service source
    playlistIndex: {
        type: Number,
        required: true
    },
    songURI: requiredString // songId link
});

const Song = model("song", songSchema);
export default Song;
// songid, type, index (songid for spotifiy is just spotify URI. for soundcloud it may just be the url. etc.)

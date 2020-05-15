import {connect, model, Schema} from "mongoose";

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
    name: {
        type: String,
        required: true
    },
    songs: [],
    image: String,
    description: String

});

const Playlist = model("playlist", playlistSchema);
export default Playlist;
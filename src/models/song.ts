import {connect, model, Schema} from "mongoose";

const uri: string = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Song?retryWrites=true&w=majority";

connect (uri, (err: any) => {
    if (err) {
        console.log("oh no");
        console.log(err.toString());
    } else {
        console.log("we did it reddit");
    }
});

export const songSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    length: {
        type: Number
    }, 
    artist: String,
    image: String
});

const Song = model("song", songSchema);
export default Song;
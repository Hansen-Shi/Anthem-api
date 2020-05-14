import {connect, model, Schema} from "mongoose";

const uri: string = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Users?retryWrites=true&w=majority";

connect (uri, (err: any) => {
    if (err) {
        console.log("oh no");
        console.log(err.toString());
    } else {
        console.log("we did it reddit");
    }
});

export const userSchema = new Schema({
    username: String,
    password: String,
    image: String,
    firstName: String,
    lastName: String,
    email: String,
    spotifyRefreshToken: String,
    playlists: []

},
{
    timestamps: {createdAt: "createdDate", updatedAt: "updatedDate"}
});

const User = model("plebeian", userSchema);
export default User;

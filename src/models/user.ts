import {connect, model, Schema} from "mongoose";

const uri: string = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Users?retryWrites=true&w=majority";

connect (uri, (err: any) => {
    if (err) {
        console.log("oh no");
    } else {
        console.log("we did it reddit");
    }
});

export const userSchema = new Schema({
    username: String,
    password: String
});

const User = model("plebeian", userSchema);
export default User;

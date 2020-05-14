"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Users?retryWrites=true&w=majority";
mongoose_1.connect(uri, (err) => {
    if (err) {
        console.log("oh no");
        console.log(err.toString());
    }
    else {
        console.log("we did it reddit");
    }
});
exports.userSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    image: String,
    firstName: String,
    lastName: String,
    email: String,
    spotifyRefreshToken: String,
    playlists: []
}, {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" }
});
const User = mongoose_1.model("plebeian", exports.userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map
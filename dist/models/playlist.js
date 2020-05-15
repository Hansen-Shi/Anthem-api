"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const mongoose_1 = require("mongoose");
const user_1 = __importDefault(require("../models/user"));
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/User?retryWrites=true&w=majority";
exports.playlistSchema = new mongoose_1.Schema({
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
exports.playlistSchema.post("save", function (next) {
    const playlistId = this._id.toString();
    if (user_1.default.exists({ _id: this.userId })) {
        console.log("we down here");
        console.log(this.userId);
        console.log(playlistId);
        user_1.default.findOneAndUpdate({ _id: this.userId }, { $addToSet: { playlists: playlistId } }, function (err, res) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("this is the result of the motherfucking callback motherfucker.");
                console.log(res);
            }
        }).exec().then().catch();
    }
    /*
    console.log(this.userId);
    const person = new User({
        username: "whathefuckisgoingon",
        password: "whathefuckisgoingon",
        firstName: "whathefuckisgoingon",
        lastName: "whathefuckisgoingon",
        email: "whathefuckisgoingon@fuckyou.com"
    });
    person.save()
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.log(err);
        });

    /*
    User.findById({_id:this.userId}).then(
        (resultUser) => {
            resultUser.update(
                {$addToSet: {'User.$.playlists' : playlistId}},
            ).then(
                (res) => {
                    res.save().then(
                        () => {
                            disconnect().then();
                        }
                    );

                }
            );
        }
    );*/
    /*
    if (User.exists({ _id: this.userId })) {
        console.log("we down here");
        console.log(this.userId);
        console.log(playlistId);

        User.findOneAndUpdate(
            {_id:this.userId},
            { $push: {playlists: playlistId}},
            function(err,res) {
                if(err){
                    console.log(err);
                }else{
                    console.log("this is the result of the motherfucking callback motherfucker.");
                    console.log(res);
                    disconnect();
                }
            }).exec().then().catch();
    }*/
});
const Playlist = mongoose_1.model("playlists", exports.playlistSchema);
exports.default = Playlist;
module.exports = Playlist;
// name, desc, image, lists of songs.
//# sourceMappingURL=playlist.js.map
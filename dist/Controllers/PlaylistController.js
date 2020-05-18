"use strict";
/* tslint:disable */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const playlist_1 = __importDefault(require("../models/playlist"));
const user_1 = __importDefault(require("../models/user"));
const client_id = "1191247894b54b3e9ea7590ed877e4b4"; // Your client id
const client_secret = "ba5a2acd5e174889a57ee849a81e92d8"; // Your secret
const redirect_uri = "http://localhost:3000/api/callback"; // Your redirect uri
const stateKey = "spotify_auth_state";
/*
    This is the controller for creating, updating, and deleting playlists. It must have a logged in user in the response body.

 */
class PlaylistController {
    /*
        Accepts in a logged in user (verified by token of some sort or some shit), a playlist name, description, and optionally, an image upload.
     */
    createPlaylist(req, res) {
        const playlist = new playlist_1.default({
            userId: req.body.userId,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image
        });
        playlist.save()
            .then((result) => {
            console.log(result);
            res.json(result);
        })
            .catch((err) => {
            console.log(err);
            res.json(err);
        });
    }
    /*

     */
    updatePlaylist(req, res) {
    }
    /*
        Accepts a logged in user, a playlist id, and an extra verification from the user
     */
    deletePlaylist(req, res) {
        playlist_1.default.findOneAndDelete({ _id: req.body.playlistId }, function (err, resp) {
            console.log(resp);
            if (err) {
                res.json({
                    message: "failed to delete"
                });
            }
            if (resp != null) {
                //remove the playlist from the user:
                user_1.default.findOne({ _id: req.body.userId }, function (err, user) {
                    if (err) {
                        res.json(err);
                    }
                    else {
                        if (user != null) {
                            user.updateOne({ $pull: { playlists: req.body.playlistId } }, {}, function (err, resu) {
                                if (err) {
                                    res.json(err);
                                }
                                else {
                                    console.log("no error?");
                                }
                            });
                        }
                    }
                });
                res.json({
                    message: 'playlist removed'
                } + resp.toJSON());
            }
            else {
                res.json(resp);
            }
        });
    }
    home(req, res) {
        res.send({ message: "wowsers" });
    }
}
exports.PlaylistController = PlaylistController;
//# sourceMappingURL=PlaylistController.js.map
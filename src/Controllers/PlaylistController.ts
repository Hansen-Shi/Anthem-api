/* tslint:disable */

import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import express from "express";
const passport = require("passport");
import * as querystring from "querystring";
import * as request from "request";
import Playlist from "../models/playlist";
import User from "../models/user"
import { disconnect, connect, Mongoose, Connection } from "mongoose";

const client_id = "1191247894b54b3e9ea7590ed877e4b4"; // Your client id
const client_secret = "ba5a2acd5e174889a57ee849a81e92d8"; // Your secret
const redirect_uri = "http://localhost:3000/api/callback"; // Your redirect uri
const stateKey = "spotify_auth_state";

/*
    This is the controller for creating, updating, and deleting playlists. It must have a logged in user in the response body.

 */

export class PlaylistController {

    /*
        Accepts in a logged in user (verified by token of some sort or some shit), a playlist name, description, and optionally, an image upload.
     */
    public createPlaylist(req: express.Request, res: express.Response): void {
        const playlist = new Playlist({
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
    public updatePlaylist(req: express.Request, res: express.Response): void {
    }
    /*
        Accepts a logged in user, a playlist id, and an extra verification from the user
     */
    public deletePlaylist(req: express.Request, res: express.Response): void {
        Playlist.findOneAndDelete({_id: req.body.playlistId }, function (err, resp) {
            console.log(resp);
            if (err) {
                res.json({
                    message: "failed to delete"
                });
            }
            if(resp != null) {
                //remove the playlist from the user:
                User.findOne({_id:req.body.userId}, function(err, user){
                   if(err){
                       res.json(err);
                   }else{
                       if(user != null){
                           user.updateOne({ $pull: {playlists: req.body.playlistId}},{},function(err, resu){
                               if(err){
                                   res.json(err);
                               }else{
                                   console.log("no error?");
                               }
                           });
                       }
                   }
                });
                res.json({
                    message: 'playlist removed'
                } + resp.toJSON());
            }else{
                res.json(resp)
            }
        });
    }
}
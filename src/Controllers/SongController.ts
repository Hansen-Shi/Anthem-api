import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import express from "express";
import * as querystring from "querystring";
import * as request from "request";
import Playlist from "../models/playlist";
import User from "../models/user"
import { disconnect, connect, Mongoose, Connection } from "mongoose";
import Song from "../models/song";

const client_id = "1191247894b54b3e9ea7590ed877e4b4"; // Your client id
const client_secret = "ba5a2acd5e174889a57ee849a81e92d8"; // Your secret
const redirect_uri = "http://localhost:3000/api/callback"; // Your redirect uri
const stateKey = "spotify_auth_state";

export class SongController {

    public createSong(req: express.Request, res: express.Response): void {
        const song = new Song({
            playlistId: req.body.playlistId,
            type: req.body.type,
            playlistIndex: req.body.playlistIndex,
            songURI: req.body.songURI
        });
        song.save()
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
    }

    public updateSong(req: express.Request, res: express.Response): void{
        
    }

    public deleteSong(req: express.Request, res: express.Response): void{
        Song.findOneAndDelete({_id: req.body.songId}, function(err, resp) {
            console.log(resp);
            if (err){
                res.json({
                    message: 'failure ' + err
                });
            }
            res.json({
                message: 'song deleted'
            });
        });
    }
}
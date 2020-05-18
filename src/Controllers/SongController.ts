/* tslint:disable */

import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import express from "express";
import * as querystring from "querystring";
import * as request from "request";
import Playlist from "../models/playlist";
import User from "../models/user";
import { disconnect, connect, Mongoose, Connection } from "mongoose";
import Song from "../models/song";


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
        });
    }

    public updateSong(req: express.Request, res: express.Response): void {

    }

    public deleteSong(req: express.Request, res: express.Response): void {
        Song.findOneAndDelete({_id: req.body.songId}, function(err, resp) {
            console.log(resp);
            if (err) {
                res.json({
                    message: "failure " + err
                });
            }
            res.json({
                message: "song deleted"
            });
        });
    }
}

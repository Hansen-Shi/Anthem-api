/* tslint:disable */

import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import express from "express";
import * as querystring from "querystring";
import * as request from "request";
import User from "../models/user";

//delete later
const myRefreshToken  = 'AQBLMVmWctyknimCBa59GFEbpEvinUwtFOCkMy4iyqGqAToijW2rH_HsoE94l6hz_kTkTZNJMd_oXO69B6eLQL4bkfawEUo3hTQrxqTogvycHAqc8C9Ykt6A4Ow3OPtrZA0'

const client_id = "1191247894b54b3e9ea7590ed877e4b4"; // Your client id
const client_secret = "ba5a2acd5e174889a57ee849a81e92d8"; // Your secret
const redirect_uri = "http://localhost:3000/api/callback"; // Your redirect uri
const stateKey = "spotify_auth_state";


/*
    This is the controller for creating, updating, and deleting playlists. It must have a logged in user in the response body.

 */
export class PlaylistController{

    /*
        Accepts in a logged in user (verified by token of some sort or some shit), a playlist name, description, and optionally, an image upload.
     */
    public createPlaylist(req: express.Request, res: express.Response): void{


    }
    /*
        Accepts a logged in user, a playlist id, and 1 or more songs.
     */
    public updatePlaylist(req: express.Request, res: express.Response): void{

    }
    /*
        Accepts a logged in user, a playlist id, and an extra verification from the user
     */
    public deletePlaylist(req: express.Request, res: express.Response): void{

    }


}
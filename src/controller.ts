/* tslint:disable */

import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import express from "express";
import * as querystring from "querystring";
import * as request from "request";
import User from "./models/user";


const client_id = "1191247894b54b3e9ea7590ed877e4b4"; // Your client id
const client_secret = "ba5a2acd5e174889a57ee849a81e92d8"; // Your secret
const redirect_uri = "http://localhost:3000/api/hello"; // Your redirect uri
const stateKey = "spotify_auth_state";

export class Controller {
    public getAllUsers(req: express.Request, res: express.Response): void {
        User.find()
        .exec()
        .then((doc) => {
            console.log(doc);
            res.json(doc);
        })
        .catch((err) => {
            console.log(err);
            res.json({error: err});
        });
    }
    public postHello(req: express.Request, res: express.Response): void {
        res.send(req.body);
    }
    public getAUser(req: express.Request, res: express.Response): void {
        User.findOne({username: req.body.username})
        .exec()
        .then((doc) => {
            console.log(doc);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    public createUser(req: express.Request, res: express.Response): void {
        const person = new User({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        person.save()
        .then((result) => {
            console.log(result);
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        });
    }
    public createToken(req: express.Request, res: express.Response): void {
        function generateRandomString(length: number) {
            let state = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < length; i++) {
                state += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return state;
        }

        const state = generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        const scope = "user-read-private user-read-email";
        res.redirect("https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: "code",
                client_id,
                scope,
                redirect_uri,
                state
            }));
    }
}

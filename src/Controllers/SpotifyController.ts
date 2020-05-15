/* tslint:disable */

import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import express from "express";
import * as querystring from "querystring";
import * as request from "request";
import User from "../models/user";
import StringUtilities from "../Utility/StringUtilities";

//delete later
const myRefreshToken  = 'AQBLMVmWctyknimCBa59GFEbpEvinUwtFOCkMy4iyqGqAToijW2rH_HsoE94l6hz_kTkTZNJMd_oXO69B6eLQL4bkfawEUo3hTQrxqTogvycHAqc8C9Ykt6A4Ow3OPtrZA0'

const client_id = "1191247894b54b3e9ea7590ed877e4b4"; // Your client id
const client_secret = "ba5a2acd5e174889a57ee849a81e92d8"; // Your secret
const redirect_uri = "http://localhost:3000/api/callback"; // Your redirect uri
const stateKey = "spotify_auth_state";

export class SpotifyController {
    /*
        Gets all the spotify playlists from a spotify user. Could be used in later functionality with importing whole playlists from spotify into your existing playlists or copying it to create a playlist.
        honestly we will add the option to import to import one or all of your spotify playlists if you want. We would use this and then just a convert and save thing.
     */
    public getAllPlaylistsFromUser(req: express.Request, res: express.Response): void{

        const authOptions = {
            body:{
              refresh_token: myRefreshToken
            },
            url: 'http://localhost:3000/api/spotify_access_token',
            json: true
        };
        /*
        res.redirect('/api/hello' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
         */
       request.get(authOptions, function(error, response, body) {
           if (!error && response.statusCode === 200) {
               console.log("we got an access token")
               console.log(body.access_token);

               var options = {
                   url: 'https://api.spotify.com/v1/me/playlists',
                   headers: { 'Authorization': 'Bearer ' + body.access_token },
                   json: true
               };

               // use the access token to access the Spotify Web API
               request.get(options, function(error, response, body) {
                   console.log(body);
                   res.redirect('/api/hello');
               });

           }else{
               console.log(error);
               console.log(response);
               res.redirect('/api/hello');
           }
        });

    }

    /*
        This is the handling of logging your account into the spotify service so we can access your playlists and songs and what not.
     */
    public authorizeSpotifyLogin(req: express.Request, res: express.Response): void {

        const state = StringUtilities.generateRandomString(16);
        res.cookie(stateKey, state);

        // your application requests authorization
        const scope = "user-read-private " +
            "user-read-email " +
            "playlist-read-collaborative " +
            "playlist-modify-private " +
            "playlist-modify-public " +
            "playlist-read-private " +
            "user-read-playback-position " +
            "user-top-read " +
            "user-read-recently-played " +
            "user-modify-playback-state " +
            "user-read-currently-playing " +
            "user-read-playback-state " +
            "user-follow-modify " +
            "user-follow-read " +
            "streaming ";
        res.redirect("https://accounts.spotify.com/authorize?" +
            querystring.stringify({
                response_type: "code",
                client_id,
                scope,
                redirect_uri,
                state
            }));
    }
    /*
        this is called anytime the access token fails, and or anytime we need to get an access token for a currently logged in user
     */
    public getAccessTokenFromRefreshToken(req: express.Request, res: express.Response){
        console.log("we got this token thing going on");
       const refresh_token = req.body.refresh_token;
       console.log(refresh_token);
       const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token;
                res.send({
                    'access_token': access_token
                });
            }
        });
    }
    public callback(req: express.Request, res: express.Response){
        // your application requests refresh and access tokens
        // after checking the state parameter

        const code = req.query.code || null;
        const state = req.query.state || null;
        console.log("logging cookies");
        const storedState = req.cookies ? req.cookies[stateKey] : null;
        console.log(storedState + ":storedState");

        if (state === null || state !== storedState) {
            console.log("THIS HAPPENS FUCK:");
            res.redirect('/api/hello');
        } else {
            console.log("THE GOD DAMNED STATES MATCH MY MAN");
            res.clearCookie(stateKey);
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {

                    var access_token = body.access_token,
                        refresh_token = body.refresh_token;

                    console.log(refresh_token);
                    console.log(access_token);
                    //this is where we would store the refresh token in mongo

                    var options = {
                        url: 'https://api.spotify.com/v1/me',
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        json: true
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, function(error, response, body) {
                        console.log(body);
                    });
                    res.redirect('/api/hello');
                } else {
                    res.redirect('/api/hello' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });
        }
    }
}
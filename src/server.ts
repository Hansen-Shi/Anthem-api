/* tslint:disable */
import bodyParser from "body-parser";
import express from "express";
import {ApiRouter} from "./router";
import * as querystring from "querystring";
import * as cors from "cors";
import * as request from "request";
import * as cookieParser from "cookie-parser";

const client_id = '1191247894b54b3e9ea7590ed877e4b4'; // Your client id
const client_secret = 'ba5a2acd5e174889a57ee849a81e92d8'; // Your secret
const redirect_uri = 'http://localhost:3000/api/hello'; // Your redirect uri
const stateKey = 'spotify_auth_state';

class Application {
    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = +process.env.serverPort || 3000;
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.initCors();
    }
    // Starts the server on the port specified in the environment or on port 3000 if none specified.
    public start(): void {
        this.buildRoutes();
        this.app.listen(this.port, () => console.log("Server listening on port " + this.port + "!"));
    }

    // sets up to allow cross-origin support from any host.  You can change the options to limit who can access the api.
    // This is not a good security measure as it can easily be bypassed,
    // but should be setup correctly anyway.  Without this, angular would not be able to access the api it it is on
    // another server.
    public initCors(): void {
        this.app.use(function(req: express.Request, res: express.Response, next: any) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }
    // setup routes for the express server
    public buildRoutes(): void {
        this.app.use("/api", new ApiRouter().getRouter());
    }

    public buildOAuthEndpoints(): void {
        this.app.get('/login', function(req, res) {

            function generateRandomString(number: number) {
                var text = '';
                var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                for (var i = 0; i < length; i++) {
                    text += possible.charAt(Math.floor(Math.random() * possible.length));
                }
                return text;
            }

            let state = generateRandomString(16);
            res.cookie(stateKey, state);

            // your application requests authorization
            var scope = "user-read-private user-read-email";
            res.redirect('https://accounts.spotify.com/authorize?' +
                querystring.stringify({
                    response_type: 'code',
                    client_id: client_id,
                    scope: scope,
                    redirect_uri: redirect_uri,
                    state: state
                }));
        });
    }
}
new Application().start();

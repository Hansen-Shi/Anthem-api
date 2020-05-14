"use strict";
/* tslint:disable */
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = __importStar(require("querystring"));
const user_1 = __importDefault(require("./models/user"));
const client_id = "1191247894b54b3e9ea7590ed877e4b4"; // Your client id
const client_secret = "ba5a2acd5e174889a57ee849a81e92d8"; // Your secret
const redirect_uri = "http://localhost:3000/api/hello"; // Your redirect uri
const stateKey = "spotify_auth_state";
class Controller {
    getAllUsers(req, res) {
        user_1.default.find()
            .exec()
            .then((doc) => {
            console.log(doc);
            res.json(doc);
        })
            .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
    }
    postHello(req, res) {
        res.send(req.body);
    }
    getAUser(req, res) {
        user_1.default.findOne({ username: req.body.username })
            .exec()
            .then((doc) => {
            console.log(doc);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    createUser(req, res) {
        const person = new user_1.default({
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
    createToken(req, res) {
        function generateRandomString(length) {
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
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map
"use strict";
/* tslint:disable */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
// tslint:disable-next-line:no-var-requires
const passport = require("passport");
const JWTPass = __importStar(require("passport-jwt"));
const jwt = require("jsonwebtoken");
const JWTStrategy = JWTPass.Strategy;
const ExtractJWT = JWTPass.ExtractJwt;
const config_1 = __importDefault(require("../config"));
const moment = require("moment");
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Users?retryWrites=true&w=majority";
/*
    Our session token works as follows: It is a cookie
 */
class UserController {
    /*
        Gets all users from the DB.
     */
    getAllUsers(req, res) {
        console.log("redirected to /hello");
        user_1.default.find()
            .exec()
            .then((doc) => {
            console.log(doc);
            res.status(200).json("{body:{ " + doc + "}}");
        })
            .catch((err) => {
            console.log(err);
            res.json({ error: err });
        });
    }
    /*
        Gets all of a users information from their username
     */
    getAUser(req, res) {
        user_1.default.findOne({ email: req.body.email })
            .exec()
            .then((doc) => {
            res.status(200).send(doc);
        })
            .catch((err) => {
            console.log(err);
            res.status(401).json(err);
        });
    }
    /*
      Adds a user to the database upon the creation of an account
     */
    createUser(req, res) {
        console.log(req.body.email);
        console.log(req.body.password);
        const person = new user_1.default({
            email: req.body.email,
            password: req.body.password
        });
        person.save()
            .then((result) => {
            res.status(200).json(result);
        })
            .catch((err) => {
            console.log(err);
            res.status(401).json(err);
        });
    }
    checkRememberMe(req, res) {
        if (!req.headers.authorization) {
            res.status(401).send({ error: 'TokenMissing' });
        }
        const token = req.headers.authorization.split(' ')[1];
        let payload = null;
        try {
            payload = jwt.decode(token, config_1.default.TOKEN_SECRET);
        }
        catch (err) {
            res.status(401).send({ error: "TokenInvalid" });
        }
        if (payload.exp <= moment().unix()) {
            res.status(401).send({ error: 'TokenExpired' });
        }
        user_1.default.findById(payload.sub, function (err, user) {
            if (!user) {
                res.status(401).send({ error: 'PersonNotFound' });
            }
            else {
                req.body.user = payload.sub;
            }
        });
        const storedState = req.cookies ? req.cookies["remember-me"] : null;
        if (storedState != null) {
            const list = storedState.split(":");
            //if we find the pair of username:storedState in the DB, then you are logged in. Otherwise you are not.
        }
    }
    signup(req, res) {
        //res.json({message : "signup successful", user: req.body.user});
    }
    /*
        handling login auth
     */
    login(req, res) {
        passport.authenticate("login", (err, user, info) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (err || !user) {
                    res.status(401).json("An Error Occurred");
                }
                else {
                    // @ts-ignore
                    req.login(user, { session: false }, (error) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            res.status(401).json("An Error Occurred");
                        }
                        const body = { _id: user._id, email: user.email };
                        const token = jwt.sign({ user: body }, "top_secret");
                        return res.json({ token });
                    }));
                }
            }
            catch (error) {
                return res.json(error);
            }
        }))(req, res);
        /*
        const {
            username,
            password
        } = req.body;

        const stayLoggedIn = req.body.stayLoggedIn;
        if (!username || !password) {
            res.status(400).json({
                message: "put in your info nitwit"
            });
        } else {
            User.findOne({username: req.body.username}, function (err, user) {
                if (err) {
                    res.status(401).json({
                        message: 'sucks to suck'
                    });

                }
                if (!user.comparePassword(password)) {
                    res.json({
                        message: 'wrong something'
                    });

                } else {
                    if(stayLoggedIn){
                        let stayToken = StringUtilities.generateRandomString(128);
                        //send token to DB for user
                        let stayCookie = req.body.username + ":" + stayToken;
                        res.cookie("remember-me", stayCookie);
                    }
                    res.json({
                        message: 'success!'
                    });
                }
            })
        }
        */
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map
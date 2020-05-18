/* tslint:disable */

import express from "express";
import User from "../models/user";
import { IUserDocument } from "../Interfaces/IUserDocument";

import {connect, Mongoose} from "mongoose";
import request from "request";

// tslint:disable-next-line:no-var-requires
const passport = require("passport");
import * as JWTPass from "passport-jwt";

const jwt = require("jsonwebtoken");

const JWTStrategy = JWTPass.Strategy;
const ExtractJWT = JWTPass.ExtractJwt;
import StringUtilities from "../Utility/StringUtilities";
import Config from "../config";
import moment = require("moment");
import login from "request";
import {userInfo} from "os";


export class UserController {

    /*
        Gets all users from the DB.
     */
    public getAllUsers(req: express.Request, res: express.Response): void {
        console.log("redirected to /hello");

        User.find()
            .exec()
            .then((doc) => {
                console.log(doc);
                res.status(200).json("{body:{ " + doc + "}}");
            })
            .catch((err) => {
                console.log(err);
                res.json({error: err});
            });

    }

    /*
        Gets all of a users information from their username
     */
    public getAUser(req: express.Request, res: express.Response): void {

        User.findOne({email: req.body.email})
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
    public createUser(req: express.Request, res: express.Response): void {
        console.log(req.body.email);
        console.log(req.body.password);
        const person = new User({
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

    public checkRememberMe(req: express.Request, res:express.Response): void{

        if(!req.headers.authorization){
            res.status(401).send({error: 'TokenMissing'});
        }

        const token = req.headers.authorization.split(' ')[1];


        let payload:any = null;

        try {
            payload = jwt.decode(token, Config.TOKEN_SECRET);
        } catch(err){
            res.status(401).send({error: "TokenInvalid"});
        }

        if(payload.exp <= moment().unix()){
            res.status(401).send({error: 'TokenExpired'});
        }

        User.findById(payload.sub, function(err, user){
            if(!user){
                res.status(401).send({error: 'PersonNotFound'});
            }else{
                req.body.user = payload.sub;
            }
        });




        const storedState = req.cookies ? req.cookies["remember-me"] : null;

        if(storedState != null) {
            const list = storedState.split(":");
            //if we find the pair of username:storedState in the DB, then you are logged in. Otherwise you are not.
        }

    }
    public signup(req: express.Request, res: express.Response): void{
        //res.json({message : "signup successful", user: req.body.user});
    }
    /*
        handling login auth
     */
    public login(req: express.Request, res: express.Response): void {

        passport.authenticate("login", async (err: any, user: any, info: any) => {
            try {
                if (err || !user){
                    res.status(401).json("An Error Occurred");
                } else {
                    // @ts-ignore
                    req.login(user, {session: false},async(error) => {
                        if ( error) {
                            res.status(401).json("An Error Occurred");
                        }
                        const body = {_id : user._id, email : user.email};

                        const token = jwt.sign({user: body}, "top_secret");

                        return res.json({token});
                    });
                }
            } catch (error) {
                return res.json(error);
            }
        })(req, res);






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

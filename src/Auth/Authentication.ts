
import bodyParser from "body-parser";
import express from "express";
import User from "../models/user";
import {connect, Mongoose} from "mongoose";
import request from "request";
import * as jwt from "jwt-simple";
import * as JWTPass from "passport-jwt";

const JWTStrategy = JWTPass.Strategy;
const ExtractJWT = JWTPass.ExtractJwt;
// tslint:disable-next-line:no-var-requires
const passport = require("passport");
import * as localpassport from "passport-local";
import {IUserDocument} from "../Interfaces/IUserDocument";
import {resolveAny} from "dns";
import bcrypt from "bcrypt";

const localStrategy = localpassport.Strategy;

passport.use("signup", new localStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
}, async (req: express.Request, email: string, password: string, done: any) => {
    try {

        // call our create user endpoint

        console.log(email + " " + password);

        const userInfo = {
            url: "http://localhost:3000/api/user",
            body: {
                email,
                password,
            },
            json: true
        };

        request.post(userInfo, function(error, response, user) {
            if (!error && response.statusCode === 200) {
                return done(null, user);
            } else {
                done(error);
            }
        });
        return done();
    } catch (error) {
        done(error);
    }
}));

passport.use("login", new localStrategy({
    usernameField : "email",
    passwordField : "password"
}, async (email: string, password: string, done: any) => {
    try {
        const userInfo = {
            url: "http://localhost:3000/api/user",
            body: {
                email,
            },
            json: true
        };

        request.get(userInfo, function(error, response, user) {
            if (!error && response.statusCode === 200) {
                if (!user) {
                    return done(null, false, {message : "user not found"});
                }
                // check the hash pw against the given user
                comparePasses(password, user.password).then(
                    (isValid: boolean ) => {
                        if (  isValid ) {
                           return done(null, user, {message : "Logged In Successfully"});
                        } else {
                            return done(null, false, {message : "Incorrect Password"});
                        }
                    }
                ).catch(
                    (err: any) => {
                        done(err);
                    }
                );
            } else {
                done(error);
            }
        });
    } catch (error) {
        done(error);
    }
}));

passport.use(new JWTStrategy({

    secretOrKey: "top_secret",

    jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")

}, async (token: any, done: any) => {
    try {
        // pass the user details to the next middleware
        return done(null, token.user);

    } catch (error) {
        done(error);
    }
}));

function comparePasses(passLocal: string, passDB: string) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(passLocal, passDB, (err, success) => {
            if (err) {
                return reject(err);
            }
            return resolve(success);
        });
    });
}
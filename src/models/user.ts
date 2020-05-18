/* tslint:disable */
import {connect, model, Schema, disconnect, Query} from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { IUserDocument } from "../Interfaces/IUserDocument";
const passport = require("passport");
import * as JWTPass from "passport-jwt";

const jwt = require("jsonwebtoken");

const JWTStrategy = JWTPass.Strategy;
const ExtractJWT = JWTPass.ExtractJwt;

const saltLevel: number = 10;
const requiredString = {
    type: String,
    required: true
};

export const userSchema = new Schema({
    username: {
        type: String
    },
    password: requiredString,
    image: String,
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: true,
        validate: [ validator.isEmail, "invalid email" ],
        unique: true
    },
    rememberMeTokens: [],
    spotifyRefreshToken: String,
    playlists: []

},
{
    timestamps: {createdAt: "createdDate", updatedAt: "updatedDate"}
});

userSchema.methods.comparePassword = function(candidate: string): Promise<boolean> {
    const password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidate, password, (err, success) => {
            if (err) {
                return reject(err);
            }
            return resolve(success);
        });
    });
};

userSchema.pre<IUserDocument>("save", function(next) {
    const user = this;

    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(saltLevel, function(badSalt, salt) {
        if (badSalt) {
            return next(badSalt);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                console.log("Fuck right off cunt");
                return next(err);
            }


            //Add remember me token to the DB for the user if they specified.
            if(user.wantsRemember || true) {

                const rememberToken = jwt.sign(user.toJSON(), "top_secret2");

                console.log(rememberToken);
                user.updateOne({$addToSet: {"rememberMeTokens": rememberToken}}, (err: any, user:any) => {
                    if (err) {
                        console.log("BRO.");
                        return next(err);
                    }
                    console.log(err + ":eror????");
                    console.log(user);
                    console.log("remember token added to user");
                }).exec().then(r => next(r));
            }

            user.password = hash;
            return next();
        });
    });
});
const User = model<IUserDocument>("users", userSchema);
export default User;
module.exports = User;

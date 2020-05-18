"use strict";
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
/* tslint:disable */
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const passport = require("passport");
const JWTPass = __importStar(require("passport-jwt"));
const jwt = require("jsonwebtoken");
const JWTStrategy = JWTPass.Strategy;
const ExtractJWT = JWTPass.ExtractJwt;
const saltLevel = 10;
const requiredString = {
    type: String,
    required: true
};
exports.userSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail, "invalid email"],
        unique: true
    },
    rememberMeTokens: [],
    spotifyRefreshToken: String,
    playlists: []
}, {
    timestamps: { createdAt: "createdDate", updatedAt: "updatedDate" }
});
exports.userSchema.methods.comparePassword = function (candidate) {
    const password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(candidate, password, (err, success) => {
            if (err) {
                return reject(err);
            }
            return resolve(success);
        });
    });
};
exports.userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt_1.default.genSalt(saltLevel, function (badSalt, salt) {
        if (badSalt) {
            return next(badSalt);
        }
        bcrypt_1.default.hash(user.password, salt, function (err, hash) {
            if (err) {
                console.log("Fuck right off cunt");
                return next(err);
            }
            //Add remember me token to the DB for the user if they specified.
            if (user.wantsRemember || true) {
                const rememberToken = jwt.sign(user.toJSON(), "top_secret2");
                console.log(rememberToken);
                user.updateOne({ $addToSet: { "rememberMeTokens": rememberToken } }, (err, user) => {
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
const User = mongoose_1.model("users", exports.userSchema);
exports.default = User;
module.exports = User;
//# sourceMappingURL=user.js.map
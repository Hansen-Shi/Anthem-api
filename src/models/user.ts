import {connect, model, Schema, disconnect} from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { IUserDocument } from "../Interfaces/IUserDocument";

const saltLevel: number = 10;
const requiredString = {
    type: String,
    required: true
};

export const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: requiredString,
    image: String,
    firstName: requiredString,
    lastName: requiredString,
    email: {
        type: String,
        required: true,
        validate: [ validator.isEmail, "invalid email" ],
        unique: true
    },
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
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});
const User = model<IUserDocument>("plebeian", userSchema);
export default User;

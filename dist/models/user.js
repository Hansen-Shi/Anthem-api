"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Users?retryWrites=true&w=majority";
const saltLevel = 10;
const requiredString = {
    type: String,
    required: true
};
mongoose_1.connect(uri, (err) => {
    if (err) {
        console.log("oh no");
        console.log(err.toString());
    }
    else {
        console.log("we did it reddit");
    }
});
exports.userSchema = new mongoose_1.Schema({
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
        validate: [validator_1.default.isEmail, "invalid email"],
        unique: true
    },
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
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
const User = mongoose_1.model("plebeian", exports.userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map
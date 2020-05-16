"use strict";
/* tslint:disable */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const StringUtilities_1 = __importDefault(require("../Utility/StringUtilities"));
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
            res.json(doc);
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
        user_1.default.findOne({ username: req.body.username })
            .exec()
            .then((doc) => {
            console.log(doc._id.toString());
            res.json(doc);
        })
            .catch((err) => {
            console.log(err);
            res.json(err);
        });
    }
    /*
      Adds a user to the database upon the creation of an account
     */
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
    checkRememberMe(req, res) {
    }
    /*
        handling login auth
     */
    login(req, res) {
        const { username, password } = req.body;
        const stayLoggedIn = req.body.stayLoggedIn;
        if (!username || !password) {
            res.status(400).json({
                message: "put in your info nitwit"
            });
        }
        else {
            user_1.default.findOne({ username: req.body.username }, function (err, user) {
                if (err) {
                    res.status(401).json({
                        message: 'sucks to suck'
                    });
                }
                if (!user.comparePassword(password)) {
                    res.json({
                        message: 'wrong something'
                    });
                }
                else {
                    if (stayLoggedIn) {
                        let stayToken = StringUtilities_1.default.generateRandomString(128);
                        //send token to DB for user
                        let stayCookie = req.body.username + ":" + stayToken;
                        res.cookie("rememberme", stayCookie);
                    }
                    res.json({
                        message: 'success!'
                    });
                }
            });
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map
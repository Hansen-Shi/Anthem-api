"use strict";
/* tslint:disable */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
class UserController {
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
    login(req, res) {
        const { username, password } = req.body;
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
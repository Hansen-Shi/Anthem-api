"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./models/user"));
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
            lastName: req.body.lastName
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
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map
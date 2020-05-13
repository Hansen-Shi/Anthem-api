"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./models/user"));
class Controller {
    getUsers(req, res) {
        const id = "5eb9bdcb00d1054290de227a";
        user_1.default.find()
            .exec()
            .then((doc) => {
            console.log(doc);
            res.status(200).json(doc);
        })
            .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
    }
    postHello(req, res) {
        res.send(req.body);
    }
    createUser(req, res) {
        const person = new user_1.default({
            username: req.body.username,
            password: req.body.password
        });
        person.save((err) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            else {
                res.send(person);
            }
        });
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map
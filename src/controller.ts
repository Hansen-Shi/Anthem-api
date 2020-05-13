import express from "express";
import User from "./models/user";

export class Controller {
    public getAllUsers(req: express.Request, res: express.Response): void {
        User.find()
        .exec()
        .then((doc) => {
            console.log(doc);
            res.json(doc);
        })
        .catch((err) => {
            console.log(err);
            res.json({error: err});
        });
    }
    public postHello(req: express.Request, res: express.Response): void {
        res.send(req.body);
    }
    public createUser(req: express.Request, res: express.Response): void {
        const person = new User({
            username: req.body.username,
            password: req.body.password
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

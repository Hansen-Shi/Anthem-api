import express from "express";
import User from "./models/user";

export class Controller {
    public getUsers(req: express.Request, res: express.Response): void {
        
    }
    public postHello(req: express.Request, res: express.Response): void {
        res.send(req.body);
    }
    public createUser(req: express.Request, res: express.Response): void {
        const person = new User({
            username: req.body.username,
            password: req.body.password
        });
        person.save((err: any) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.send(person);
            }
        });
    }
}

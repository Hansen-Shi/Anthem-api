/* tslint:disable */

import express from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import { IUserDocument } from '../Interfaces/IUserDocument';


export class UserController {

    public getAllUsers(req: express.Request, res: express.Response): void {
        console.log("redirected to /hello");
        User.find()
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

    public getAUser(req: express.Request, res: express.Response): void {
        User.findOne({ username: req.body.username })
            .exec()
            .then((doc) => {
                console.log(doc);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    public createUser(req: express.Request, res: express.Response): void {
        const person = new User({
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

    public login(req: express.Request, res: express.Response): void {

        const {
            username,
            password
        } = req.body;

        if (!username || !password) {
            res.status(400).json({
                message: "put in your info nitwit"
            })
        }
        else {
            User.findOne({ username: req.body.username }, function (err, user) {
                if (err) {
                    res.status(401).json({
                        message: 'sucks to suck'
                    });
                }
                if (!user.comparePassword(password)){
                    res.json({
                        message: 'wrong something'
                    });
                }
                else {
                    res.json({
                        message: 'success!'
                    })
                }
            })
        }
    }
}

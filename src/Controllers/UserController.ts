/* tslint:disable */

import express from "express";
import User from "../models/user";

export class UserController {

    /*
        Gets all users from the DB.
     */
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
                res.json({error: err});
            });

    }

    /*
        Gets all of a users information from their username
     */
    public getAUser(req: express.Request, res: express.Response): void {

        User.findOne({username: req.body.username})
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

    /*
        handling login auth
     */
    public login(req: express.Request, res: express.Response): void {

        const {
            username,
            password
        } = req.body;

        const stayLoggedIn = req.body.stayLoggedIn;
        if (!username || !password) {
            res.status(400).json({
                message: "put in your info nitwit"
            });
        } else {
            User.findOne({username: req.body.username}, function (err, user) {
                if (err) {
                    res.status(401).json({
                        message: 'sucks to suck'
                    });

                }
                if (!user.comparePassword(password)) {
                    res.json({
                        message: 'wrong something'
                    });

                } else {

                    res.json({
                        message: 'success!'
                    });
                }
            })
        }


    }
}

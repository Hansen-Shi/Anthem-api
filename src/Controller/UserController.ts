/* tslint:disable */

import express from "express";
import User from "../models/user";


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
            res.json({error: err});
        });
    }
    public postHello(req: express.Request, res: express.Response): void {
        res.send(req.body);
    }
    public getAUser(req: express.Request, res: express.Response): void {
        User.findOne({username: req.body.username})
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
    //TODO: request that accepts user and password and attempts to log them in

    //TODO: request that updates the users refresh token in the database

    //TODO: all of /user/playlists/

    /*
        TODO: song schema that is a tuple of the type and then the uri for the song
         * service: {spotify, soundcloud, applemusic, etc}
         * everything else to do with a song(time,title,artist)
     */
    //so users have playlists and playlists have songs.

    //TODO: playlist controlle



}

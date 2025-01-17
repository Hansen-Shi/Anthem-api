import express from "express";
import {UserController} from "./Controllers/UserController";
import {SpotifyController} from "./Controllers/SpotifyController";
import { PlaylistController } from "./Controllers/PlaylistController";

// tslint:disable-next-line:no-var-requires
const passport = require("passport");
// TODO: make create user stop an unauthorized response.
export class ApiRouter {
    private router: express.Router = express.Router();
    private userController: UserController = new UserController();
    private spotifyController: SpotifyController = new SpotifyController();
    private playlistController: PlaylistController = new PlaylistController();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        this.router.get("/user-data", this.userController.getAUser);
        this.router.post("/user-data", this.userController.createUser);
        // tslint:disable-next-line
        this.router.post("/signup", passport.authenticate("signup", {session : false}), async (req, res, next) => {
            return next(req.user);
        });
        this.router.post("/login", this.userController.login);
        this.router.get("/home", this.playlistController.home);
        return this.router;
    }
}

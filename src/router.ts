import express from "express";
import {UserController} from "./Controllers/UserController";
import {SpotifyController} from "./Controllers/SpotifyController";
import { PlaylistController } from './Controllers/PlaylistController';

export class ApiRouter {
    private router: express.Router = express.Router();
    private userController: UserController = new UserController();
    private spotifyController: SpotifyController = new SpotifyController();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        this.router.get("/hello", this.userController.getAUser);
        this.router.post("/hello", this.userController.createUser);
        this.router.post("/testingLogin", this.userController.login);
        this.router.post("/createPlaylist", this.PlaylistController.createPlaylist)
        this.router.get("/login", this.spotifyController.authorizeSpotifyLogin);
        this.router.get("/playlists", this.spotifyController.getAllPlaylistsFromUser);
        this.router.get("/callback", this.spotifyController.callback);
        this.router.get("/spotify_access_token",  this.spotifyController.getAccessTokenFromRefreshToken);
        return this.router;
    }
}

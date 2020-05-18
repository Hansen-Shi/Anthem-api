import express from "express";
import {UserController} from "./Controllers/UserController";
import {SpotifyController} from "./Controllers/SpotifyController";
import { PlaylistController } from "./Controllers/PlaylistController";

// tslint:disable-next-line:no-var-requires
const passport = require("passport");

export class SecureApiRouter {
    private router: express.Router = express.Router();
    private spotifyController: SpotifyController = new SpotifyController();
    private playlistController: PlaylistController = new PlaylistController();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        this.router.delete("/playlists", this.playlistController.deletePlaylist);
        this.router.post("/playlists", this.playlistController.createPlaylist);
        this.router.get("/spotify/auth", this.spotifyController.authorizeSpotifyLogin);
        this.router.get("/playlists", this.spotifyController.getAllPlaylistsFromUser);
        this.router.get("/spotify/callback", this.spotifyController.callback);
        this.router.get("/spotify/access_token",  this.spotifyController.getAccessTokenFromRefreshToken);
        return this.router;
    }
}

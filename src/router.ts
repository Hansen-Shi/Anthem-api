import express from "express";
import {UserController} from "./Controllers/UserController";
import {SpotifyController} from "./Controllers/SpotifyController";
import { PlaylistController } from "./Controllers/PlaylistController";
import { SongController } from "./Controllers/SongController";

export class ApiRouter {
    private router: express.Router = express.Router();
    private userController: UserController = new UserController();
    private spotifyController: SpotifyController = new SpotifyController();
    private playlistController: PlaylistController = new PlaylistController();
    private songController: SongController = new SongController();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {
        this.router.post("/hello", this.userController.createUser);
        this.router.post("/testingLogin", this.userController.login);
        this.router.post("/createPlaylist", this.playlistController.createPlaylist);
        this.router.post("/songTest", this.songController.createSong);

        this.router.delete("/playlists", this.playlistController.deletePlaylist);
        
        this.router.get("/login", this.spotifyController.authorizeSpotifyLogin);
        this.router.get("/playlists", this.spotifyController.getAllPlaylistsFromUser);
        this.router.get("/callback", this.spotifyController.callback);
        this.router.get("/spotify_access_token",  this.spotifyController.getAccessTokenFromRefreshToken);
        this.router.get("/hello", this.userController.getAUser);
        return this.router;
    }
}

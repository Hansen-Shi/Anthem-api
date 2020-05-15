"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./Controllers/UserController");
const SpotifyController_1 = require("./Controllers/SpotifyController");
class ApiRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new UserController_1.UserController();
        this.spotifyController = new SpotifyController_1.SpotifyController();
    }
    // Creates the routes for this router and returns a populated router object
    getRouter() {
        this.router.get("/hello", this.userController.getAUser);
        this.router.post("/hello", this.userController.createUser);
        this.router.post("/login", this.userController.login);
        this.router.get("/login", this.spotifyController.createToken);
        this.router.get("/playlists", this.spotifyController.getAllPlaylistsFromUser);
        this.router.get("/callback", this.spotifyController.callback);
        this.router.get("/spotify_access_token", this.spotifyController.getAccessTokenFromRefreshToken);
        return this.router;
    }
}
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=router.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./Controllers/UserController");
const SpotifyController_1 = require("./Controllers/SpotifyController");
const PlaylistController_1 = require("./Controllers/PlaylistController");
// tslint:disable-next-line:no-var-requires
const passport = require("passport");
// TODO: make create user stop an unauthorized response.
class ApiRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new UserController_1.UserController();
        this.spotifyController = new SpotifyController_1.SpotifyController();
        this.playlistController = new PlaylistController_1.PlaylistController();
    }
    // Creates the routes for this router and returns a populated router object
    getRouter() {
        this.router.get("/user-data", this.userController.getAUser);
        this.router.post("/user-data", this.userController.createUser);
        // tslint:disable-next-line
        this.router.post("/signup", passport.authenticate("signup", { session: false }), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            return next(req.user);
        }));
        this.router.post("/login", this.userController.login);
        this.router.get("/home", this.playlistController.home);
        return this.router;
    }
}
exports.ApiRouter = ApiRouter;
//# sourceMappingURL=router.js.map
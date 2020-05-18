"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const router_1 = require("./router");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const uri = "mongodb+srv://God:passw0rd@anthem-app-ehl9n.mongodb.net/Anthem?retryWrites=true&w=majority";
let mongoose = require('mongoose');
const passport = require("passport");
require("./auth/Authentication");
class Application {
    constructor() {
        this.app = express_1.default();
        this.port = +process.env.serverPort || 3000;
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(cookie_parser_1.default());
        this.app.use(cors_1.default());
        this.app.use(body_parser_1.default.json());
        this.initCors();
        mongoose.connect(uri).then((r) => { }).catch((r) => { });
    }
    // Starts the server on the port specified in the environment or on port 3000 if none specified.
    start() {
        this.buildRoutes();
        this.app.listen(this.port, () => console.log("Server listening on port " + this.port + "!"));
    }
    // sets up to allow cross-origin support from any host.  You can change the options to limit who can access the api.
    // This is not a good security measure as it can easily be bypassed,
    // but should be setup correctly anyway.  Without this, angular would not be able to access the api it it is on
    // another server.
    initCors() {
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }
    // setup routes for the express server
    buildRoutes() {
        this.app.use("/api", new router_1.ApiRouter().getRouter());
    }
}
new Application().start();
//# sourceMappingURL=server.js.map
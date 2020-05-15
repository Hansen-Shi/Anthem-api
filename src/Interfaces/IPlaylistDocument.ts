import {Document} from "mongoose";

export interface IPlaylistDocument extends Document {
    userID: string;
    name: string;
    image: string;
    description: string;
    songs: [];
    comparePassword(candidate: string): Promise<boolean>;
}

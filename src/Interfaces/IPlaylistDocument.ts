import {Document} from "mongoose";

export interface IPlaylistDocument extends Document {
    userId: string;
    name: string;
    image: string;
    description: string;
    songs: [];
}

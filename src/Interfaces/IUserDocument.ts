import {Document} from "mongoose";

export interface IUserDocument extends Document {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    comparePassword(candidate: string): Promise<boolean>;
}
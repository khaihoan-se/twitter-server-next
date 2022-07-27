import { Request } from 'express'
export interface IUser {
    fullname: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    banner: string;
    birthday: Date;
    bio: string;
    location: string;
    website: string;
    statusPost: string;
    followers: string;
    following: string;
    saved: string;
    _id: string;
}
export interface IPost extends Request {
    user: IUser
}
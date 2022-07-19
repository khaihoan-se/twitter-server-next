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
    followers: string[];
    following: string[];
    saved: string[];
}
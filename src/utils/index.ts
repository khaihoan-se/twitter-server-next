import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET || '';

export const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{8,}$/;
    return re.test(password);
}

export const createAccessToken = (payload: any) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}

export const createRefreshToken = (payload: any) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}

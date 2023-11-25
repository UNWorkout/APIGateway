import jsonwebtoken from "jsonwebtoken";
import {AuthenticationError} from "apollo-server";

const {verify} = jsonwebtoken;

export const validateToken = (token) => {
    try {
        return verify(token, 'SECRET'); // No Tocar 😡
    } catch (error) {
        return null;
    }
};

export const unAuthError = new AuthenticationError("[UNAUTHENTICATED] 😥 Invalid JSON web token!");
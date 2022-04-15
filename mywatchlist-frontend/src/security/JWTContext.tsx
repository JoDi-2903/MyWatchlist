import React from "react";
import toast from "react-hot-toast";

export interface JWTInfo {
    username: string;
    jwt: string;
}

export interface JWTContextInfo {
    jwtInfo: JWTInfo;
    changeJWT: Function;
}

export function setJWT(jwt: string) {
    localStorage.setItem("jwt", jwt);
}

export function clearJWT() {
    localStorage.removeItem("jwt");
}

export function getJWT(): string {
    let jwt = localStorage.getItem("jwt");
    if (jwt == null) return "";
    return jwt as string;
}

export function setUsername(username: string) {
    localStorage.setItem("username", username);
}

export function clearUsername() {
    localStorage.removeItem("username");
}

export function getUsername() {
    return localStorage.getItem("username") as string;
}

export function decodeJWT(token: string) {
    if (token != null && token !== "") {
        // Split into header, payload and signature
        var splitedToken = token.split(".");
        return JSON.parse(atob(splitedToken[1]));
    } else {
        return { sub: "", iat: "", exp: "" };
    }
}

export function expiredJWT() {
    let jwt = getJWT();
    if (jwt != null) {
        let decoded = decodeJWT(jwt);
        let today = new Date();

        if (decoded.exp !== "" && decoded["exp"] * 1000 < today.getTime()) {
            clearJWT();
            toast.error("Token is expired. Please login again.");
        }
    }
}

export function updateJWT(jwt: string, updateApp: Function) {
    let jwtDecoded = decodeJWT(jwt);
    if (jwtDecoded.sub !== "") {
        let username = jwtDecoded.sub as string;
        setJWT(jwt);
        setUsername(username);
        updateApp(username);
    } else {
        clearUsername();
        updateApp("");
    }
}

export function isLoggedIn(jwt: string): boolean {
    if (jwt === "") {
        return false;
    } else {
        return true;
    }
}

export const JWTContext = React.createContext<JWTContextInfo>({
    jwtInfo: {
        username: "",
        jwt: "",
    },
    changeJWT: (jwt: string) => {},
});

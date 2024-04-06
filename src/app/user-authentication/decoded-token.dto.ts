export interface DecodedToken {
    sub: string;
    iat: number;
    exp: number;
    role: string;
    email: string;
}
import { sign, verify, JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export function generateJwtToken(userId: string): string {
    const JWT_SECRET = process.env.JWT_SECRET as string;
    return sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
}

export function validateAuthorizationHeader(authHeader: string): JwtPayload | false {
    if (!authHeader) return false;

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) return false;

    try {
        return isJwtTokenValid(token);
    } catch (error) {
        console.error('Erro ao validar token:', error);
        return false;
    }
}

export function isJwtTokenValid(token: string): JwtPayload | false {
    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        return verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        console.error('Token inválido:', error);
        return false;
    }
}

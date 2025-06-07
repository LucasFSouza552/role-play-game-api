import { sign, verify, JwtPayload } from 'jsonwebtoken';
import dotenv from "dotenv";
import { ThrowsError } from '../errors/ThrowsError';

dotenv.config();

export function generateJwtToken(userId: number): string {
    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        const token = sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
        return token;
    } catch (error) {
        if (error instanceof ThrowsError) {
            throw error;
        }
        throw new ThrowsError('Error generating token', 500);
    }
}

export function validateAuthorizationHeader(authHeader: string): JwtPayload {
    if (!authHeader){
        throw new ThrowsError('Missing authorization header', 400);
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        throw new ThrowsError('Invalid authorization header', 400);
    }

    try {
        const payload = isJwtTokenValid(token);
        if (!payload) {
            throw new ThrowsError('Invalid token', 400);
        }
        return payload; 
    } catch (error) {
        if (error instanceof ThrowsError) {
            throw error;
        }
        throw new ThrowsError('Invalid token', 400);
    }
}

export function isJwtTokenValid(token: string): JwtPayload {
    try {
        const JWT_SECRET = process.env.JWT_SECRET as string;
        return verify(token, JWT_SECRET) as JwtPayload;
    } catch (error) {
        if (error instanceof ThrowsError) {
            throw error;
        }
        throw new ThrowsError('Invalid token', 400);
    }
}

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction,
): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = verify(token, authConfig.secret);

        // console.log(decodedToken);

        const { sub } = decodedToken as TokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token');
    }
};

export default isAuthenticated;

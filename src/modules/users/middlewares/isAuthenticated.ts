import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

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

        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token');
    }
};

export default isAuthenticated;

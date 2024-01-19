import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

const ResetPassword = {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { token, password } = req.body;

            await ResetPasswordService.execute({ token, password });

            return res.status(204).json();
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default ResetPassword;

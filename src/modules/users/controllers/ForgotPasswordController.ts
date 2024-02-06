import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

const ForgotPassword = {
    async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;

            await SendForgotPasswordEmailService.execute({ email });

            return res.status(204).json();
        } catch (error: any) {
            return res
                .status(error.statusCode || 400)
                .json({ error: error.message });
        }
    },
};

export default ForgotPassword;

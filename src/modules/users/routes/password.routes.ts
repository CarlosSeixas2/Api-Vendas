import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPassword from '../controllers/ForgotPasswordController';

const passwordRouter = Router();

passwordRouter.post(
    '/forgot',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
        },
    }),
    ForgotPassword.create,
);

export default passwordRouter;

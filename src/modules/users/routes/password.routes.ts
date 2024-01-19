import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPassword from '../controllers/ForgotPasswordController';
import ResetPassword from '../controllers/ResetPasswordController';

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

passwordRouter.post(
    '/reset',
    celebrate({
        [Segments.BODY]: {
            token: Joi.string().uuid().required(),
            password: Joi.string().required(),
            password_confirmation: Joi.string()
                .required()
                .valid(Joi.ref('password')),
        },
    }),
    ResetPassword.create,
);

export default passwordRouter;

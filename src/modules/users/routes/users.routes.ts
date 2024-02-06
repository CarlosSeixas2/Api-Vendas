import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, UsersController.index);
usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    UsersController.create,
);
usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    UserAvatarController.update,
);

export default usersRouter;

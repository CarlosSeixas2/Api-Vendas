import { Router } from 'express';
import OrderController from '../controllers/OrderController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const orderRouter = Router();

orderRouter.use(isAuthenticated);

orderRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    OrderController.show,
);

orderRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    OrderController.create,
);

export default orderRouter;

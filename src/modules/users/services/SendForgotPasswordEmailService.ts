import AppError from '@shared/errors/AppError';
import { UserTokenRepository } from './../typeorm/repositories/UsersTokenRepository';
import { UserRepository } from '../typeorm/repositories/UsersRepository';
import EtherealMail from '@config/mail/EtherealMail';
import path from 'path';

interface IRequest {
    email: string;
}

const SendForgotPasswordEmailService = {
    async execute({ email }: IRequest): Promise<void> {
        const user = await UserRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        // console.log(user);

        const { token } = await UserTokenRepository.generate(user.id);

        // console.log(token);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgotPassword.hbs',
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Vendas] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                },
            },
        });
    },
};

export default SendForgotPasswordEmailService;

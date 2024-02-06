import UserToken from '../entities/UserToken';
import { AppDataSource } from '@shared/typeorm';

export const UserTokenRepository = AppDataSource.getRepository(
    UserToken,
).extend({
    async findByToken(token: string): Promise<UserToken | null> {
        const usertoken = await UserTokenRepository.findOne({
            where: { token },
        });

        return usertoken;
    },

    async generate(user_id: string): Promise<UserToken> {
        const userToken = await UserTokenRepository.create({ user_id });

        await UserTokenRepository.save(userToken);

        return userToken;
    },
});

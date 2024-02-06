import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

let connected = false;
let client: RedisClient;

const RedisCache = {
    connectToRedis() {
        if (!connected) {
            client = new Redis(cacheConfig.config.redis);
            connected = true;
        }
    },

    async save(key: string, value: any): Promise<void> {
        this.connectToRedis();
        await client.set(key, JSON.stringify(value));
    },

    async recover<T>(key: string): Promise<T | null> {
        this.connectToRedis();
        const data = await client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;
        return parsedData;
    },

    async invalidate(key: string): Promise<void> {
        this.connectToRedis();
        await client.del(key);
    },
};

export default RedisCache;

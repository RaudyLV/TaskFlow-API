import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const algorithm = process.env.ALGORITHM || 'sha256';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac(algorithm, [salt, password].join('/')).update(password).digest('hex');
}

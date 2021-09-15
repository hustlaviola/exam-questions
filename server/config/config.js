import { dotenv } from './packages';

dotenv.config();

const config = {
    appPort: process.env.PORT,
    databaseURL: process.env.DATABASE_URL
};

export default config;

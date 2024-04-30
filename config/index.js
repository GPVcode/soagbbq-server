import dotenv from 'dotenv';
dotenv.config();

export const config = {
    serviceAccountKeyFile: process.env.SERVICE_ACCOUNT_KEY_PATH, 
    port: process.env.PORT || 9001
};

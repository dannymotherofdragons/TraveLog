const config = {
    /* don't expose password or any sensitive info, done only for demo */
    // if environment variables are not defined, use default values
    HOST: process.env.DB_HOST || 'sql11.freemysqlhosting.net',
    USER: process.env.DB_USER || 'sql11413718',
    PASSWORD: process.env.DB_PASSWORD || '2nqZrfiwN7',
    DB: process.env.DB_NAME || 'sql11413718',
    dialect: 'mysql'
    };
    module.exports = config;
    
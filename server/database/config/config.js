module.exports = {
    development: {
        database: 'exam',
        username: 'postgres',
        password: 'viola',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
    production: {
        use_env_variable: process.env.DATABASE_URL
    }
};

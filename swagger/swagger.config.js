const options = {
    swaggerDefinition: {
        info: {
            title: 'users API',
            version: '1.0.0',
        },
        host: '127.0.0.1:8080',
        basePath: '/',
        produces: [
            "application/json"
        ],
        securityDefinitions: {
            JWT: {
                in: "header",
                name: "x-access-token",
                type: "apiKey",
                description: "JWT Token"
            }
        }
        
    },
    basedir: __dirname,
    files: ['../routes/**/*.js', '../models/**/*.js']
};

module.exports = options; 
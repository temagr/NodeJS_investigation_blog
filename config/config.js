var config = {
    production: {},
    default: {
        database: {
            login: 'admin',
            password: '123456',
            options: {
                host: 'RUKAVITSINI',
                port: 1555,
                dialect: 'mssql'
            }
        },
        cache: {
            shouldBeUsed: true
        }
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}
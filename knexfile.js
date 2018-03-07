const connection = require('./connection');

module.exports = {

    development: {
        client: 'pg',
        connection: connection,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    },

    staging: { },

    production: { }

};
const pgPromise = require("pg-promise")

const config = {
    host: "dpg-ccqvqn1gp3jm9a5svk0g-a.oregon-postgres.render.com",
    port: "5432",
 
    database: "notas_ejemplo",
    user: "cjcastrog",
    password: "D3B37n6Xg2kctM1d7a4IqY0R6hDT8Xps",
    ssl: true,
    //connection: {statement_timeout: 10000}
}

const configLocal = {
    host: "localhost",
    port: "5432",
 
    database: "notas_ejemplo",
    user: "postgres",
    password: "12345"
}

const pgp = pgPromise({})
const db = pgp(config)


exports.db = db
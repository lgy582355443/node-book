const env = require('./env')
const mysql = require('mysql')

let dbHost
let dbUser
let dbPwd
if (env == 'dev') {
    dbHost = 'localhost'
    dbUser = 'root'
    dbPwd = 'abc123456'
} else if (env == 'prod') {
    dbHost = '120.79.160.241'
    dbUser = 'root'
    dbPwd = '123456'
}

//连接数据库
function connect() {
    return mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPwd,
        database: 'book'
    })
}

module.exports = {
    connect
}
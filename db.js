const env = require('./env')
const mysql = require('mysql')

let dbHost
let dbUser
let dbName
if (env == 'dev') {
    dbHost = 'localhost'
    dbUser = 'root'
    dbPwd = '你的密码'
    dbName = '数据库名'
} else if (env == 'prod') {
    dbHost = '112.74.164.251'
    dbUser = 'root'
    dbPwd = '你的密码'
    dbName = '数据库名'
}

//连接数据库
function connect() {
    return mysql.createConnection({
        host: dbHost,
        user: dbUser,
        password: dbPwd,
        database: dbName
    })
}

module.exports = {
    connect
}

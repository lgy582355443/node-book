const env = require('./env')

let hostname
let resUrl
let mp3FilePath
let avatarFilePath
if (env == 'dev') {
    hostname = 'http://localhost:3000'
    resUrl = 'http://localhost:8081'
    mp3FilePath = 'E:/porject/Ebook/resouce/mp3'
    avatarFilePath = 'E:/porject/Ebook/resouce/user/avatar'
} else if (env == 'prod') {
    hostname = 'http://120.79.160.241:3000'
    resUrl = 'http://120.79.160.241'
    mp3FilePath = '/root/nginx/upload/mp3'
    avatarFilePath = '/root/nginx/upload/user/avatar'
}

module.exports = {
    hostname,
    resUrl,
    mp3FilePath,
    avatarFilePath
}
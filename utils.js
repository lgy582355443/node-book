
const crypto = require('crypto')
const resUrl = require('./config').resUrl;
//添加属性
function handleData(data) {
    if (!data.cover.startsWith('http://')) {
        data['cover'] = `${resUrl}/img${data.cover}`
    }
    data['private'] = false   //是否开启私密阅读
    data['selected'] = false  //是否被选中
    data['cache'] = false  //是否离线缓存，当向服务器请求时为false
    data['haveRead'] = 0  //已阅读时间分钟
    return data
}

const category = [
    'Biomedicine',
    'BusinessandManagement',
    'ComputerScience',
    'EarthSciences',
    'Economics',
    'Engineering',
    'Education',
    'Environment',
    'Geography',
    'History',
    'Laws',
    'LifeSciences',
    'Literature',
    'SocialSciences',
    'MaterialsScience',
    'Mathematics',
    'MedicineAndPublicHealth',
    'Philosophy',
    'Physics',
    'PoliticalScienceAndInternationalRelations',
    'Psychology',
    'Statistics'
]

//MD5加密的盐
const salt = 'MD5Salt';
function setMD5(str) {
    const content = str + salt;
    return crypto.createHash('md5').update(content).digest('hex');
}

//jwt密钥
const secretOrPrivateKey = 'Ebook';

module.exports = {
    handleData,
    category,
    setMD5,
    secretOrPrivateKey
}
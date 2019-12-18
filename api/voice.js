const express = require('express')
const Base64 = require('js-base64').Base64
const md5 = require('js-md5')
const qs = require('qs')
const http = require('http')
const fs = require('fs')
const mp3FilePath = require('../config').mp3FilePath
const resUrl = require('../config').resUrl

const voiceRouter = express.Router();

voiceRouter.get('/voice', (req, res) => {
    createVoice(req, res)
})

function createVoice(req, res) {
    const text = req.query.text
    const lang = req.query.lang
    // const text = '测试科大讯飞在线语音合成api的功能，比如说，我们输入一段话，科大讯飞api会在线实时生成语音返回给客户端'
    // const lang = 'cn'

    //语言
    let engineType = 'intp65'
    if (lang.toLowerCase() === 'en') {
        engineType = 'intp65_en'
    }

    const voiceParam = {
        auf: 'audio/L16;rate=16000',
        aue: 'lame',
        voice_name: 'xiaoyan',
        speed: '30',
        volume: '50',
        pitch: '50',
        engine_type: engineType,
        text_type: 'text'
    }

    const currentTime = new Date().toUTCString();
    const appId = '5dd12d17'
    const api_key = 'f035761c741f381601a264303c7d9150'
    const xParam = Base64.encode(JSON.stringify(voiceParam))
    const checkSum = md5(apiKey + currentTime + xParam)
    const headers = {}
    headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    headers['X-Param'] = xParam
    headers['X-Appid'] = appId
    headers['X-CurTime'] = currentTime
    headers['X-CheckSum'] = checkSum
    headers['X-Real-Ip'] = '127.0.0.1'
    const data = qs.stringify({
        text: text
    })
    const options = {
        host: 'tts-api.xfyun.cn',
        path: '/v1/service/v1/tts',
        method: 'POST',
        headers
    }
    const request = http.request(options, response => {
        let mp3 = ''
        const contentLength = response.headers['content-length']
        //设置为二进制
        response.setEncoding('binary')

        response.on('data', data => {
            mp3 += data
            //进度
            const process = data.length / contentLength * 100
            const percent = parseInt(process.toFixed(2))
            console.log(percent)
        })
        response.on('end', () => {
            console.log(response.headers);
            console.log(mp3);
            // console.log(response.headers)
            // console.log(mp3)
            const contentType = response.headers['content-type']
            if (contentType === 'text/html') {
                res.json({
                    error: 1,
                    msg: mp3
                })
            } else if (contentType === 'text/plain') {
                res.json({
                    error: 1,
                    msg: mp3
                })
            } else {
                const fileName = new Date().getTime();
                const filePath = mp3FilePath + '/' + fileName + '.mp3';
                const downloadUrl = resUrl + '/mp3/' + fileName + '.mp3';
                console.log(filePath, downloadUrl);
                fs.writeFile(filePath, mp3, 'binary', err => {
                    if (err) {
                        res.json({
                            error: 1,
                            msg: '下载失败'
                        })
                    } else {
                        res.json({
                            error: 0,
                            msg: '下载成功',
                            path: downloadUrl
                        })
                    }
                })
            }
        })
    })
    request.write(data)
    request.end()
}

module.exports = voiceRouter

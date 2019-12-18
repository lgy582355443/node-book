const express = require('express')
const db = require('../db')
const constant = require('../utils')
const resUrl = require('../config').resUrl;

const detailRouter = express.Router();

//图书详情
detailRouter.get('/bookDetail', async (req, res) => {
    const connect = await db.connect()
    const fileName = req.query.fileName;
    const sql = `select * from book where fileName='${fileName}'`
    connect.query(sql, (err, results) => {
        if (err) {
            res.json({
                code: 1,
                msg: '电子书详情获取失败'
            })
        } else {
            if (results && results.length === 0) {
                res.json({
                    code: 1,
                    msg: '电子书详情获取失败'
                })
            } else {
                const book = constant.handleData(results[0])
                res.json({
                    code: 0,
                    msg: '获取成功',
                    data: book
                })
            }
        }
        connect.end()
    })
})

module.exports = detailRouter
const express = require('express')
const db = require('../db')
const constant = require('../utils')

const listRouter = express.Router();

//返回各个种类的书籍
listRouter.get('/categoryList', async (req, res, next) => {
    const connect = await db.connect();
    await connect.query('select * from book where cover!=\'\'',
        (err, results) => {
            if (err) {
                return next(err)
            } else {
                results = results.map(item => constant.handleData(item))
                const data = {}
                constant.category.forEach(categoryText => {
                    data[categoryText] = results.filter(item => item.categoryText === categoryText)
                })
                res.json({
                    code: 0,
                    msg: '获取成功',
                    data: data,
                    total: results.length
                })
            }
            connect.end()
        })
})

//返回所有书籍
listRouter.get('/allBookList',async (req, res, next) => {
    const connect =await db.connect();
    connect.query('select * from book where cover!=\'\'',
        (err, results) => {
            if (err) {
                return next(err)
            } else {
                results = results.map(item => constant.handleData(item))
                res.json({
                    code: 0,
                    msg: '获取成功',
                    data: results,
                    total: results.length
                })
            }
            connect.end()
        })
})

module.exports = listRouter;
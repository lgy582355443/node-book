const express = require('express')
const db = require('../db')

const shelfRouter = express.Router();

//添加属性
function handleData(data) {
    if (!data.cover.startsWith('http://')) {
        data['cover'] = `${host.resUrl}/img${data.cover}`
    }
    data['selected'] = false
    data['cache'] = false
    return data
}

//拼接书架列表
function returnShelf(shelfIdList, bookList) {
    shelfIdList.map(item => {
        if (item.type == 1) {
            let books = bookList.find(book => {
                return book.id == item.id
            })
            Object.assign(item, books)
        } else if (item.type == 2) {
            item.itemList.map((itemc) => {
                const bookc = bookList.find((book) => {
                    return book.id == itemc.id
                })
                Object.assign(itemc, bookc)
            })
        }
    })
    return shelfIdList
}

//获取书架列表
shelfRouter.get('/shelfList', async (req, res) => {
    const userId = req.query.userId;
    const connect = await db.connect();
    const queryAll = 'select * from book where cover!=\'\''
    const findByUid = `select * from shelf where userId="${userId}"`

    connect.query(findByUid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                code: 1,
                msg: '1获取失败'
            })
        } else {
            if (result.length > 0) {
                let shelfList = JSON.parse(result[0].shelfList);
                connect.query(queryAll, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            code: 1,
                            msg: '2获取失败'
                        })
                    } else {
                        if (result.length > 0) {
                            let bookList = result;
                            bookList.map(item => {
                                return handleData(item)
                            })
                            shelfList = returnShelf(shelfList, bookList);
                            res.json({
                                shelfList,
                                code: 0,
                                msg: '获取成功'
                            })
                        } else {
                            res.json({
                                code: 1,
                                msg: '3获取失败'
                            })
                        }
                    }
                })
            } else {
                res.json({
                    code: 0,
                    shelfList: [],
                    msg: '获取成功'
                })
            }
        }
        connect.end()
    })
})


//更新书架列表
shelfRouter.get('/updata', async (req, res) => {
    // console.log(req.query);
    let shelfData = req.query;
    const connect = await db.connect();
    const findByUid = `select * from shelf where userId="${shelfData.userId}"`
    const insert = `INSERT INTO shelf SET ?`
    const updata = `update shelf set ? where userId ="${shelfData.userId}"`

    connect.query(findByUid, (err, result) => {
        if (err) {
            console.log(err);
            res.json({
                code: 1,
                msg: '1更新失败'
            })
        } else {
            if (result.length > 0) {
                connect.query(updata, shelfData, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            code: 1,
                            msg: '2更新失败'
                        })
                    } else {
                        res.json({
                            code: 0,
                            msg: '更新成功'
                        })
                    }
                })
            } else {
                connect.query(insert, shelfData, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            code: 1,
                            msg: '3更新失败'
                        })
                    } else {
                        res.json({
                            code: 0,
                            msg: '更新成功'
                        })
                    }
                })
            }

        }
        connect.end()
    })
})

module.exports = shelfRouter
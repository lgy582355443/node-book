const express = require('express')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')
const jwt = require('jsonwebtoken')
const db = require('../db')
const avatarFilePath = require('../config').avatarFilePath;
const resUrl = require('../config').resUrl;
const setMD5 = require('../utils').setMD5;
const secretOrPrivateKey = require('../utils').secretOrPrivateKey;

const userRouter = express.Router();


//登录
userRouter.post('/login', async (req, res, next) => {
    const userName = req.body.userName;
    const md5Pwd = setMD5(req.body.password);
    const connect = await db.connect();
    const sql = `select * from user where userName="${userName}"`
    connect.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            next(err)
        } else if (result.length == 0) {
            res.json({
                code: 1,
                msg: '用户名或密码错误'
            })
        } else {
            if (result[0].password == md5Pwd) {
                let user = result[0];
                delete user.password;
                user.avatar = resUrl + '/user/avatar/' + user.avatar;
                //生成Token
                const token = jwt.sign({
                    userName
                }, secretOrPrivateKey, {
                    expiresIn: 60 * 60 * 24 * 7 // 一周过期
                });

                res.json({
                    token,
                    code: 0,
                    data: user,
                })
            } else {
                res.json({
                    code: 1,
                    msg: '用户名或密码错误'
                })
            }
        }
        connect.end()
    })
})

//注册
userRouter.post('/register', async (req, res, next) => {
    let user = req.body;
    if (user.userName == null || user.password == null || user.userName.trim() == '' || user.password.trim() == '') {
        res.json({
            code: 1,
            msg: '用户名或密码不能为空'
        })
        return
    }
    //对密码进行加密
    user.password = setMD5(user.password);
    const connect = await db.connect();
    const queryByName = `select * from user where userName="${user.userName}"`
    const insert = `INSERT INTO user SET ?`
    connect.query(queryByName, (err, result) => {
        if (err) {
            console.log(err);
            next(err)
        } else {
            if (result.length > 0) {
                res.json({
                    code: 1,
                    msg: '用户名已存在'
                })
            } else {
                connect.query(insert, user, (err, result) => {
                    if (err) {
                        console.log(err);
                        next(err)
                    } else {
                        res.json({
                            code: 0,
                            msg: '注册成功'
                        })
                    }
                })
            }
        }
        connect.end()
    })
})

//修改用户资料
userRouter.post("/updata", async (req, res, next) => {
    // const userId = req.params.userId;
    const connect = await db.connect();
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../upload'); //文件保存目录
    form.maxFieldsSize = 1 * 1024 * 1024; //用户头像大小限制为最大1M
    form.keepExtensions = true; //使用文件的原扩展名 
    // file是上传文件 fields是其他的数据
    form.parse(req, (err, fields, file) => {
        const files = file.file;
        let user = JSON.parse(fields.user);
        const updataSql = `update user set ? where id="${user.id}"`;
        const queryById = `select * from user where id="${user.id}"`;

        if (files) {
            let filePath = '';
            //上传文件的路径
            filePath = files.path;
            //获取文件后缀名
            const fileExt = filePath.substring(filePath.lastIndexOf('.'));
            //判断文件类型是否允许上传  
            if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
                const err = new Error('此文件类型不允许上传');
                res.json({
                    code: -1,
                    message: '此文件类型不允许上传'
                });
                next(err);
            } else {
                //以当前时间戳对上传文件进行重命名  
                const fileName = user.id + '_' + new Date().getTime() + fileExt;
                user.avatar = fileName;
                //文件移动的目录文件夹，不存在时创建目标文件夹  
                let targetDir = avatarFilePath;
                if (!fs.existsSync(targetDir)) {
                    fs.mkdirSync(targetDir);
                }
                const targetFile = path.join(targetDir, fileName);
                connect.query(queryById, (err, result) => {
                    if (err) {
                        console.log(err);
                        next(err)
                    } else {
                        if (result.length > 0) {
                            //旧头像文件名
                            const oldAvatar = result[0].avatar;
                            //移动文件 (旧文件名，新文件名，回调函数) 
                            fs.renameSync(filePath, targetFile, (err) => {
                                if (err) {
                                    console.log(err);
                                    next(err)
                                }
                                //删除旧的头像文件
                                if (oldAvatar && oldAvatar !== 'avatar.png') {
                                    fs.unlink(targetDir + '/' + oldAvatar, (err) => {
                                        if (err) {
                                            console.log(err);
                                            next(err)
                                        }
                                    })
                                }
                            });
                        }
                    }
                })
            }
        }
        connect.query(queryById, (err, result) => {
            if (err) {
                console.log(err);
                next(err)
            } else {
                if (result.length > 0) {
                    let newData = result[0]
                    Object.assign(newData, user)
                    connect.query(updataSql, newData, (err, result) => {
                        if (err) {
                            console.log(err);
                            next(err)
                        } else {
                            delete newData.password
                            newData.avatar = resUrl + '/user/avatar/' + user.avatar;
                            res.json({
                                code: 0,
                                data: newData,
                                msg: '更改成功'
                            })
                        }
                    })
                } else {
                    res.json({
                        code: 1,
                        msg: '没有找到用户'
                    })
                }
            }
            connect.end();
        })
    })
})

//获取用户信息
userRouter.get('/userInfo', async (req, res, next) => {
    const userId = req.query.id;
    const connect = await db.connect();
    const queryById = `select * from user where id="${userId}"`
    connect.query(queryById, (err, result) => {
        if (err) {
            console.log(err);
            next(err)
        } else {
            if (result.length > 0) {
                let user = result[0];
                delete user.password
                user.avatar = resUrl + '/user/avatar/' + user.avatar;
                res.json({
                    code: 0,
                    data: user,
                    msg: '获取成功'
                })
            } else {
                res.json({
                    code: 1,
                    msg: '没有找到用户'
                })
            }
        }
        connect.end()
    })
})
module.exports = userRouter
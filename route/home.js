const express = require('express')
const db = require('../db')
const resUrl = require('../config').resUrl;
const constant = require('../utils')

const homeRouter = express.Router();

const guessYouLikeID = [441, 444, 452, 463, 122, 308, 204, 365, 366];
const recommendID = [8, 319, 365];
const featuredID = [366, 118, 214, 277, 370, 284];
const ComputerScience = [192, 165, 196, 25];
const Laws = [277, 280, 281, 282];
const Education = [26, 214, 213, 217];

function getList(idList, arr) {
    let list = [];
    arr.forEach(item => {
        constant.handleData(item)
        if (idList.indexOf(item.id) > -1) {
            list.push(item)
        }
        return item
    })
    return list
}

//随机获取数组n项且不重复
function randomArr(n, l) {
    const arr = []
    for (let i = 0; i < l; i++) {
        arr.push(i)
    }
    const result = []
    for (let i = 0; i < n; i++) {
        // 0 到 arr.length-1
        const ran = Math.floor(Math.random() * (arr.length - i))
        //获取分类对应的序号
        result.push(arr[ran])
        // 将已经获取的随机数取代，用最后一位数
        arr[ran] = arr[arr.length - i - 1]
    }
    return result;
}

//猜你喜欢随机生成多少人在阅读,对xxx感兴趣
function createGuessYouLike(data) {
    const n = Math.floor(Math.random() * 3 + 1)
    data['type'] = n
    switch (n) {
        case 1:
            data['result'] = data.id % 2 === 0 ? '《Executing Magic》' : '《Elements Of Robotics》'
            break
        case 2:
            data['result'] = data.id % 2 === 0 ? '《Improving Psychiatric Care》' : '《Programming Languages》'
            break
        case 3:
            data['result'] = '《Living with Disfigurement》'
            data['percent'] = data.id % 2 === 0 ? '92%' : '97%'
            break
    }
    return data
}

// 热门推荐随机生成多少人在阅读
function createRecommend(data) {
    data['readers'] = Math.floor(data.id / 2 * (Math.random() * 100 + 100))
    return data;
}

homeRouter.get('/homeData', async (req, res, next) => {
    const connect = await db.connect();
    connect.query('select * from book where cover!=\'\'',
        (err, results) => {
            if (err) {
                next(err)
            } else {
                const length = results.length;
                const banner = [
                    {
                        id: 1,
                        url: resUrl + '/banner/banner1.jpg'
                    },
                    {
                        id: 2,
                        url: resUrl + '/banner/banner2.jpg'
                    },
                    {
                        id: 3,
                        url: resUrl + '/banner/banner3.jpg'
                    }
                ];
                const guessYouLike = getList(guessYouLikeID, results).map(item => {
                    return createGuessYouLike(item);
                });
                const recommend = getList(recommendID, results).map(item => {
                    return createRecommend(item);
                });
                const featured = getList(featuredID, results);
                const random = getList(randomArr(20, length), results);
                const categoryList = [
                    {
                        category: 9,
                        list: getList(Laws, results)
                    },
                    {
                        category: 4,
                        list: getList(Education, results)
                    },
                    {
                        category: 1,
                        list: getList(ComputerScience, results)
                    },
                ];
                res.json({
                    guessYouLike,
                    banner,
                    recommend,
                    featured,
                    random,
                    categoryList,
                })
            }
            connect.end()
        })
})

module.exports = homeRouter
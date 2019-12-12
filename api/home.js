const express = require('express')
const db = require('../db')
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

homeRouter.get('/homeData', async (req, res) => {
    const connect = await db.connect();
    connect.query('select * from book where cover!=\'\'',
        (err, results) => {
            if (err) {
                res.json({
                    code: 1,
                    msg: '获取失败'
                })
            } else {
                const length = results.length;
                const banner = [
                    {
                        id: 1,
                        url: db.resUrl + '/banner/banner1.jpg'
                    },
                    {
                        id: 2,
                        url: db.resUrl + '/banner/banner2.jpg'
                    },
                    {
                        id: 3,
                        url: db.resUrl + '/banner/banner3.jpg'
                    }
                ];
                const categories = [
                    {
                        category: 1,
                        num: 56,
                        img1: db.resUrl + '/cover/cs/A978-3-319-62533-1_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/cs/A978-3-319-89366-2_CoverFigure.jpg'
                    },
                    {
                        category: 2,
                        num: 51,
                        img1: db.resUrl + '/cover/ss/A978-3-319-61291-1_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/ss/A978-3-319-69299-9_CoverFigure.jpg'
                    },
                    {
                        category: 3,
                        num: 32,
                        img1: db.resUrl + '/cover/eco/A978-3-319-69772-7_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/eco/A978-3-319-76222-7_CoverFigure.jpg'
                    },
                    {
                        category: 4,
                        num: 60,
                        img1: db.resUrl + '/cover/edu/A978-981-13-0194-0_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/edu/978-3-319-72170-5_CoverFigure.jpg'
                    },
                    {
                        category: 5,
                        num: 23,
                        img1: db.resUrl + '/cover/eng/A978-3-319-39889-1_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/eng/A978-3-319-00026-8_CoverFigure.jpg'
                    },
                    {
                        category: 6,
                        num: 42,
                        img1: db.resUrl + '/cover/env/A978-3-319-12039-3_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/env/A978-4-431-54340-4_CoverFigure.jpg'
                    },
                    {
                        category: 7,
                        num: 7,
                        img1: db.resUrl + '/cover/geo/A978-3-319-56091-5_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/geo/978-3-319-75593-9_CoverFigure.jpg'
                    },
                    {
                        category: 8,
                        num: 18,
                        img1: db.resUrl + '/cover/his/978-3-319-65244-3_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/his/978-3-319-92964-4_CoverFigure.jpg'
                    },
                    {
                        category: 9,
                        num: 13,
                        img1: db.resUrl + '/cover/law/2015_Book_ProtectingTheRightsOfPeopleWit.jpeg',
                        img2: db.resUrl + '/cover/law/2016_Book_ReconsideringConstitutionalFor.jpeg'
                    },
                    {
                        category: 10,
                        num: 24,
                        img1: db.resUrl + '/cover/ls/A978-3-319-27288-7_CoverFigure.jpg',
                        img2: db.resUrl + '/cover/ls/A978-1-4939-3743-1_CoverFigure.jpg'
                    },
                    {
                        category: 11,
                        num: 6,
                        img1: db.resUrl + '/cover/lit/2015_humanities.jpg',
                        img2: db.resUrl + '/cover/lit/A978-3-319-44388-1_CoverFigure_HTML.jpg'
                    },
                    {
                        category: 12,
                        num: 14,
                        img1: db.resUrl + '/cover/bio/2016_Book_ATimeForMetabolismAndHormones.jpeg',
                        img2: db.resUrl + '/cover/bio/2017_Book_SnowSportsTraumaAndSafety.jpeg'
                    },
                    {
                        category: 13,
                        num: 16,
                        img1: db.resUrl + '/cover/bm/2017_Book_FashionFigures.jpeg',
                        img2: db.resUrl + '/cover/bm/2018_Book_HeterogeneityHighPerformanceCo.jpeg'
                    },
                    {
                        category: 14,
                        num: 16,
                        img1: db.resUrl + '/cover/es/2017_Book_AdvancingCultureOfLivingWithLa.jpeg',
                        img2: db.resUrl + '/cover/es/2017_Book_ChinaSGasDevelopmentStrategies.jpeg'
                    },
                    {
                        category: 15,
                        num: 2,
                        img1: db.resUrl + '/cover/ms/2018_Book_ProceedingsOfTheScientific-Pra.jpeg',
                        img2: db.resUrl + '/cover/ms/2018_Book_ProceedingsOfTheScientific-Pra.jpeg'
                    },
                    {
                        category: 16,
                        num: 9,
                        img1: db.resUrl + '/cover/mat/2016_Book_AdvancesInDiscreteDifferential.jpeg',
                        img2: db.resUrl + '/cover/mat/2016_Book_ComputingCharacterizationsOfDr.jpeg'
                    },
                    {
                        category: 17,
                        num: 20,
                        img1: db.resUrl + '/cover/map/2013_Book_TheSouthTexasHealthStatusRevie.jpeg',
                        img2: db.resUrl + '/cover/map/2016_Book_SecondaryAnalysisOfElectronicH.jpeg'
                    },
                    {
                        category: 18,
                        num: 16,
                        img1: db.resUrl + '/cover/phi/2015_Book_TheOnlifeManifesto.jpeg',
                        img2: db.resUrl + '/cover/phi/2017_Book_Anti-VivisectionAndTheProfessi.jpeg'
                    },
                    {
                        category: 19,
                        num: 10,
                        img1: db.resUrl + '/cover/phy/2016_Book_OpticsInOurTime.jpeg',
                        img2: db.resUrl + '/cover/phy/2017_Book_InterferometryAndSynthesisInRa.jpeg'
                    },
                    {
                        category: 20,
                        num: 26,
                        img1: db.resUrl + '/cover/psa/2016_Book_EnvironmentalGovernanceInLatin.jpeg',
                        img2: db.resUrl + '/cover/psa/2017_Book_RisingPowersAndPeacebuilding.jpeg'
                    },
                    {
                        category: 21,
                        num: 3,
                        img1: db.resUrl + '/cover/psy/2015_Book_PromotingSocialDialogueInEurop.jpeg',
                        img2: db.resUrl + '/cover/psy/2015_Book_RethinkingInterdisciplinarityA.jpeg'
                    },
                    {
                        category: 22,
                        num: 1,
                        img1: db.resUrl + '/cover/sta/2013_Book_ShipAndOffshoreStructureDesign.jpeg',
                        img2: db.resUrl + '/cover/sta/2013_Book_ShipAndOffshoreStructureDesign.jpeg'
                    }
                ];
                const guessYouLike = getList(guessYouLikeID, results).map(item => {
                    createGuessYouLike(item);
                    return item
                });
                const recommend = getList(recommendID, results).map(item => {
                    createRecommend(item);
                    return item
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
                    categories
                })
            }
            connect.end()
        })
})

module.exports = homeRouter
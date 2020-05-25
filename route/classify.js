const express = require('express')
const resUrl = require('../config').resUrl;
const classifyRouter = express.Router();

classifyRouter.get('/list', (req, res, next) => {
  const categories = [
    {
      category: 1,
      num: 56,
      img1: resUrl + '/cover/cs/A978-3-319-62533-1_CoverFigure.jpg',
      img2: resUrl + '/cover/cs/A978-3-319-89366-2_CoverFigure.jpg'
    },
    {
      category: 2,
      num: 51,
      img1: resUrl + '/cover/ss/A978-3-319-61291-1_CoverFigure.jpg',
      img2: resUrl + '/cover/ss/A978-3-319-69299-9_CoverFigure.jpg'
    },
    {
      category: 3,
      num: 32,
      img1: resUrl + '/cover/eco/A978-3-319-69772-7_CoverFigure.jpg',
      img2: resUrl + '/cover/eco/A978-3-319-76222-7_CoverFigure.jpg'
    },
    {
      category: 4,
      num: 60,
      img1: resUrl + '/cover/edu/A978-981-13-0194-0_CoverFigure.jpg',
      img2: resUrl + '/cover/edu/978-3-319-72170-5_CoverFigure.jpg'
    },
    {
      category: 5,
      num: 23,
      img1: resUrl + '/cover/eng/A978-3-319-39889-1_CoverFigure.jpg',
      img2: resUrl + '/cover/eng/A978-3-319-00026-8_CoverFigure.jpg'
    },
    {
      category: 6,
      num: 42,
      img1: resUrl + '/cover/env/A978-3-319-12039-3_CoverFigure.jpg',
      img2: resUrl + '/cover/env/A978-4-431-54340-4_CoverFigure.jpg'
    },
    {
      category: 7,
      num: 7,
      img1: resUrl + '/cover/geo/A978-3-319-56091-5_CoverFigure.jpg',
      img2: resUrl + '/cover/geo/978-3-319-75593-9_CoverFigure.jpg'
    },
    {
      category: 8,
      num: 18,
      img1: resUrl + '/cover/his/978-3-319-65244-3_CoverFigure.jpg',
      img2: resUrl + '/cover/his/978-3-319-92964-4_CoverFigure.jpg'
    },
    {
      category: 9,
      num: 13,
      img1: resUrl + '/cover/law/2015_Book_ProtectingTheRightsOfPeopleWit.jpeg',
      img2: resUrl + '/cover/law/2016_Book_ReconsideringConstitutionalFor.jpeg'
    },
    {
      category: 10,
      num: 24,
      img1: resUrl + '/cover/ls/A978-3-319-27288-7_CoverFigure.jpg',
      img2: resUrl + '/cover/ls/A978-1-4939-3743-1_CoverFigure.jpg'
    },
    {
      category: 11,
      num: 6,
      img1: resUrl + '/cover/lit/2015_humanities.jpg',
      img2: resUrl + '/cover/lit/A978-3-319-44388-1_CoverFigure_HTML.jpg'
    },
    {
      category: 12,
      num: 14,
      img1: resUrl + '/cover/bio/2016_Book_ATimeForMetabolismAndHormones.jpeg',
      img2: resUrl + '/cover/bio/2017_Book_SnowSportsTraumaAndSafety.jpeg'
    },
    {
      category: 13,
      num: 16,
      img1: resUrl + '/cover/bm/2017_Book_FashionFigures.jpeg',
      img2: resUrl + '/cover/bm/2018_Book_HeterogeneityHighPerformanceCo.jpeg'
    },
    {
      category: 14,
      num: 16,
      img1: resUrl + '/cover/es/2017_Book_AdvancingCultureOfLivingWithLa.jpeg',
      img2: resUrl + '/cover/es/2017_Book_ChinaSGasDevelopmentStrategies.jpeg'
    },
    {
      category: 15,
      num: 2,
      img1: resUrl + '/cover/ms/2018_Book_ProceedingsOfTheScientific-Pra.jpeg',
      img2: resUrl + '/cover/ms/2018_Book_ProceedingsOfTheScientific-Pra.jpeg'
    },
    {
      category: 16,
      num: 9,
      img1: resUrl + '/cover/mat/2016_Book_AdvancesInDiscreteDifferential.jpeg',
      img2: resUrl + '/cover/mat/2016_Book_ComputingCharacterizationsOfDr.jpeg'
    },
    {
      category: 17,
      num: 20,
      img1: resUrl + '/cover/map/2013_Book_TheSouthTexasHealthStatusRevie.jpeg',
      img2: resUrl + '/cover/map/2016_Book_SecondaryAnalysisOfElectronicH.jpeg'
    },
    {
      category: 18,
      num: 16,
      img1: resUrl + '/cover/phi/2015_Book_TheOnlifeManifesto.jpeg',
      img2: resUrl + '/cover/phi/2017_Book_Anti-VivisectionAndTheProfessi.jpeg'
    },
    {
      category: 19,
      num: 10,
      img1: resUrl + '/cover/phy/2016_Book_OpticsInOurTime.jpeg',
      img2: resUrl + '/cover/phy/2017_Book_InterferometryAndSynthesisInRa.jpeg'
    },
    {
      category: 20,
      num: 26,
      img1: resUrl + '/cover/psa/2016_Book_EnvironmentalGovernanceInLatin.jpeg',
      img2: resUrl + '/cover/psa/2017_Book_RisingPowersAndPeacebuilding.jpeg'
    },
    {
      category: 21,
      num: 3,
      img1: resUrl + '/cover/psy/2015_Book_PromotingSocialDialogueInEurop.jpeg',
      img2: resUrl + '/cover/psy/2015_Book_RethinkingInterdisciplinarityA.jpeg'
    },
    {
      category: 22,
      num: 1,
      img1: resUrl + '/cover/sta/2013_Book_ShipAndOffshoreStructureDesign.jpeg',
      img2: resUrl + '/cover/sta/2013_Book_ShipAndOffshoreStructureDesign.jpeg'
    }
  ];
  res.json({
    code: 0,
    msg: '获取成功',
    data: categories
  })
})

module.exports = classifyRouter

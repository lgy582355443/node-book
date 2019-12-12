const express = require('express')
const db = require('../db')
const constant = require('../utils')

const shelfRouter = express.Router();

shelfRouter.get('/shelfList', (req, res) => {
    res.json({
        code: 0,
        bookList: []
    })
})

module.exports = shelfRouter
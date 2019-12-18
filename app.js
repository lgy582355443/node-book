const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./api/user')
const homeRouter = require('./api/home')
const listRouter = require('./api/list')
const detailRouter = require('./api/detail')
const shelfRouter = require('./api/shelf')
const voiceRouter = require('./api/voice')

// const multipart = require('connect-multiparty');

const app = express();

app.use(cors());


// app.use(bodyParser.json());

//前端 Content-Type:application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(express.static('./public'));


app.use('/api/home', homeRouter);
app.use('/api/detail', detailRouter);
app.use('/api/shelf', shelfRouter);
app.use('/api/list', listRouter);
app.use('/api/user', userRouter);
app.use(voiceRouter);


function not_find_handler_middleware(err, res, next) {
    res.status(404)
        .json({
            message: `api不存在`
        })
}

function error_handler_middleware(err, req, res, next) {
    if (err) {
        let { message } = err;
        res.status(500)
            .json({
                message: `${message || '服务器异常'}`
            })
    } else {

    }
}

app.use(not_find_handler_middleware);
app.use(error_handler_middleware);

app.listen(3000, () => {
    console.log('3000端口服务启动')
})

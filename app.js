const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const expressJWT = require('./middlewares/jwt/index.js')
const app = express()
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
app.use(expressJWT)
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)
// 配置一个处理 404 的中间件
app.use(function (req, res) {
  res.render('404.html')
})

// 配置一个全局错误处理中间件
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.send({
      code: 401,
      msg: 'invalid token'
    })
  } else {
    res.status(500).json({
      code: 500,
      msg: err.message
    })
  }
})

app.listen(5000, () => {
  console.log('running... in 5000')
})

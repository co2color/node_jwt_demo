const expressJWT = require('express-jwt')
const donotNeedAuthorizationRouters = require('./router')
module.exports = expressJWT({
    algorithms: ['HS256'],
    secret: 'secret12345' // 签名的密钥 或 PublicKey
  }).unless({
    path: donotNeedAuthorizationRouters // 指定路径不经过 Token 解析
  })
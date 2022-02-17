const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
router.post('/login', (req, res) => {
  const token =
    'Bearer ' +
    jwt.sign(
      {
        username: req.body?.username||'no username',
        pwd: req.body?.password||'no password',
      },
      'secret12345',
      {
        expiresIn: 30
      }
    )
  res.send({
    code: 200,
    data: { token }
  })
})
router.post('/getToken', (req, res) => {
  res.send({ data: req.user })
})
router.get('/test', (req, res) => {
  res.send({ data: 123 })
})

module.exports = router

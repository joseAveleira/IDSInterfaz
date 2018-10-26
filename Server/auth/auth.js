/* jshint node: true */
'use strict'

var User = require('../models/user')
var service = require('./service')
var sanitize = require('mongo-sanitize')

exports.aliasLogin = function (req, res) {
  console.log('peticion POST')
  console.log(JSON.stringify(req.body, null, 2))
  var userName = sanitize(req.body.alias)
  var password = sanitize(req.body.password)
  User.findOne({
    $and: [{
      alias: userName
    }, {
      password: password
    }]
  },
  function (err, user) {
    if (err) {
      return res.status(500).send(err.message)
    }

    if (user === null) {
      return res.status(401).send({ mensaje: 'El usuario o la contraseña no son correctos' })
    } else {
      return res.status(200).send({
        token: service.createToken(user)
      })
    }
  }
  )
}

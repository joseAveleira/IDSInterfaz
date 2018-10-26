/* jshint node: true */
'use strict'
var middleware = require('../auth/middleware')
var Budget = require('../models/budget')
var sanitize = require('mongo-sanitize')

exports.list_all_budgets = function (req, res) {
  console.log('  -GET AG/presupuestos => todos los presupuestos ')
  Budget.find({}, function (err, budgets) {
    if (err) res.send(err)
    res.json(budgets)
  })
}

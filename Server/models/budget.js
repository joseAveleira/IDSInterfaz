var mongoose = require('mongoose')
var Schema = mongoose.Schema
// mongoimport --db Gelo --collection presupuestos --drop --file presupuestos.json --jsonArray
var BudgetSchema = new Schema({
  type: String,
  name: String,
  description: String,
  unit: String,
  value: Number
})
// Importante el nombre de la colección en SINGULAR
module.exports = mongoose.model('presupuesto', BudgetSchema)

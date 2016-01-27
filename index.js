'use strict'

let path = require('path')
let Quark = require('proton-quark')
let _ = require('lodash')

module.exports = class ModelsQuark extends Quark {

  constructor(app) {
    super(app)
  }

  configure() {
    if (!this.proton.app.models)
      this.proton.app.models = {}
    return true
  }

  initialize() {
    let modelsPath = path.join(this.proton.app.path, '/models')
    let models = require('require-all')(modelsPath)
    _.forEach(models, Model => new Model(this.proton))
  }

}

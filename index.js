'use strict'

let path = require('path')
let Hook = require('proton-hook')
let _ = require('lodash')

module.exports = class ModelsHook extends Hook {

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
    this.proton.app.models = models
  }

}

'use strict'

const path = require('path')
const Quark = require('proton-quark')
const _ = require('lodash')
const BaseModel = require('proton-base-model')

/**
 * @class ModelsQuark
 * @classdesc This quark is for instance models
 * @author Luis Hernandez
 */
class ModelsQuark extends Quark {

  constructor(app) {
    super(app)
  }

  /**
   * @override
   * @method configure
   * @description Ask if the proton.app.models object exist, if not exist
   * the method create the proton.app.models object
   * @author Luis Hernandez
   */
  configure() {
    return new Promise(resolve => {
      if (!this.proton.app.models) this.proton.app.models = {}
      resolve()
    })
  }

  /**
   * @override
   * @method initialize
   * @description instance all models of the app
   * @author Luis Hernandez
   */
  initialize() {
    return new Promise(resolve => {
      console.log('aqui', this._models)
      _.forEach(this._models, (Model, fileName) => {
        const model = new Model(this.proton)
        model.fileName = fileName
        this.proton.app.models[model.name] = model
        return model
      })
      resolve()
    })
  }

  /**
   * @method _models
   * @author Luis Hernandez
   */
  get _models() {
    const modelsPath = path.join(this.proton.app.path, '/api/models')
    return require('require-all')(modelsPath)
  }

  get name() {
    return 'models'
  }

}

module.exports = ModelsQuark

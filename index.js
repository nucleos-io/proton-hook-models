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
    if (!this.proton.app.models)
      this.proton.app.models = {}
  }

  /**
   * @override
   * @method initialize
   * @description instance all models of the app
   * @author Luis Hernandez
   */
  initialize() {
    _.forEach(this._models, (Model, fileName) => {
      const model = new Model(this.proton)
      this.proton.app.models[model.name] = model
      model.fileName = fileName
      return model
    })
  }

  /**
   * @method controllers
   * @description This method get the export value of each policy present
   * in the policies folder
   * @author Luis Hernandez
   * @return {Array} - All policies exported values as an array
   */
  get _models() {
    const modelsPath = path.join(this.proton.app.path, '/models')
    return require('require-all')(modelsPath)
  }

}

module.exports = ModelsQuark

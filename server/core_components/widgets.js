var fs = require('fs')
var path = require('path')
const _ = require('lodash')

const widgets = function() {
  var searchPath = '../react-client/src'
  var files = []
  var componentsConfig = []
  var id = 0
  var getFiles = function(searchPath, files){
    fs.readdirSync(searchPath).forEach(async function(file){
        var subpath = path.join(searchPath, file)
        if( fs.lstatSync(subpath).isDirectory() ){
          getFiles(subpath, files)
        } else {
          var filePath = path.join(searchPath, file)
          if (filePath.includes('Config.js')) {
            files.push(filePath)
          }
        }
      })
  }
  getFiles(searchPath, files)
  files = _.orderBy(files, ['name'], ['asc'])
  _.forEach(files, function(file){
    var widgets = require('../'+file)
    _.forEach(widgets, function(widget){
      componentsConfig.push({id: id+"", ...widget})
      id += 1
    })
  })
  id = 0
  return componentsConfig
}

module.exports = widgets

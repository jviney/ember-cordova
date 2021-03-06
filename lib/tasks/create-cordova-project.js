'use strict';

var Task            = require('./-task');
var cordovaPath     = require('../utils/cordova-path');
var camelize        = require('../../lib/utils/string.js').camelize;
var path            = require('path');
var fs              = require('fs');
var chalk           = require('chalk');

var cordovaProj     = require('cordova-lib').cordova;

module.exports = Task.extend({
  run: function(templatePath) {
    var emberCdvPath = cordovaPath(this.project, true);
    if (!fs.existsSync(emberCdvPath)) {
      this.ui.writeLine('Initting ember-cordova directory');
      fs.mkdirSync(emberCdvPath);
    }

    var cdvPath = path.join(emberCdvPath, 'cordova');
    if (!fs.existsSync(cdvPath)) {
      var id = camelize(this.id);
      var name = camelize(this.name);

      var config = {};
      if (templatePath !== undefined) {
        config = {
          lib: {
            www: { url: templatePath, template: true }
          }
        };
      }

      //Args must be in specific order for cordova-lib
      var args = [];
      args.push(cdvPath);
      args.push(id);
      args.push(name);
      args.push(config);
      return cordovaProj.raw.create.apply(this, args);
    } else {
      this.ui.writeLine(chalk.yellow(
        'Warning: ember-cordova/cordova project already exists. ' +
        'Please ensure it is a real cordova project.'
      ));
    }
  }
});


'use strict';

var Task               = require('./-task');
var Promise            = require('ember-cli/lib/ext/promise');
var BashTask           = require('../tasks/bash');

var path               = require('path');
var chalk              = require('chalk');
var getOpenCommand     = require('../utils/open-app-command');
var cordovaPath        = require('../utils/cordova-path');

module.exports = Task.extend({
  run: function() {
    var projectPath, open, command;
    var cdvPath = cordovaPath(this.project);

    if (this.platform === 'ios') {
      projectPath = path.join(cdvPath, 'platforms/ios/*.xcodeproj');

    } else if (this.platform === 'android') {
      projectPath = path.join(cdvPath, 'platforms/android/.project');

    } else {
      this.ui.writeLine(chalk.red(
        'The ' + this.platform +
        ' platform is not supported. Please use \'ios\' or \'android\''
      ));

      return Promise.reject();
    }

    this.ui.writeLine('Opening app for ' + this.platform);

    command = getOpenCommand(projectPath, this.application);
    open = new BashTask({
      command: command,
      ui: this.ui,
      options: {
        cwd: this.project.root
      }
    });

    return open.run();
  }
});

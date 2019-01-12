'use strict';

const Generator = require('yeoman-generator');
const chalk     = require('chalk');
const Promise   = require('bluebird');
const fs        = Promise.promisifyAll(require('fs'));

const excludeFolders = ['app','git-hooks', 'set-git-templates', 'lint-and-ignore']

module.exports = class extends Generator {
    prompting() {
        return fs.readdirAsync(this._sourceRoot.replace('/app/templates', ''))
            .then((files) => {
                this.log(chalk.bold.yellow('Available commands ' + require('../../package.json').version));

                for (let i = 0; i < files.length; i++) {
                  if(!excludeFolders.includes(files[i])) {
                    this.log(chalk.bold.green('yo') + ' hapi:' + files[i]);
                  }
                }
            })
            .catch((error) => {
                console.error(chalk.red(error));
                process.exit(1);
            });
    }
};

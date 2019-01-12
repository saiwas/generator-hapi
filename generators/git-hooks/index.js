'use strict';

const Generator = require('yeoman-generator');
const fs        = require('fs');

module.exports = class extends Generator {
    writing() {
        this.fs.copyTpl(
            this.templatePath('*'),
            this.destinationPath('.git/hooks'),
            this.answers,
            {},
            { globOptions: { dot: true } }
        );
    }

    install() {
        fs.chmodSync(this.destinationPath('.git/hooks/pre-commit'), '0755');
        fs.chmodSync(this.destinationPath('.git/hooks/commit-msg'), '0755');
        return this.spawnCommand('git', ['init']);
    }
};

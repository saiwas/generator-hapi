'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    writing() {
        this.fs.copyTpl(
            this.templatePath(),
            this.destinationPath(),
            this.answers,
            {},
            { globOptions: { dot: true } }
        );
        this.fs.copy(
            this.templatePath('gitignore'),
            this.destinationPath('.gitignore')
        );
    }
};

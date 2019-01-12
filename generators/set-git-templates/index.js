'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
    writing() {
        this.fs.copyTpl(
            this.templatePath('.github'),
            this.destinationPath('.github'),
            this.answers,
            {},
            { globOptions: { dot: true } }
        );
    }
};

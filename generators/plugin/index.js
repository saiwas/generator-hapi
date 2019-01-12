'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {

    async prompting() {
        this.answers = await this.prompt([
            {
                type   : 'input',
                name   : 'appName',
                message: 'Your Plugin Name',
                default: this.determineAppname().replace(/\s/g, '-').toLowerCase()
            }, {
                type   : 'input',
                name   : 'codeClimateToken',
                message: 'Codeclimate token',
                default: 'abcXYZ123'
            }
        ]);

    }

    writing() {
        this.fs.copyTpl(
            [
                this.templatePath()
            ],
            this.destinationPath(),
            this.answers,
            {},
            { globOptions: { dot: true } }
        );
        this.composeWith(require.resolve('../git-hooks'));
        this.composeWith(require.resolve('../set-git-templates'));
        this.composeWith(require.resolve('../lint-and-ignore'));
    }

    install() {
        this.installDependencies({ npm: true, bower: false });
    }

    end() {
        this.log('Bootstrapping Complete!');
    }
};

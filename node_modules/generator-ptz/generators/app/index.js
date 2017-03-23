'use strict';

var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    defaultPrompting = require('./defaultPrompting');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    //initializing - Your initialization methods (checking current project state, getting configs, etc)
    initializing() {
    }

    //prompting - Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        if (!this.options.isComposing)
            return defaultPrompting(this);
    }

    //    configuring - Saving configurations and configure the project (creating.editorconfig files and other metadata files)
    configuring() {
        this.log('configuring');
    }

    //default - If the method name doesn't match a priority, it will be pushed to this group.
    default() {
        this.log('default');
    }

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        console.log('ptz options =>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.options.ptz);

        this.fs.copy(this.templatePath('_tslint.json'), this.destinationPath('tslint.json'));
        this.fs.copy(this.templatePath('_gulpfile.js'), this.destinationPath('gulpfile.js'));
        this.fs.copy(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'));
        this.fs.copy(this.templatePath('_tsconfig.json'), this.destinationPath('tsconfig.json'));
        this.fs.copy(this.templatePath('_typings.json'), this.destinationPath('typings.json'));

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            this.options.ptz);

        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            this.options.ptz);

        this.fs.copy(this.templatePath('babelrc'), this.destinationPath('.babelrc'));
        this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
        this.fs.copy(this.templatePath('travis.yml'), this.destinationPath('.travis.yml'));

        this.fs.copy(this.templatePath('typings/_index.d.ts'), this.destinationPath('typings/index.d.ts'));

        this.fs.copy(this.templatePath('src/_index.ts'), this.destinationPath('src/index.ts'));
        this.fs.copy(this.templatePath('src/_errors.ts'), this.destinationPath('src/errors.ts'));
    }

    //conflicts - Where conflicts are handled (used internally)
    conflicts() {
        this.log('conflicts');
    }

    //install - Where installation are run (npm, bower)
    install() {
        if (!this.options.ptz.runNpmInstall)
            return;

        this.npmInstall(['babel-loader'], { 'save-dev': true });
        this.npmInstall(['ptz-assert'], { 'save-dev': true });
        this.npmInstall(['babel-core'], { 'save-dev': true });
        this.npmInstall(['babel-polyfill'], { 'save-dev': true });
        this.npmInstall(['babel-preset-es2015'], { 'save-dev': true });
        this.npmInstall(['codecov'], { 'save-dev': true });
        this.npmInstall(['gulp'], { 'save-dev': true });
        this.npmInstall(['gulp-babel'], { 'save-dev': true });
        this.npmInstall(['gulp-typescript'], { 'save-dev': true });
        this.npmInstall(['istanbul'], { 'save-dev': true });
        this.npmInstall(['mocha'], { 'save-dev': true });
        this.npmInstall(['mocha-lcov-reporter'], { 'save-dev': true });
        this.npmInstall(['nyc'], { 'save-dev': true });
        this.npmInstall(['sinon'], { 'save-dev': true });
        this.npmInstall(['typescript'], { 'save-dev': true });
        this.npmInstall(['typings'], { 'save-dev': true });
        this.npmInstall(['tslint'], { 'save-dev': true });
        this.npmInstall(['npm-run-all'], { 'save-dev': true });
    }

    //end - Called last, cleanup, say good bye, etc
    end() {
        this.log('end');
    }
};


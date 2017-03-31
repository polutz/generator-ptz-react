'use strict';

var Generator = require('yeoman-generator'),
    _ = require('lodash'),
    defaultPrompting = require('generator-ptz/generators/app/defaultPrompting');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
    }

    //initializing - Your initialization methods (checking current project state, getting configs, etc)
    initializing() {
        this.log('initializing');
    }

    //prompting - Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        return defaultPrompting(this);
    }

    //    configuring - Saving configurations and configure the project (creating.editorconfig files and other metadata files)
    configuring() {
        this.log('configuring');
    }

    //default - If the method name doesn't match a priority, it will be pushed to this group.
    default() {
        this.log('default');
        this.composeWith(require.resolve('generator-ptz/generators/app'), {
            isComposing: true,
            skipInstall: this.options.skipInstall,
            ptz: this.options.ptz
        });
    }

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        console.log('ptz-domain options =>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.options.ptz);

        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            this.options.ptz);

        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            this.options.ptz);


        this.fs.copy(this.templatePath('_webpack.config.js'), this.destinationPath('webpack.config.js'));
        this.fs.copy(this.templatePath('_package.json'), this.destinationPath('package.json'));
        this.fs.copy(this.templatePath('_webpack.config.js'), this.destinationPath('webpack.config.js'));


        this.fs.copy(this.templatePath('src/_app.tsx'), this.destinationPath('src/app.tsx'));
        this.fs.copy(this.templatePath('src/_AppDispatcher.ts'),
            this.destinationPath('src/AppDispatcher.ts'));


        this.fs.copy(this.templatePath('src/core/components/_Errors.tsx'),
            this.destinationPath('src/core/components/Errors.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_TextInput.tsx'),
            this.destinationPath('src/core/components/TextInput.tsx'));


        // Users - BEGIN
        this.fs.copy(this.templatePath('src/users/_userApi.ts'),
            this.destinationPath('src/users/userApi.ts'));

        this.fs.copy(this.templatePath('src/users/_userConstants.ts'),
            this.destinationPath('src/users/userConstants.ts'));

        this.fs.copy(this.templatePath('src/users/actions/_userServerActions.ts'),
            this.destinationPath('src/users/actions/userServerActions.ts'));

        this.fs.copy(this.templatePath('src/users/components/_CreateUserForm.tsx'),
            this.destinationPath('src/users/components/CreateUserForm.tsx'));

        this.fs.copy(this.templatePath('src/users/components/_User.tsx'),
            this.destinationPath('src/users/components/User.tsx'));

        this.fs.copy(this.templatePath('src/users/components/_UserReport.tsx'),
            this.destinationPath('src/users/components/UserReport.tsx'));

        this.fs.copy(this.templatePath('src/users/mutations/_SaveUserMutation.ts'),
            this.destinationPath('src/users/mutations/SaveUserMutation.ts'));

        this.fs.copy(this.templatePath('src/users/stores/_UserStore.ts'), 
            this.destinationPath('src/users/stores/UserStore.ts'));
        // Users - END
    }

    //conflicts - Where conflicts are handled (used internally)
    conflicts() {
        this.log('conflicts');
    }

    //install - Where installation are run (npm, bower)
    install() {
        console.log('install from ptz-domain');
        console.log(this.options.ptz.runNpmInstall);

        if (!this.options.ptz.runNpmInstall)
            return;

        console.log('installing from ptz-domain');
        this.npmInstall(['ptz-core-domain'], { 'save': true });
    }

    //end - Called last, cleanup, say good bye, etc
    end() {
        this.log('end');
    }
};
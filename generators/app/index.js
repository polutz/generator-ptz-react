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

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        console.log('ptz-domain options =>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.options.ptz);

        const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

        const pkg = _.merge({
            //"description": "this is a Polutz React App.",
            scripts: {
                "start": "npm run js && webpack && babel-node --presets react,es2015 dist/index.js",
                "front": "npm run js && webpack",
                "open:src": "babel-node tools/srcServer.js",
                "server": "npm run js && babel-node --presets es2015 dist/server/index.js"
            }
        }, currentPkg);

        // Let's extend package.json so we're not overwriting user previous fields
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);

        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            this.options.ptz);

        this.fs.copy(this.templatePath('_babelRelayPlugin.js'),
            this.destinationPath('babelRelayPlugin.js'));

        this.fs.copy(this.templatePath('_webpack.config.js'),
            this.destinationPath('webpack.config.js'));

        this.fs.copy(this.templatePath('_webpack.config.dev.js'),
            this.destinationPath('webpack.config.dev.js'));

        this.fs.copy(this.templatePath('_webpack.config.prod.js'),
            this.destinationPath('webpack.config.prod.js'));


        this.fs.copy(this.templatePath('src/_app.tsx'),
            this.destinationPath('src/app.tsx'));

        this.fs.copy(this.templatePath('src/_AppDispatcher.ts'),
            this.destinationPath('src/AppDispatcher.ts'));


        // Tools - DEGING

        this.fs.copy(this.templatePath('tools/_srcServer.js'),
            this.destinationPath('tools/srcServer.js'));
        // Tools - END


        // Core - DEGING
        this.fs.copy(this.templatePath('src/core/components/_Errors.tsx'),
            this.destinationPath('src/core/components/Errors.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_TextInput.tsx'),
            this.destinationPath('src/core/components/TextInput.tsx'));
        // Core - END

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

    //default - If the method name doesn't match a priority, it will be pushed to this group.
    default() {
        this.log('default');
        this.composeWith(require.resolve('generator-ptz/generators/app'), {
            isComposing: true,
            skipInstall: this.options.skipInstall,
            ptz: this.options.ptz
        });
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

        this.npmInstall(['file-loader'], { 'save-dev': true });
        this.npmInstall(['url-loader'], { 'save-dev': true });

        this.npmInstall(['webpack'], { 'save-dev': true });
        this.npmInstall(['webpack-bundle-analyzer'], { 'save-dev': true });
        this.npmInstall(['webpack-dev-middleware'], { 'save-dev': true });
        this.npmInstall(['webpack-hot-middleware'], { 'save-dev': true });
        this.npmInstall(['webpack-md5-hash'], { 'save-dev': true });

        this.npmInstall(['babel-preset-react'], { 'save-dev': true });
        this.npmInstall(['babel-relay-plugin'], { 'save-dev': true });

        this.npmInstall(['browser-sync'], { 'save-dev': true });
        this.npmInstall(['connect-history-api-fallback'], { 'save-dev': true });



        this.npmInstall(['classnames'], { 'save': true });
        this.npmInstall(['react'], { 'save': true });
        this.npmInstall(['react-dom'], { 'save': true });
        this.npmInstall(['flux'], { 'save': true });
        this.npmInstall(['react-relay'], { 'save': true });
        this.npmInstall(['graphql-relay'], { 'save': true });
        this.npmInstall(['react-router'], { 'save': true });
        this.npmInstall(['jquery'], { 'save': true });

        //   "dependencies": {
        //     "babel-loader": "^6.2.10",
        //     "jquery": "^3.1.1",
        //     "kerberos": "0.0.22"
    }

    //end - Called last, cleanup, say good bye, etc
    end() {
        this.log('end');
    }
};

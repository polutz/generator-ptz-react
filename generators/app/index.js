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
    }

    //prompting - Where you prompt users for options (where you'd call this.prompt())
    prompting() {
        return defaultPrompting(this);
    }

    //    configuring - Saving configurations and configure the project (creating.editorconfig files and other metadata files)
    configuring() {
    }

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

        const pkg = _.merge({
            //"description": "this is a Polutz React App.",
            scripts: {
                "start-message": "babel-node tools/startMessage.js",
                "start": "npm-run-all --parallel test:watch open:src",
                "test:watch": "npm run test -- --watch",
                "open:src": "babel-node tools/srcServer.js",

                //"start2": "npm-run-all --parallel test:watch open:src",
                "front": "npm run js && webpack",
                "start": "npm run js && webpack && babel-node --presets es2015 dist/simpleServer.js"
            },
            devDependencies: {
                "autoprefixer": "^6.7.7",
                "babel-eslint": "^7.2.1",
                "babel-jest": "^19.0.0",
                "babel-loader": "^6.4.1",
                "babel-plugin-transform-react-constant-elements": "^6.23.0",
                "babel-plugin-transform-react-remove-prop-types": "^0.3.3",
                "babel-preset-latest": "^6.24.1",
                "babel-preset-react": "^6.24.1",
                "babel-preset-react-hmre": "^1.1.1",
                "babel-relay-plugin": "^0.11.0",
                "browser-sync": "^2.18.8",
                "connect-history-api-fallback": "^1.3.0",
                "file-loader": "^0.11.1",
                "html-webpack-plugin": "^2.28.0",
                "url-loader": "^0.5.8",
                "webpack": "^2.3.3",
                "webpack-bundle-analyzer": "^2.3.1",
                "webpack-dev-middleware": "^1.10.1",
                "webpack-hot-middleware": "^2.18.0",
                "webpack-md5-hash": "0.0.5"
            },
            dependencies: {
                "classnames": "^2.2.5",
                "flux": "^3.1.2",
                "graphql-relay": "^0.5.1",
                "ptz-core-domain": "^1.2.2",
                "ptz-user-domain": "^1.2.5",
                "react": "^15.4.2",
                "react-dom": "^15.4.2",
                "react-hot-loader": "^1.3.1",
                "react-relay": "^0.10.0",
                "react-router": "^4.0.0"
            }
        }, currentPkg);

        // Let's extend package.json so we're not overwriting user previous fields
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);


        ////////////////////////////////////////////////////////////////////
        /// tsconfig.json - begin

        const currentTsconfig = this.fs.readJSON(this.destinationPath('tsconfig.json'), {});

        const newTsconfig = _.merge({
            compilerOptions: {
                jsx: "react"
            }
        }, currentTsconfig);

        this.fs.writeJSON(this.destinationPath('tsconfig.json'), newTsconfig);

        /// tsconfig.json - end
        ////////////////////////////////////////////////////////////////////


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


        // Tools - DEGING
        this.fs.copy(this.templatePath('tools/_webpack-public-path.js'),
            this.destinationPath('tools/webpack-public-path.js'));

        this.fs.copy(this.templatePath('tools/_srcServer.js'),
            this.destinationPath('tools/srcServer.js'));
        // Tools - END


        // src - DEGING
        this.fs.copy(this.templatePath('src/_simpleServer.ts'),
            this.destinationPath('src/simpleServer.ts'));

        this.fs.copy(this.templatePath('src/_index.ejs'),
            this.destinationPath('src/index.ejs'));

        // Not permanent
        this.fs.copy(this.templatePath('dist/_index.html'),
            this.destinationPath('dist/index.html'));

        this.fs.copy(this.templatePath('src/_app.tsx'),
            this.destinationPath('src/app.tsx'));

        this.fs.copy(this.templatePath('src/_AppDispatcher.ts'),
            this.destinationPath('src/AppDispatcher.ts'));

        this.fs.copy(this.templatePath('src/_graphqlServerUrl.ts'),
            this.destinationPath('src/graphqlServerUrl.ts'));
        // src - END


        // Core - DEGING
        this.fs.copy(this.templatePath('src/core/components/_IComponent.d.ts'),
            this.destinationPath('src/core/components/IComponent.d.ts'));

        this.fs.copy(this.templatePath('src/core/components/_Errors.tsx'),
            this.destinationPath('src/core/components/Errors.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_TextInput.tsx'),
            this.destinationPath('src/core/components/TextInput.tsx'));
        // Core - END

        // Users - BEGIN
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
        this.composeWith(require.resolve('generator-ptz/generators/app'), {
            isComposing: true,
            skipInstall: this.options.skipInstall,
            ptz: this.options.ptz
        });
    }

    //conflicts - Where conflicts are handled (used internally)
    conflicts() {
    }

    //install - Where installation are run (npm, bower)
    install() {
    }

    //end - Called last, cleanup, say good bye, etc
    end() {
    }
};

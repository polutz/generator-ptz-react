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
        var askFor = [{
            type: 'input',
            name: 'graphqlServerUrl',
            message: 'GraphQL Server Url',
            default: 'http://localhost:3011/graphql',
            store: true
        },
        {
            type: 'input',
            name: 'graphqlSchemaUrl',
            message: 'GraphQL Schema Url',
            default: 'http://localhost:3011/public/schema.json',
            store: true
        }];

        var getAnswers = (answers) => {
            if (!this.options.ptz)
                this.options.ptz = {};

            this.options.ptz.graphqlServerUrl = answers.graphqlServerUrl;
            this.options.ptz.graphqlSchemaUrl = answers.graphqlSchemaUrl;
        };

        return defaultPrompting(this, askFor, getAnswers);
    }

    //    configuring - Saving configurations and configure the project (creating.editorconfig files and other metadata files)
    configuring() {
    }

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

        const pkg = _.merge({
            description: "this is a Polutz React App.",
            scripts: {
                "js": "rimraf dist && tsc", // Babel needs to run with webpack
                "mocha": "mocha ./dist/**/*.js --require babel-polyfill --compilers js:babel-register",
                "pretest": "npm-run-all --parallel download-graphql-schema js lint",
                "prestart": "npm run pretest",
                "start": "npm run open:src",
                "test:watch": "npm run test -- --watch",
                "open:src": "babel-node tools/srcServer.js",
                "download-graphql-schema": "node tools/downloadGraphqlSchema.js"
            },
            devDependencies: {
                "@types/react": "^15.0.21",
                "@types/react-relay": "^0.9.12",
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
                "webpack": "~2.3.3",
                "webpack-bundle-analyzer": "~2.3.1",
                "webpack-dev-middleware": "^1.10.1",
                "webpack-hot-middleware": "^2.18.0",
                "webpack-md5-hash": "0.0.5",
                "@types/react-router": "^4.0.4"
            },
            dependencies: {
                "classnames": "^2.2.5",
                "fs": "^0.0.1-security",
                "graphql-relay": "^0.5.1",
                "ptz-core-domain": "^1.2.2",
                "ptz-menu-domain": "^1.0.0",
                "ptz-user-domain": "^1.2.5",
                "react": "^15.4.2",
                "react-dom": "^15.4.2",
                "react-hot-loader": "^1.3.1",
                "react-relay": "^0.10.0",
                "react-router": "^4.0.0",
                "prop-types": "^15.5.4",
                "react-router": "^2.5.1",
                "react-router-relay": "^0.13.7",
                "request": "^2.81.0"
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




        //////////////////////////////////////////////////////////////
        /// .babelrc - begin

        const currentBabelrc = this.fs.readJSON(this.destinationPath('.babelrc'), {});

        const newBabelrc = _.merge(
            {
                "presets": [
                    "es2015",
                    "react"
                ],
                "plugins": [
                    "./babelRelayPlugin"
                ]
            }, currentBabelrc);

        // Let's extend package.json so we're not overwriting user previous fields
        this.fs.writeJSON(this.destinationPath('.babelrc'), newBabelrc);

        /// .babelrc - end
        //////////////////////////////////////////////////////////////

        this.fs.copyTpl(
            this.templatePath('_README.md'),
            this.destinationPath('README.md'),
            this.options.ptz);

        this.fs.copy(this.templatePath('_babelRelayPlugin.js'),
            this.destinationPath('babelRelayPlugin.js'));

        this.fs.copy(this.templatePath('_webpack.config.dev.js'),
            this.destinationPath('webpack.config.dev.js'));

        this.fs.copy(this.templatePath('_webpack.config.prod.js'),
            this.destinationPath('webpack.config.prod.js'));


        // Tools - DEGING
        this.fs.copy(this.templatePath('tools/_webpack-public-path.js'),
            this.destinationPath('tools/webpack-public-path.js'));

        this.fs.copy(this.templatePath('tools/_srcServer.js'),
            this.destinationPath('tools/srcServer.js'));

        this.fs.copy(this.templatePath('tools/_downloadGraphqlSchema.js'),
            this.destinationPath('tools/downloadGraphqlSchema.js'));
        // Tools - END


        // src - DEGING
        this.fs.copy(this.templatePath('src/_index.ejs'),
            this.destinationPath('src/index.ejs'));

        this.fs.copy(this.templatePath('src/_index.tsx'),
            this.destinationPath('src/index.tsx'));

        this.fs.copy(this.templatePath('src/_routes.tsx'),
            this.destinationPath('src/routes.tsx'));

        this.fs.copyTpl(
            this.templatePath('src/_graphqlServerUrl.ts'),
            this.destinationPath('src/graphqlServerUrl.ts'),
            this.options.ptz);
        // src - END


        // Core - DEGING        
        this.fs.copy(this.templatePath('src/core/components/_IReactRef.d.ts'),
            this.destinationPath('src/core/components/IReactRef.d.ts'));

        this.fs.copy(this.templatePath('src/core/components/_Errors.tsx'),
            this.destinationPath('src/core/components/Errors.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_TextInput.tsx'),
            this.destinationPath('src/core/components/TextInput.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_Footer.tsx'),
            this.destinationPath('src/core/components/Footer.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_Header.tsx'),
            this.destinationPath('src/core/components/Header.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_Home.tsx'),
            this.destinationPath('src/core/components/Home.tsx'));

        this.fs.copy(this.templatePath('src/core/components/_Main.tsx'),
            this.destinationPath('src/core/components/Main.tsx'));

        this.fs.copy(this.templatePath('src/core/queries/_ViewerQueries.ts'),
            this.destinationPath('src/core/queries/ViewerQueries.ts'));
        // Core - END

        // Users - BEGIN
        this.fs.copy(this.templatePath('src/users/components/_CreateUserForm.tsx'),
            this.destinationPath('src/users/components/CreateUserForm.tsx'));

        this.fs.copy(this.templatePath('src/users/components/_User.tsx'),
            this.destinationPath('src/users/components/User.tsx'));

        this.fs.copy(this.templatePath('src/users/components/_UserReport.tsx'),
            this.destinationPath('src/users/components/UserReport.tsx'));

        this.fs.copy(this.templatePath('src/users/mutations/_SaveUserMutation.ts'),
            this.destinationPath('src/users/mutations/SaveUserMutation.ts'));
        // Users - END

        // menus - BEGIN
        this.fs.copy(this.templatePath('src/menus/components/_Menu.tsx'),
            this.destinationPath('src/menus/components/Menu.tsx'));

        this.fs.copy(this.templatePath('src/menus/components/_MenuItem.tsx'),
            this.destinationPath('src/menus/components/MenuItem.tsx'));
        // menus - END
    }

    //default - If the method name doesn't match a priority, it will be pushed to this group.
    default() {
        this.options.ptz.dontCreateIndexTs = true;
        this.options.ptz.dontCreateErrorsTs = true;

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

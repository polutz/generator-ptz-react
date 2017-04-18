'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('yo ptz-react', function () {
    describe('default', function () {
        before(function (done) {
            helpers.run(path.join(__dirname, '../app'))
                .withArguments(['MyCoolApp'])
                .withOptions({ skipInstall: true })
                .on('end', done);
        });

        it('creates files', function () {
            assert.file([
                'LICENSE',
                'package.json',
                'README.md',
                'tsconfig.json',
                '.gitignore',
                '.travis.yml',
                '.babelrc',
                'src/graphqlServerUrl.ts'
            ]);
        });

        it('creates tools files', function () {
            assert.file([
                'tools/srcServer.js',
                'tools/webpack-public-path.js',
                'tools/downloadGraphqlSchema.js'
            ]);
        });

        it('creates front files', function () {
            assert.file([
                'babelRelayPlugin.js',
                'webpack.config.dev.js',
                'webpack.config.prod.js',
                'src/index.ejs',
                'src/index.tsx'
            ]);
        });

        it('creates menus files', function () {
            assert.file([
                'src/core/components/Errors.tsx',
                'src/core/components/Footer.tsx',
                'src/core/components/Header.tsx',
                'src/core/components/Home.tsx',
                'src/core/components/IReactRef.d.ts',
                'src/core/components/Main.tsx',
                'src/core/components/TextInput.tsx',

                'src/core/queries/ViewerQueries.ts'
            ]);
        });

        it('creates menus files', function () {
            assert.file([
                'src/menus/components/Menu.tsx',
                'src/menus/components/MenuItem.tsx'
            ]);
        });

        it('creates users files', function () {
            assert.file([
                'src/users/components/CreateUserForm.tsx',
                'src/users/components/User.tsx',
                'src/users/components/UserReport.tsx',

                'src/users/mutations/SaveUserMutation.ts'
            ]);
        });
    });
});

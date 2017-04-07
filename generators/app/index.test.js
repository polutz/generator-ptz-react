'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('ptz-domain:app', function () {
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
                
                'src/index.ts',
                'src/errors.ts',

                'src/graphqlServerUrl.ts'
            ]);
        });

        it('creates tools files', function () {
            assert.file([                
                'tools/srcServer.js',
                'tools/webpack-public-path.js'
            ]);
        });

        it('creates front files', function () {
            assert.file([                
                'babelRelayPlugin.js',
                'webpack.config.js',
                'webpack.config.dev.js',
                'webpack.config.prod.js',
                'src/simpleServer.ts',
                'src/index.ejs',
                'dist/index.html',
                'src/app.tsx',
                'src/AppDispatcher.ts'
            ]);
        });

        it('creates core files', function () {
            assert.file([           
                'src/core/components/Errors.tsx',
                'src/core/components/TextInput.tsx'
            ]);
        });

        it('creates users files', function () {
            assert.file([
                'src/users/userConstants.ts',
                'src/users/actions/userServerActions.ts',
                'src/users/components/CreateUserForm.tsx',
                'src/users/components/User.tsx',
                'src/users/components/UserReport.tsx',
                'src/users/mutations/SaveUserMutation.ts',
                'src/users/stores/UserStore.ts',
            ]);
        });
    });
});

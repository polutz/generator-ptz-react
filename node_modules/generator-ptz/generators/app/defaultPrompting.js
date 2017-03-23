var _ = require('lodash');

function getAppName(appname) {
    return _.kebabCase(appname.replace(/\s+/g, '-'));
}

module.exports = function (that) {
    return that.prompt([{
        type: 'input',
        name: 'appname',
        message: 'Your project name',
        default: getAppName(that.appname), // Default to current folder name
        store: true
    },
    {
        type: 'input',
        name: 'githubAuthor',
        message: 'git hub Author',
        default: 'polutz',
        store: true
    },
    {
        type: 'input',
        name: 'codecovToken',
        message: 'get codecov token at https://codecov.io/'
    },
    {
        type: 'confirm',
        name: 'runNpmInstall',
        message: 'Run npm install?',
        default: true,
        store: true
    }]).then((answers) => {
        appname = getAppName(answers.appname);

        that.options.ptz = {
            appname: appname,
            appnameStartCase: _.startCase(appname).replace(/\s+/g, ''),
            codecovToken: answers.codecovToken,
            githubAuthorProject: answers.githubAuthor + '/' + appname,
            runNpmInstall: answers.runNpmInstall
        }
    });
}
'use strict';

var Generator = require('yeoman-generator'),
    _ = require('lodash');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.argument('componentName', { type: String, required: true });
    }

    //writing - Where you write the generator specific files (routes, controllers, etc)
    writing() {
        console.log('componentName before', this.options.componentName);
        console.log('componentName after', _.startCase(this.options.componentName));

        var vars = {
            componentName: _.startCase(this.options.componentName)
        };

        this.fs.copyTpl(
            this.templatePath('_StatelessComponent.tsx'),
            this.destinationPath('' + vars.componentName + '.tsx'),
            vars);
    }
};

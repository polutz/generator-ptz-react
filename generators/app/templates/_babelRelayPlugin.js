var getBabelRelayPlugin = require('babel-relay-plugin');
var schemaData = require('../ptz-graphql-test/dist/schema.json').data;

module.exports = getBabelRelayPlugin(schemaData);

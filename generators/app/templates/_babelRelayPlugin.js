var getBabelRelayPlugin = require('babel-relay-plugin');
var schemaData = require('./graphqlSchema.json').data;

module.exports = getBabelRelayPlugin(schemaData);

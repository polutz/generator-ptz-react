var request = require('request');
var fs = require('fs');
var log = require('ptz-log').default;

var url = 'http://localhost:3011/public/schema.json';

request.get({
    url: url,
    json: true,
    headers: { 'User-Agent': 'request' }
}, (err, res, data) => {
    if (err) {
        log('Error Downloading graphql schema.json:', err);
    } else if (res.statusCode !== 200) {
        log('Error Downloading graphql schema.json, Status:', res.statusCode);
    } else {
        fs.writeFile('./graphqlSchema.json', JSON.stringify(data), { encoding: 'utf8' }, (err) => {
            if (err)
                log('Error writing graphql schema.json:', err);
            else
                log('Graphql schema.json DOWNLOADED!!! ./schema.json');
        });
    }
});

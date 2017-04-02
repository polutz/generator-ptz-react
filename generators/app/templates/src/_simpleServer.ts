import express from 'express';

var app = express();

console.log('starting server');

app.use(express.static('dist'));

const PORT = 3010;

(async () => {
    try{
        app.listen(PORT, () => console.log('Listening on port ' + PORT));
    }
    catch(e){
        console.log(e);
    }
})();

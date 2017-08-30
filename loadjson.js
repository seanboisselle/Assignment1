const loadJsonFile = require('load-json-file');

loadJsonFile('listins.json').then(json => {
    console.log(json);
    //=> {foo: true}
});

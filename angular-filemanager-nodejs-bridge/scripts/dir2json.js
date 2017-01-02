require('dotenv').config();
var fs = require('fs');
var path = require('path');
var es = require('elasticsearch');

var directoryTreeToObj = function(dir, done) {
    var results = [];

    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);

        var pending = list.length;

        if (!pending)
            return done(null, {name: path.basename(dir), type: 'folder', children: results});

        list.forEach(function(file) {
            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    directoryTreeToObj(file, function(err, res) {
                        results.push({
                            name: path.basename(file),
                            type: 'folder',
                            children: res
                        });
                        if (!--pending)
                            done(null, results);
                    });
                }
                else {
                    results.push({
                        type: 'file',
                        name: path.basename(file)
                    });
                    if (!--pending)
                        done(null, results);
                }
            });
        });
    });
};

/*
Create a JSON object that will be indexed inside elasticsearch
*/
let indexJSON = {};
var dirTree = (process.env.DATA_DIR);
directoryTreeToObj(dirTree, function(err, res){
    if (err) console.log(err);
    let indexJSON = JSON.stringify(res);
    console.log(jsonRes);
});

/*
Function operation:
    drops existing index
    writes data to index
*/
let reindexES = () => {
}


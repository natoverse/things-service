'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    todos = require('./todos'),
    app = express(),
    port = process.env.PORT || 3000;

app.set('port', port);

app.get('/api/v1/things/lists/:list', function (req, res, next) {

    if (req.params.list !== 'today') {
        res.sendStatus(501);
    }

    todos.find().then(function (result) {
        res.json(result);
    });

});

app.get('/api/v1/things/todos/:id', function (req, res, next) {

    todos.findOne(req.params.id).then(function (result) {
        res.json(result);
    });

});

//load up the statusboard panels as static content
app.use(express.static(path.resolve(__dirname, '../statusboard')));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

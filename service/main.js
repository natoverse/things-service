'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    todos = require('./todos'),
    app = express(),
    port = process.env.PORT || 3000;

app.set('port', port);

var listMap = {},
    lists = ['inbox', 'today', 'next', 'scheduled', 'someday', 'projects', 'logbook', 'trash'];

lists.forEach(function (list) {
    listMap[list] = true;
});

app.get('/api/v1/things/lists/:list/todos', function (req, res, next) {

    if (!listMap[req.params.list]) {
        res.sendStatus(400);
    }

    todos.find(req.params.list).then(function (result) {
        res.json(result);
    });

});

app.get('/api/v1/things/lists/:list/todos/:id', function (req, res, next) {

    todos.findOne(req.params.id).then(function (result) {
        res.json(result);
    }).catch(function (err) {
        console.log(err);
        res.setStatus(500);
    });

});

app.put('/api/v1/things/lists/:list/todos/:id/status/:status', function (req, res, next) {

    //TODO: general-purpose update?
    if (req.params.status === 'completed' || req.params.status === 'open') {
        todos.setStatus(req.params).then(function (result) {
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(400);
    }

});

//load up the statusboard panels as static content
app.use(express.static(path.resolve(__dirname, '../statusboard')));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

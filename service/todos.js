'use strict';

var path = require('path'),
    applescript = require('applescript'),
    Promise = require('bluebird'),
    listScript = path.normalize(__dirname + '/../applescript/list-todos.applescript'),
    updateScript = path.normalize(__dirname + '/../applescript/update-todo.applescript');

function getList(listName) {

    var promise = new Promise(function (resolve, reject) {

        applescript.execFile(listScript, [listName], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(result));
            }
        });

    });

    return promise;
}

function updateStatus(listName, id, status) {

    var promise = new Promise(function (resolve, reject) {

        applescript.execFile(updateScript, [listName, id, status], function (err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });

    });

    return promise;
}

/**
 * Methods for working with the tasks. These delegate to applescript for raw processing, then manipulate the returned content as needed.
 * @type {{tasks: Function, task: Function}}
 */
module.exports = {

    //just assumes we're looking for 'today' at the moment, since that's all that has been built into the applescript.
    find: function (listName) {
        return getList(listName);
    },

    findOne: function (id) {

        var promise = new Promise(function (resolve, reject) {

            getList('today').then(function (results) {

                var match;

                results.some(function (todo) {
                    if (todo.id === id) {
                        match = todo;
                        return true;
                    }
                });

                if (match) {
                    resolve(match);
                } else {
                    reject();
                }

            });
        });

        return promise;
    },

    setStatus: function (params) {
        var listName = params.list,
            id = params.id,
            status = params.status;
        return updateStatus(listName, id, status);
    }

};

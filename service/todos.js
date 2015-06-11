'use strict';

var path = require('path'),
    applescript = require('applescript'),
    Promise = require('bluebird');

function getTodayList() {

    var promise = new Promise(function (resolve, reject) {

        applescript.execFile(path.normalize(__dirname + '/../applescript/things.applescript'), function (err, result) {
            if (err) {
                reject(err);
            } else {

                resolve(JSON.parse(result));
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
    find: function () {
       return getTodayList();
    },

    findOne: function (id) {

        var promise = new Promise(function (resolve, reject) {


            getTodayList().then(function (results) {

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
    }

};

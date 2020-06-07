const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const constants = require('../constants/ApplicationConstants');
const urlConstants = require('../constants/APIURLConstants');

const ping = require('../modules/ping/ping-controller');
const task = require('../modules/task/task-controller');
const user = require('../modules/user/user-controller');
const passport = require('passport');

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
}

module.exports = function (app) {
    const corsOptions = {
        exposedHeaders: [constants.tokenHeaderName],
    };

    // Run the context for each request. Assign a unique identifier to each request
    // app.use(httpRequestContext);
    // app.use(reqUUIDGenerator);

    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(urlConstants.pingURL, ping);
    app.use(urlConstants.userURL, user);
    app.use(urlConstants.taskURL, task);

    app.use(compression({ filter: shouldCompress }));
    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err)
        }
        res.status(500).send({ "error": err })
        // res.render('error', { error: err })
    });


}
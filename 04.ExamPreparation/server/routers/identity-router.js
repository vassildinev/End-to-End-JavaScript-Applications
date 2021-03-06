"use strict";

var express = require('express'),
    router = new express.Router(),
    mongoose = require('mongoose'),
    controller = require('../controllers/users-controller')(),
    auth = require('../config/auth');

router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.get('/signup', controller.showRegisterForm);
router.post('/users', controller.createUser);
router.post('/update', auth.isAuthenticated, controller.updateUser);
router.get('/users', auth.isInRole('admin'), controller.getAllUsers);

module.exports = function(app){
 /*
    //TODO: on route loader
 app.all('*', function(req, res, next) {
        res.locals.user = req.user;
        next();
    });
    */
    app.use('/identity', router);
};
var express = require('express');
var router = express.Router();

router.use(function(req, res, next){

    if(req.method === "GET") {

        // continue to next middleware or request handler
        return next();
    }
    if(!req.isAuthenticated()) {

        // user not authenticated, redirect to login page
        res.redirect('/#login');
    }

    // user authenticated continue to nexst middleware for handling
    return next();
});

router.route('/posts')

    //returns all posts
    .get((req, res) => {

        //temporary solution
        res.send({message: 'TODO return all posts'});
    })

    .post((req, res) => {

       //temporary solution
       res.send({message: 'TODO Create a new post'}); 
    });

router.route('/posts/:id')

    //returns a particular post
    .get((req, res) => {

        res.send({message: 'TODO return post with ID  ' + req.params.id});
    })

    //update existing post
    .put((req, res) => {
        
        res.send({message: 'TODO modify post with ID  ' + req.params.id});
    })

    //delete existing post
    .delete((req, res) => {
        
        res.send({message: 'TODO delete post with ID  ' + req.params.id});
    })

module.exports = router;
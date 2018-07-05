var express = require('express');
var router = express.Router();
var mongoose = requre('mongoose');
var Post = mongoose.model('Post');

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

//api for all posts
router.route('/posts')

    //returns all posts
    .get((req, res) => {

        Post.find(function (err, data){

            if(err){
                return res.send(500, err);
            }

            return res.send(data);

        });

    })

    //creates a new post
	.post(function(req, res){

		var post = new Post();
		post.text = req.body.text;
		post.created_by = req.body.created_by;
		post.save(function(err, post) {
			if (err){
				return res.send(500, err);
			}
			return res.json(post);
		});
	})

router.route('/posts/:id')

    //gets specified post
	.get(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);
			res.json(post);
		});
	}) 

    //updates specified post
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if(err)
				res.send(err);

			post.created_by = req.body.created_by;
			post.text = req.body.text;

			post.save(function(err, post){
				if(err)
					res.send(err);

				res.json(post);
			});
		});
	})

    //deletes the post
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});

module.exports = router;
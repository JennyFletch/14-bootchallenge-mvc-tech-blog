const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', async (req, res) => {

  try {
    res.render('login', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.get('/register', async (req, res) => {  

  try {
    res.render('register', {
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {

  try {
    const postData = await Post.findAll({
     where: {
        user_id: req.session.user_id,
     },
     include: [
          {
            model: User,
          },
          {
            model: Comment,
          },
        ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
        posts,
        logged_in: req.session.logged_in,
    });

  } catch (err) {
      console.error(err);
      res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Comment,
          },
        ],
      });
      const posts = postData.map((post) => post.get({ plain: true }));

      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
      const comments = commentData.map((comment) => comment.get({ plain: true }));

  
      res.render('homepage', {
        posts,
        comments,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
const router = require('express').Router();
const { Hobby, User, UserHobby, UserMatch } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  
    res.render('homepage', {
      logged_in: req.session.logged_in
    });
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {

    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
});


router.get('/search', withAuth, (req, res) => {

  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('search', {
    logged_in: req.session.logged_in
  });
});
  

router.get('/results', withAuth, (req, res) => {

  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('results', {
    logged_in: req.session.logged_in
  });
});


module.exports = router;
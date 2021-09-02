const router = require('express').Router();
const { Hobby, User, UserHobby, UserMatch } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req,res) => {
    try{
       res.render('login')
        
    } catch (error){
        res.status(500).json({name: error.name, message: error.message})
    }
});

router.get('/homepage', withAuth, (req, res) => {

    if (!req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('homepage');
});

router.get('/signup', (req, res) => {

    if (req.session.logged_in) {
      res.redirect('/homepage');
      return;
    }
  
    res.render('signup');
});


module.exports = router;
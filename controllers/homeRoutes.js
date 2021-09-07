const router = require('express').Router();
const { Hobby, User, 
  // UserHobby, 
  UserMatch } = require('../models');
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

router.get('/profile', withAuth, async (req, res) => {

  console.log(req.session.user_id);

  try {
    const userData = await User.findOne({
      include: [
            {   
              model: Hobby, 
            }
        ],
        where: {
        id: req.session.user_id,
      }
    });

    const user = userData.get({plain: true});
    //console.log(user.associated_hobbies[0].hobby_name)

    const hobby = user.hobby.hobby_name;
    
    res.render('profile', {
      user,
      hobby,
      logged_in: req.session.logged_in
    });

  } catch (error) {
    res.status(500).json({name: error.name, message: error.message})
  }

})

router.get('/edit/profile', withAuth, async (req, res) => {

  console.log(req.session.user_id);

  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      }
    });

    const user = userData.get({plain: true});
    console.log(user)

    res.render('editProfile', {
      user,
      logged_in: req.session.logged_in
    });

  } catch (error) {
    res.status(500).json({name: error.name, message: error.message})
  }

})
  

router.get('/chat', withAuth, (req, res) => {

  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('chat', {
    logged_in: req.session.logged_in
  });
});


module.exports = router;
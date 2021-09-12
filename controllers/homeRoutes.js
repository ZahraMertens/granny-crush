const router = require('express').Router();
const { Hobby, User, UserMatch } = require('../models');
// const { findByPk, findAll } = require('../models/User');
const withAuth = require('../utils/auth');


//If logged in (Validate through helper function)  then go to homepage
router.get('/', withAuth, (req, res) => {

  res.render('homepage', {
    logged_in: req.session.logged_in
  });
});

//Login is initial page load if user is not logged in
router.get('/login', (req, res) => {

  if (req.session.logged_in) {  //If user is logged in, user will get redirected to the homepage
    res.redirect('/');
    return;
  }

  res.render('login');
});

//Button click -> go to signup page
router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

//Render search page
router.get('/search', withAuth, (req, res) => {

  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  res.render('search', {
    logged_in: req.session.logged_in
  });
});

//Render user profile page based on user id from session.user_id
router.get('/profile', withAuth, async (req, res) => {

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

    const user = userData.get({ plain: true });

    const hobby = user.hobby.hobby_name;

    res.render('profile', {
      user,
      hobby,
      logged_in: req.session.logged_in
    });

  } catch (error) {
    res.status(500).json({ name: error.name, message: error.message })
  }
})

//Render edit profile page
router.get('/edit/profile', withAuth, async (req, res) => {

  console.log(req.session.user_id);

  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      }
    });

    const user = userData.get({ plain: true });
    console.log(user)

    res.render('editProfile', {
      user,
      logged_in: req.session.logged_in
    });

  } catch (error) {
    res.status(500).json({ name: error.name, message: error.message })
  }
})

//Render enter chatroom page
router.get('/chat', withAuth, async (req, res) => {

  try {
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      }
    });

    const user = userData.get({ plain: true });
    console.log(user)

     res.render('chat', {
       user,
       logged_in: req.session.logged_in
     });


  } catch (error) {
    console.log(error)
    res.status(500).json({name: error.name})
  }
});

//Render chat when user entered room
router.get('/chatRoom', withAuth, async (req, res) => {

     res.render('chatRoom', {
       logged_in: req.session.logged_in
     });
});

router.get('/match', withAuth, async (req, res) => {
  try {
    console.log(req.session.user_id);
    // Find user by PK (from req.params.id) and look for associated matches
    const matchData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: User,
          through: UserMatch,
          as: 'match',
          include: [
            {
              model: Hobby,
            },
          ]
        }
      ]
    })

    // serialize data and only pull what is in the match array
    // Note for front-end - please pass the match_id and the usermatch.id (primary key of the usermatch as data-attributes)
    const matches = matchData.get({ plain: true }).match;
    
    res.render('match', {
      matches,
      logged_in: req.session.logged_in,
    })
    
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;
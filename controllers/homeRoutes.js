const router = require('express').Router();
const { Hobby, User,
  // UserHobby, 
  UserMatch } = require('../models');
const { findByPk, findAll } = require('../models/User');
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

    const user = userData.get({ plain: true });
    //console.log(user.associated_hobbies[0].hobby_name)

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
    //Can't ge hobby
    console.log(matches)
    
    res.render('match', {
      matches,
      logged_in: req.session.logged_in,
    })
    // res.status(200).json(matches) // Change this to render when you have a HB file
  }
  catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = router;
const router = require('express').Router();
const { User, Hobby, UserMatch } = require('../../models');
const { Op } = require("sequelize");
const withAuth = require('../../utils/auth');
const { checkFileType, upload, storage } = require('../../utils/imageHelper')

//get all users FOR INSOMNIA
router.get('/', async (req, res) => {

    try {
        const userData = await User.findAll({
            include: [{
                model: Hobby,
            }]
        })
        res.status(200).json(userData)
    }
    catch (e) {
        console.log(e)
    }
})

//Get current user by id INSOMINA
router.get('/currentUser', async (req, res) => {

    try {
        const userData = await User.findOne({
           where: {
               id: req.session.id,
           }
        })
        res.status(200).json(userData)
    }
    catch (e) {
        console.log(e)
    }
})

//get all users by id
router.get('/:id', async (req, res) => {

    try {
        const userData = await User.findByPk(req.params.id,
            {
                include: [
                    {
                        model: Hobby,
                    }
                ]
            })
        res.status(200).json(userData)
    }
    catch (e) {
        console.log(e)
    }
})


router.get('/search/:minAge/:maxAge/:gender/:postcode', async (req,res) => {

    try{

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
          });

        const matches = matchData.get({ plain: true }).match;
        const matchidArr = matches.map((match)=> match.id)

        const userData = await User.findAll( 
            {
            include: [
                { 
                    model: Hobby, 
                }
            ],
            where: {
                age: {
                    [Op.between]: [ req.params.minAge ,  req.params.maxAge]
                },
                gender: req.params.gender,
                postcode: req.params.postcode,
                id: {
                    [Op.notIn]: matchidArr
                  }
            }
        }) 
        const usersAll = userData.map((user) => {
            return user.get({plain: true})
        });
            
        // console.log(usersAll)
            
        const currentUserId = req.session.user_id;
        // console.log(currentUserId)
            
        //Exlude the user who is logged into the account
        const users = usersAll.filter((user) => {
            return user.id !== currentUserId
        });
        
        if (users.length === 0){
            res.render('noResults', {
                logged_in: req.session.logged_in
            })
            return
        }
           
        res.render('results', {
            users,
            logged_in: req.session.logged_in
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({name: error.name, message: error.message})    
    }
})

//PUT INTO USER ROUTES
router.put('/:id', withAuth, async (req, res) => {
    const { name, age, gender, email, phone, postcode, fun_fact, hobby_name } = req.body;

    try {
        const hobbyData = await Hobby.findOne({
            where: {
                hobby_name: hobby_name
            }
        })
        // console.log(hobbyData)
        const hobbyId = hobbyData.get({ plain: true });

        const userData = await User.update({
            name: name,
            age: age,
            gender: gender,
            email: email,
            phone: phone,
            postcode: postcode,
            fun_fact: fun_fact,
            hobby_id: hobbyId.id
        }, {
            where: {
                id: req.params.id,
            },
        })

        if (!userData) {
            res.status(404).json({ message: 'The post data is invalid' });
            return
        }

        res.status(200).json(userData)

    } catch (error) {
        res.status(500).json({ name: error.name, message: error.message })
    }
})

//When user is logging in, user.id gets saved in session
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData) {
            alert("Incorrect Email or Password! Please try again")
            return;
        }

        const validPass = await userData.checkPassword(req.body.password);

        if (!validPass) {
            res.status(400).json({ message: 'Incorrect email or password' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'Login Success!' })
        })

    } catch (error) {
        res.status(404).json({ message: "specific error to not show the user where the error is" })
    }
});


router.post('/signup', async (req, res) => {
    try {
        const { name, password, age, gender, email, phone, postcode, fun_fact, hobby_name } = req.body

        const hobbyData = await Hobby.findOne({
            where: {
                hobby_name: req.body.hobby_name
            }
        })

        const hobbyId = hobbyData.get({ plain: true });

        const userData = await User.create(
            {
                name: name,
                age: age,
                gender: gender,
                password: password,
                email: email,
                phone: phone,
                postcode: postcode,
                fun_fact: fun_fact,
                hobby_id: hobbyId.id
            })

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });

    } catch (error) {
        res.status(500).json({ name: error.name, message: error.message })
    }
});

router.post('/logout', async (req, res) => {

    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const userData = await User.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!userData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        req.session.destroy(() => {
            res.status(200).end();
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// MULTER ROUTES
router.post("/profile", async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log('error1')
            console.log(err)
            res.redirect("/profile")
        } else {

            if (req.file == undefined) {
                console.log("error2")
                res.redirect("/profile")
            } else {
                console.log(req.file)
                console.log("error3")

                const userData = await User.update({ filename: req.file.filename }, {
                    where: {
                        id: req.session.user_id,
                    },
                })

                res.redirect("/profile")
            }
        }
    });
});

module.exports = router;
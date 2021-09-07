const router = require('express').Router();
const { User, Hobby , UserHobby , UserMatch} = require('../../models');
const { Op } = require("sequelize");
const withAuth = require('../../utils/auth');
const {checkFileType, upload, stotage} = require('../../utils/imageHelper')

//get all users FOR INSOMNIA
router.get('/', async (req,res)=>{
    
    try{
        
        const userData = await User.findAll({
            include: [{ model: Hobby, through: UserHobby, as: 'associated_hobbies' }]
        })
        res.status(200).json(userData)
    }
    catch(e){
        console.log(e)
    }
})

//get all users by id
router.get('/:id', async (req,res)=>{
    
    try{
        
        const userData = await User.findByPk(req.params.id, 
            {
            include: [
                { model: Hobby, 
                  through: UserHobby, 
                  as: 'associated_hobbies' 
                }
            ]
        })
        res.status(200).json(userData)
    }
    catch(e){
        console.log(e)
    }
})

// SEARCH for matches from search bar

// !!! EXCLUDE LOGGED IN USER FROM SEARCH
router.post('/search', async (req,res)=>{


    try{
        const userData = await User.findAll( 
            {
            include: [
                {   
                  model: Hobby, 
                  through: UserHobby, 
                  as: 'associated_hobbies' 
                }
            ],
            where: {
                age: {
                    [Op.between]: [ req.body.minAge ,  req.body.maxAge]
                },
                gender: req.body.gender,
                postcode: req.body.postcode,
            }
        })

        // if it returns an empty array, return 404. !userData wasn't working because it was technically an empty array if empty.
        if (userData.length===0){
            res.status(404).json("No users found")
            return
        }
           
        const usersAll = userData.map((user) => {
            return user.get({plain: true})
        });

        console.log(usersAll)

        const currentUserId = req.session.user_id;
        console.log(currentUserId)

        //Exlude the user who is logged into the account
        const users = usersAll.filter((user) => {
            return user.id !== currentUserId
        });

        console.log(users)
        // console.log(users) //returns object of user 
        //PG edit - returns the users array/object as a response for us to use in the fetch / front end. No need to store in DB. 
        res.status(200).json(users);

        // const currentUser = req.session.user_id
        // console.log(currentUser) //Returns current user id "4"

        // const usersId = users.map(({id}) => id);
        // console.log(usersId) //Returns an array of the users matches ids [ 1, 2 ]

        //Create match between user with id 4 and the results
        // UserMatch.bulkCreate(newUserMatch)
        
    }
    catch(error){
        res.status(500).json({name: error.name, message: error.message})    
    }
})

// router.get('/search/:minAge/:maxAge/:gender/:postcode', withAuth, async (req,res) => {

//     console.log(req.params)
//     try{
//         const userData = await User.findAll( 
//             {
//             include: [
//                 { model: Hobby, 
//                   through: UserHobby, 
//                   as: 'associated_hobbies' 
//                 }
//             ],
//             where: {
//                 age: {
//                     [Op.between]: [ req.params.minAge ,  req.params.maxAge]
//                 },
//                 gender: req.params.gender,
//                 postcode: req.params.postcode,
//             }
//         })
//         // if it returns an empty array, return 404. !userData wasn't working because it was technically an empty array if empty.
//         if (userData.length===0){
//             res.status(404).json("No users found")
//             return
//         }
           
//         const users = userData.map((user) => {
//             return user.get({plain: true})
//         });

//         console.log(users)

//         res.render('results', {
//             users,
//             logged_in: req.session.logged_in
//         })
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({name: error.name, message: error.message})    
//     }
// })


// get all users matched 
// router.get('/match/:id', async (req,res)=>{
//     try{
//         const userData = await User.findAll({
//             include: [{ model: Hobby, through: UserHobby, as: 'associated_hobbies' }]
//         })
//         res.status(200).json(userData)
//     }
//     catch(e){
//         console.log(e)
//     }
// })

//PUT INTO USER ROUTES
router.put('/:id', withAuth, async (req, res) => {
   
    try{
  
      const userData = await User.update(req.body, {
            where: {
              id: req.params.id,
            },
      });

    //   const hobbyData = await Hobby.findOne({
    //       where: {
    //           hobby_name: req.body.hobby_name
    //       }
    //   })

    //   const hobby = hobbyData.get({plain: true});
    //   console.log(hobby.id)

    //   const hobbyUser = await UserHobby.update(hobby.id, {
    //      where:{
    //          user_id: req.params.id,
    //      }
    //   })

    //   const hobbyUpdate = hobbyUser.get({plain: true})
    //   console.log(hobbyUpdate)
    //   const hobbyId = hobbyData.map((hobby) => hobby.get({ plain: true }))
    //   const userHobbyData = UserHobby.create({
    //     user_id: userData.id,
    //     hobby_id: hobbyId[0].id
    //   })
  
      if (!userData) {
        res.status(404).json({message: 'The post data is invalid'});
        return
      }
  
      res.status(200).json(userData)
  
    } catch (error){
      res.status(500).json({name: error.name, message: error.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!userData){
            alert("Incorrect Email or Password! Please try again")
            return;
        }
        
        const validPass = await userData.checkPassword(req.body.password);

        if (!validPass){
            res.status(400).json({message: 'Incorrect email or password'});
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({user: userData, message: 'Login Success!' })
        })

    } catch (error) {
        res.status(404).json({message: "specific error to not show the user where the error is"})
    }
});


router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create(req.body)
        const hobbyData = await Hobby.findAll({
            where: {
                hobby_name: req.body.hobby_name
            }
        })
        const hobbyId = hobbyData.map((hobby) => hobby.get({ plain: true }))
        const userHobbyData = UserHobby.create({
            user_id: userData.id,
            hobby_id: hobbyId[0].id
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

          const userData = await User.update({filename: req.file.filename}, {
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
const router = require('express').Router();
const { User, Hobby , UserHobby , UserMatch} = require('../../models');
const { Op } = require("sequelize");

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
router.post('/search', async (req,res)=>{
    try{
        const userData = await User.findAll( 
            {
            include: [
                { model: Hobby, 
                  through: UserHobby, 
                  as: 'associated_hobbies' 
                }
            ],
            where:{
                age: {
                    [Op.between]: [ req.body.minAge ,  req.body.maxAge]
                },
                gender: req.body.gender,
                postcode: req.body.postcode,
            }
        })

        if (!userData){
            res.status(404).json({name: error.name, message: error.message})
        } else {
            console.log(userData)
            res.status(200).json(userData)
        }

        // const users = userData.map((user) => {
        //     user.get({plain: true})
        // })

        // console.log(users)

        // res.render('results', {
        //     ...users,
        //     logged_in: req.session.logged_in
        // })
    }
    catch(e){
        console.log(e)
    }
})

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
        const userData = User.create(req.body)
        // .then((user) => {

        //     if(req.body.hobby_name.length){
        //         const hobbyArray = req.body.hobby_name.map((hobby_id) => {
        //             return {
        //                 user_id: user.id,
        //                 hobby_id,
        //             };
        //         });
        //         return UserHobby.create(hobbyArray)
        //     }

        //     res.status(200).json(user);

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.logged_in = true;

                res.status(200).json(userData);
            });

        // })
        // .catch((error) => {
        //     console.log(error)
        //     res.status(404).json({name: error.name, message: error.message})
        // })

    } catch (error) {
        res.status(500).json({name: error.name, message: error.message})
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

    
module.exports = router;
const User = require('./User');
const Hobby = require('./Hobby');
const UserHobby = require ('./UserHobby');
 const UserMatch = require ('./UserMatch');


// User and Hobby many to many relationship (through UserHobby)
User.belongsToMany(Hobby,{
    through:{
        model:UserHobby,
        unique:false,
    },
    as:'associated_hobbies'
})

Hobby.belongsToMany(User,{
    through:{
        model:UserHobby,
        unique: false,
    },
    as:'associated_users'
})

// User and User many to many relationship (through UserHobby)
// User.belongsToMany(User,{
//     through:{
//         model:UserMatch
//     },
//     as: 'user_id',
//     foreignKey: 'id'
// })

User.belongsToMany(User,{
    through:UserMatch,
    as: 'match'
})

module.exports = { User, Hobby, UserHobby, UserMatch }
const User = require('./User');
const Hobby = require('./Hobby');
const UserMatch = require('./UserMatch');


// // User and Hobby many to many relationship (through UserHobby)
// User.belongsToMany(Hobby,{
//     through:{
//         model:UserHobby,
//         unique:false,
//     },
//     as:'associated_hobbies'
// })

// Hobby.belongsToMany(User,{
//     through:{
//         model:UserHobby,
//         unique: false,
//     },
//     as:'associated_users'
// })

// User belongs to Hobby
User.belongsTo(Hobby, {
    foreignKey: 'hobby_id',
})
// Hobby has Many user
Hobby.hasMany(User, {
    foreignKey: 'hobby_id',
})

// This also creates a user_id / userId and a match_id / matchId automatically without having to define in the model

User.belongsToMany(User, {
    through: UserMatch,
    as: 'match'
})

module.exports = { User, Hobby, UserMatch }
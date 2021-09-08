const router = require('express').Router();
const { User, Hobby, UserMatch } = require('../../models');
const { Op } = require("sequelize");
const withAuth = require('../../utils/auth');

// SAVE NEW MATCH 
//api/matches/id
router.post("/:user_id/:id", async (req, res) => {
    // PASS match's user_id from frontend in params, user id from req.session_user_id
    try {
        const userMatchData = await UserMatch.create({
            userId: req.params.user_id,
            matchId: req.params.id
        });

        res.status(200).json({ userMatch: userMatchData, message: 'Match created!' })

    } catch (error) {
        res.status(404).json({ message: "Unsuccessful" })
    }
})

router.delete("/:id", async (req, res) => {
    // Use the userMatch.id (primary key) as you create the handlebars file
    try {
        const userMatchData = await UserMatch.destroy({
            where: { id: req.params.id }
        })

        res.status(200).json({ userMatch: userMatchData, message: 'Delete successful' })

    } catch (error) {
        res.status(404).json({ message: "Unsuccessful" })
    }
})

module.exports = router;
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const matchRoutes = require('./matchRoutes')

router.use('/users', userRoutes);
router.use('/matches', matchRoutes)

module.exports = router;
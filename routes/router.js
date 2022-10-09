const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware.js')
const authController = require('../controller/authController.js')

router.post('/register', authMiddleware.validateRegister, authController.register)
router.post('/login', authController.login)
router.get('/logout', authMiddleware.checkToken, authController.logout)

router.get('/profile', authMiddleware.isLoggedIn, (req, res) => {
    console.log(req.userData)
    res.status(200).send({
        status: 'success',
        message: 'This is your profile page. Only logged in users can see that!',
        user: req.userData
    })
})

module.exports = router
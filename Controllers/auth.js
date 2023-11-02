const bcrypt = require('bcryptjs')
const User = require('../Models/user')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        //Check user
        const { username, password } = req.body
        let user = await User.findOne({ username })
        if (user) {
            return res.status(400).send(`User exists`)
        }
        const salt = await bcrypt.genSalt(10)
        user = new User({
            username,
            password,
        })

        //Encrypt
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        res.send(`Register Success`)

    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body
        let user = await User.findOneAndUpdate({ username }, { new: true })
        if (user) {

            //Check Password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).send(`Passwordไม่มี`)
            }
            //Payload
            const payload = {
                user: {
                    username: user.username
                }
            }
            //Gen Token
            jwt.sign(payload, 'jwtSecret', { expiresIn: '1d' }, (err, token) => {
                if (err) throw err
                res.json({ token, payload })
            })




        } else {
            return res.status(400).send(`User ไม่มี`)
        }


    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

exports.currentUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.user.username })
            .select('-password')
            .exec()
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

exports.listUser = async (req, res) => {
    try {

        res.send(`list User`)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

exports.editUser = async (req, res) => {
    try {

        res.send(`edit User`)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}

exports.deleteUser = async (req, res) => {
    try {

        res.send(`delete User`)
    } catch (error) {
        console.log(error)
        res.status(500).send(`Server Error!`)
    }
}
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const db = require('../lib/psql.db.js')
const format = require('pg-format')

module.exports = {
    register: (req, res) => {
        db.query(format('SELECT * FROM users WHERE LOWER(username) = LOWER(%L)', req.body.username), (err, result) => {
            // check username
            if (result.length) {
              return res.status(409).send({
                status: 'Failed',
                message: 'This username is already in use!'
              })
            }
            // encrypt password
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).send({
                    status: 'Failed',
                    message: err
                    })
                }
                // insert user
                const value = [ `${uuid.v4()}`, `${req.body.name}`, `${req.body.username}`, `${hash}`]
                db.query(format(`INSERT INTO users (uuid, name, username, password, created_at) VALUES (%L, now())`, value), (err, result) => {
                    if (err) {
                        return res.status(400).send({
                            status: 'Failed',
                            message: err
                        })
                    }
                    return res.status(201).send({
                        status: 'success',
                        message: 'Registered!',
                        data: req.body
                    })
                })
            })
        })
    },
    login: (req, res) => {
        db.query(format('SELECT * FROM users WHERE username = %L', `${req.body.username}`), (err, result) => {
            if (err) {
                return res.status(400).send({
                    status: 'Failed',
                    message: err
                })
            }
            // check username
            if (result.rowCount == 0) {
                return res.status(401).send({
                    status: 'Failed',
                    message: 'Username or password is incorrect!'
                })
            }
            // check password
            bcrypt.compare(req.body.password, result.rows[0].password, (bErr, bResult) => {
                // wrong password
                if (bErr) {
                //   throw bErr
                  return res.status(401).send({
                    message: 'Username or password is incorrect!'
                  })
                }
                if (bResult) {
                    const payload = {
                        username: result.rows[0].username,
                        userId: result.rows[0].uuid
                    }
                    const secret = 'SECRETKEY'
                    const options = {
                        expiresIn: '7d'
                    }
                    const token = jwt.sign(payload, secret, options)
                    db.query(`UPDATE users SET last_login = now() WHERE uuid = '${result.rows[0].uuid}'`)
                    return res.status(200).send({
                        status: 'Success',
                        message: 'Logged in!',
                        jwt: {
                            token: token,
                            expires_in: '7d'
                        },
                        user: {
                            uuid: result.rows[0].uuid,
                            username: result.rows[0].username,
                            registered: result.rows[0].registered,
                            last_login: result.rows[0].last_login
                        }
                    })
                }
                return res.status(401).send({
                    status: 'Failed',
                    message: 'Username or password is incorrect!'
                })
            })
        })
    },
    logout: (req, res) => {
        // req.user.deleteToken(req.token,(err,user) => {
        //     if (err) return res.status(400).send(err)
        //     res.status(200).send({
        //         status: 'success',
        //         message: 'You have logged out!'
        //     })
        // })
        res.send(req.userData)
    }
}
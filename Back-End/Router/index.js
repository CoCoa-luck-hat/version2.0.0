const express = require('express')
const router = express.Router()
const { pool } = require('../Database/connectMysql')
const { RegisterValidator, LoginValidator } = require('../Middleware/Validator')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { VerifyToken } = require('../Middleware/VerifyToken')

router.post('/register', RegisterValidator, async (req, res) => {
    try {
        const errorVali = validationResult(req)
        if (!errorVali.isEmpty()) {
            return res.status(400).json({
                errorVali: errorVali.array()
            })
        }
        const { username, email, password } = req.body
        const [row] = await pool.execute("SELECT * FROM `users` WHERE email = ?", [email])
        if (row.length >= 1) {
            return res.status(409).json({
                message: 'อีเมลซ้ำ',
                register: false
            })
        }

        const [response] = await pool.execute("INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`, `created_at`) VALUES (NULL, ?, ?, ?, 'User', CURRENT_TIMESTAMP)", [username, email, password])

        res.status(200).json({
            message: 'สมัครสมาชิกสำเร็จ'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์'
        })
    }
})

router.post('/login', LoginValidator, async (req, res) => {
    try {
        const errorVali = validationResult(req)
        if (!errorVali.isEmpty()) {
            return res.status(400).json({
                errorVali: errorVali.array()
            })
        }

        const { email, password } = req.body

        const [row] = await pool.execute("SELECT id,username,email,password,role,DATE_FORMAT(created_at,'%Y-%m-%d') FROM `users` WHERE `email` = ? AND `password` = ?", [email, password])
        if (row.length == 0) {
            return res.status(404).json({
                message: 'อีเมลหรือรหัสผ่านผิด',
                login: false
            })
        } else {
            const user = row[0]
            const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.TOKEN_KEY, { expiresIn: '1h' })
            return res.status(200).json({
                message: 'เข้าสู่ระบบสำเร็จ',
                user: user,
                token: token
            })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์',
            error: error
        })
    }
})

router.get('/profile', VerifyToken, async (req, res) => {
    try {
        const {email} = req.user
        const [response] = await pool.execute("SELECT * FROM `users` WHERE `email` = ?",[email])
        if(response.length == 1){
            const user = response[0]
            return res.status(200).json({
                user:user,
                token:req.token
            })
        }else{
            return res.status(404).json({
                message:'กรุณาเข้าสู่ระบบใหม่',
                profile:false
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'เกิดข้อผิดพลาดบางอย่างจากเซิฟเวอร์',
            error: error
        })
    }
})

module.exports = router
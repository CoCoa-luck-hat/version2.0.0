const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const { VerifyToken } = require('../Middleware/VerifyToken')
const { pool } = require('../Database/connectMysql')

const storage = multer.diskStorage({
    destination: "../Font-End/public/upload",
    filename: (req, file, cd) => {
        cd(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage })

const allowOnlyUser = (req, res, next) => {
    if (req.user?.role !== 'User') {
        return res.status(403).json({
            message: 'ใช้ได้เฉพาะ User',
        })
    }
    next()
}

router.post('/upload-report', VerifyToken, allowOnlyUser, upload.single("photo"), async (req, res) => {
    try {
        const { date, title, message, temperature, humidity } = req.body
        const id = req.user.id
        const photo = req.file.filename
        const response = await pool.execute("INSERT INTO `reports` (`id`, `title`, `photo`, `message`, `temperature`, `humidity`, `date`, `id_user`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)", [title, photo, message, temperature, humidity, date, id])
        res.status(200).json({
            message: 'เพิ่ม Report สำเร็จ'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'เกิดดข้อผิดพลาดบางอย่าง',
            error: error
        })
    }
})

router.get('/loadReportOnDashboard', VerifyToken, async (req, res) => {
    try {
        const id_user = req.user.id
        const [respones] = await pool.execute("SELECT * FROM `reports` WHERE `id_user` = ? ORDER BY `reports`.`id` DESC LIMIT 3", [id_user])

        res.status(200).json({
            row: respones
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'เกิดดข้อผิดพลาดบางอย่าง',
            error: error
        })
    }
})


router.get('/loadReportAll', VerifyToken, async (req, res) => {
    try {
        const id_user = req.user.id
        const [respones] = await pool.execute("SELECT * FROM `reports` WHERE `id_user` = ? ORDER BY `reports`.`id` DESC", [id_user])

        res.status(200).json({
            row: respones
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'เกิดดข้อผิดพลาดบางอย่าง',
            error: error
        })
    }
})

router.post('/updateReport', VerifyToken, allowOnlyUser, upload.single("photo"), async (req, res) => {
    try {
        const { title, message, oldphoto, id } = req.body
        console.log('HEREEEEEEE', req.file);

        const photo = req.file ? req.file.filename : oldphoto
        const [response] = await pool.execute("UPDATE `reports` SET `title` = ?, `photo` = ?, `message` = ? WHERE `reports`.`id` = ?", [title, photo, message, id])

        res.status(200).json({
            message: 'แก้ไขสำเร็จ'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'เกิดดข้อผิดพลาดบางอย่าง',
            error: error
        })
    }
})

router.delete('/deleteReport', VerifyToken, allowOnlyUser, async (req, res) => {
    try {
        const { id } = req.body
        const reponse = await pool.execute("DELETE FROM reports WHERE `reports`.`id` = ?", [id])
        res.status(200).json({
            message: 'ลบสำเร็จ'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'เกิดดข้อผิดพลาดบางอย่าง',
            error: error
        })
    }
})

module.exports = router
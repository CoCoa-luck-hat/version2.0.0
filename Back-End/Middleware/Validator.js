const { checkSchema } = require("express-validator")

const RegisterValidator = checkSchema({
    username:{
        in:["body"],
        isLength:{options:{min:3}},
        errorMessage:'กรุณากรอกชื่อ 3 ตัวอักษรขึ้นไป'
    },
    email:{
        in:["body"],
        isEmail:true,
        normalizeEmail:true,
        errorMessage:'กรุณากรอกอีเมลให้ถูกต้อง'
    },
    password:{
        in:["body"],
        isLength:{options:{min:8}},
        errorMessage:'กรุณากรอกรหัสผ่าน 8 ตัวอักษรขึ้นไป'
    }
})

const LoginValidator = checkSchema({
    email:{
        in:["body"],
        isEmail:true,
        normalizeEmail:true,
        errorMessage:'กรุณากรอกอีเมลให้ถูกต้อง'
    },
    password:{
        in:["body"],
        isLength:{options:{min:8}},
        errorMessage:'กรุณากรอกรหัสผ่าน 8 ตัวอักษรขึ้นไป'
    }
})

module.exports = {RegisterValidator,LoginValidator}
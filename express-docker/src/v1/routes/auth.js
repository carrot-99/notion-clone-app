const router = require("express").Router();
const { body, validationResult } = require("express-validator");

require("dotenv").config();

const User = require("../models/user");
const validation =require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

// APIはルーティングが必要があるため、routesに入れて管理する

// ユーザ新規登録API
// asyncはawait使うのに必要、awaitは非同期処理、バリデーションチェックはここ
router.post(
    "/register", 
    body("username")
        .isLength({ min: 8 })
        .withMessage("ユーザ名は8文字以上である必要があります"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("パスワードは8文字以上である必要があります"),
    body("confirmPassword")
        .isLength({ min: 8 })
        .withMessage("確認用パスワードは8文字以上である必要があります"),
    body("username").custom((value) => {
        // usernameがvalueと等しい時、userに格納
        return User.findOne({username: value}).then((user) => {
            if(user) {
                return Promise.reject("このユーザーは既に使われています");
            }
        })
    }),
    // validationでrequireしたファイルのvalidate関数を呼び出し
    validation.validate,
    userController.register
    );

// ユーザーログイン用API
router.post(
    "/login", 
    body("username")
        .isLength({min: 8})
        .withMessage("ユーザ名は8文字以上である必要があります"), 
    body("password")
        .isLength({min: 8})
        .withMessage("パスワードは8文字以上である必要があります"),
    validation.validate,
    userController.login

);

// JWT認証API
// ミドルウェアが通ったら認証OK
router.post("/verify-token", tokenHandler.verifyToken, (req, res) => {
    return res.status(200).json({ user: req.user });
})

module.exports = router;
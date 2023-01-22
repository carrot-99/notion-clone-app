// github
const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");

// ユーザー新規登録用API
exports.register = async(req, res) => {
    // パスワードの受け取り
    const password = req.body.password; 

    try {
        // パスワード暗号化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        // ユーザーの新規登録
        const user = await User.create(req.body);
        // JWTの発行、DB上のidを元にJWTを発行
        const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h", // 24h有効
        });
        // ユーザ情報とトークンを返す
        return res.status(200).json({user, token});
    } catch(err){
        return res.status(500).json(err);
    } // 正常に動作していない時（パスワードが打ち込まれてないとか）
};

// ユーザーログイン用API
exports.login = async(req, res) => {
    const { username, password } = req.body; 

    try {
        // DBからユーザーが存在するか探してくる
        const user = await User.findOne({username: username});
        if(!user) {
            return res.status(401).json({
                errors: [{
                    param: "username",
                    msg: "ユーザー名が無効です"
                }]
            })
        }

        // パスワードが正しいか照合
        // toStringがないと文字列として認識されない
        const decryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        if(decryptedPassword !== password){
            return res.status(401).json({
                errors: [{
                    param: "password",
                    msg: "パスワードが無効です"
                }]
            })
        }

        // JWTを発行
        const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h", // 24h有効
        });

        return res.status(201).json({user, token});

    } catch (err) {
        return res.status(500).json(err);
    }
}
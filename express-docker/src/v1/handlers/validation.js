const { validationResult } = require("express-validator");

// vバリデーションチェックの部分
// exportsしているため、module.exportしなくて良い
exports.validate = (req, res, next) => {
    // validationResultをインポート
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    // 次の処理に進む。ミドルウェアを入れる時に利用。今回だと上でエラー出てたらここは通らない。つまり下も実行されない。
    next();
};
const router = require("express").Router();
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

// メモを作成
router.post("/", tokenHandler.verifyToken, memoController.create);
// ログイン中のユーザメモ全取得
router.get("/", tokenHandler.verifyToken, memoController.getAll);
// ログイン中のユーザメモを１つ取得
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);
// ログイン中のユーザメモを１つ更新
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);
// ログイン中のユーザメモを１つ削除
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;
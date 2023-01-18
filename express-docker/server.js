// const express = require("express");
// const app = express();
// PORT = 5050;

// app.get("/", (req, res) => {
//     res.send("Hello Yuu's Server");
// });

// app.listen(PORT, () => {
//     console.log("ローカルサーバー起動中")
// });

const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 5050; // Win => 5000
require("dotenv").config();
// jsonオブジェクトとして扱うための文
app.use(express.json());
// routesのAPIを呼び出すためには/api/v1のエンドポイントを付けるように、という意味。
// localhost:5050/api/v1/register
app.use("/api/v1", require("./src/v1/routes/auth"));

// serverディレクトリ内で npm start でサーバ再起動


try {
    // <password> -> FKgbXft9u12eIUdw   CSAK2vMKP4wBrple
    mongoose.connect(process.env.MONGODB_URL);
    console.log("DBと接続中・・・");
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log("ローカルサーバー起動中・・・");
});
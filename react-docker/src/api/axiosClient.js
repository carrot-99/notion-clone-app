import axios from "axios";

const BASE_URL = "http://localhost:5050/api/v1"
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async(config) => {
    return {
        // スプレッド構文。これでhedersを挿入。
        ...config,
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getToken()}`, // リクエストヘッダにJWTを付けてサーバに渡す
        },
    };
});

axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    }, 
    (err) => {
        throw err.response;
    }
);

export default axiosClient;
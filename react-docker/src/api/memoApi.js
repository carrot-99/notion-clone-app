import axiosClient from "./axiosClient";

const memoApi = {
    create: () => axiosClient.post("memo"),
    getAll: () => axiosClient.get("memo"),
    getOne: (id) => axiosClient.get(`memo/${id}`),
    // 更新対象（titleとか）を指定するためにparamsが必要
    update: (id, params) => axiosClient.put(`memo/${id}`, params),
    delete: (id) => axiosClient.delete(`memo/${id}`),
};

export default memoApi;
import axios from "axios"
import Message from "element-plus/lib/components/message"

const service = axios.create({
    baseURL: "http://localhost:3333",
    timeout: 5000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.error("req service get error");
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        // let status = response.status
        Message({
            message: res.message || "请求成功",
            type: "success",
            duration: 1000
        })
        return res
    },
    error => {
        console.log(error)
        console.error("res service get error");
        return Promise.reject(error)
    }
)

export default service
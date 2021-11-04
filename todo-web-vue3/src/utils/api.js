import request from "./request"


function GetTodoList(status, page) {
    return request({
        url: `/list/${status}/${page}`,
        method: "get"
    })
}
function CreateTodo(data) {
    return request({
        url: `/create`,
        method: "post",
        data
    })
}
function UpdateTodo(data) {
    return request({
        url: `/update`,
        method: "post",
        data
    })
}
function UpdateStatus(data) {
    return request({
        url: `/update_status`,
        method: "post",
        data
    })
}
function DeleteTodo(id) {
    return request({
        url: `/delete/${id}`,
        method: "delete",
    })
}
const todolist = {
    GetTodoList,
    CreateTodo,
    UpdateTodo,
    UpdateStatus,
    DeleteTodo
}

export default todolist
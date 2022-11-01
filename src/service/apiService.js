import axios from "../setup/axios"


const createUser = (data) => {
    return axios.post('/api/v1/register', data)
}
const LoginUser = (data) => {
    return axios.post('/api/v1/login', data)
}
const DeleteUser = (data) => {
    return axios.delete(`/api/v1/admin/delete-user`, { data: { ...data } });
}
const UpdateUser = (data) => {
    return axios.put(`/api/v1/admin/update-user`, data);
}
// class
const createClass = (data) => {
    return axios.post('/api/v1/user/create-class', data)
}
const logoutUser = () => {
    return axios.post('/api/v1/logout')
}
const getListClass = () => {
    return axios.get(`/api/v1/listClass`)
}
const UserJoinClass = (data) => {
    return axios.post('/api/v1/user/join-class', data);
}
const getListCurrentUser = (classId) => {
    return axios.get(`/api/v1/listCurrentUser?classId=${classId}`)
}
const DeleteStudent = (data) => {
    return axios.delete(`/api/v1/teacher/delete-student`, { data: data });
}

export {
    DeleteStudent,
    getListCurrentUser,
    getListClass,
    createUser,
    LoginUser,
    DeleteUser,
    UpdateUser,
    createClass,
    logoutUser,
    UserJoinClass
}
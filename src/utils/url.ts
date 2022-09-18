// const URL = "http://localhost:4000/api/070699"
const URL = 'https://gentlevn.com/api/070699';


export const ADMIN_LOGIN = `${URL}/admin/login`
export const CREATE_TOPIC = `${URL}/admin/topic/create`
export const EDIT_TOPIC = `${URL}/admin/topic/edit`
export const CREATE_VIDEO = `${URL}/admin/video/create`
export const ADMIN_GET_ALL_VIDEO = `${URL}/admin/video/get/all`
export const EDIT_VIDEO = `${URL}/admin/video/edit`
export const DELETE_VIDEO = `${URL}/admin/video/delete`
export const CREATE_SUGGEST = `${URL}/suggest/create`
export const GET_ALL_SUGGEST = `${URL}/admin/suggest/get/all`
export const DELETE_SUGGEST = `${URL}/admin/suggest/delete`



export const GET_ALL_VIDEO = `${URL}/video/get/all`
export const DOWNLOAD_VIDEO = `${URL}/video/download`
export const GET_ALL_TOPIC = `${URL}/topic/get/all`
export const GET_VIDEO = (videoId:string) : string =>{
    return `${URL}/video/get/${videoId}`
}

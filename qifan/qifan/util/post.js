
let Axios = axios.create()
// 请求拦截
Axios.interceptors.request.use(
    (config) => {
        // let token = window.localStorage.getItem("token")
        // if (token) {
        //     //将token放到请求头发送给服务器,将tokenkey放在请求头中
        //     config.headers['token'] = token;
        //     return config;
        // }
        config.headers['Content-Type'] = "application/x-www-form-urlencoded";
        // token认证写在这里
        return config;
    },
    (err) => {
        Promise.reject(err);
    }
);
// 响应拦截
Axios.interceptors.response.use(
    (config) => {
        return config;
    },
    (err) => {
        Promise.reject(err);
    }
);
// get封装
function axiosGet(url, params = {}, islocalhost) {

    params.token = QiFan.getToken()
    return new Promise((resolve, reject) => {
        Axios({
            url: islocalhost ? url : getDefaultUrl(url),
            params,
            method: "get",
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
// post封装
function axiosPost(url, data = {}) {
    let datas = new URLSearchParams()
    for (const key in data) {
        datas.append(key, data[key])
    }
    datas.append("token", QiFan.getToken())
    return new Promise((resolve, reject) => {
        Axios({
            url: getDefaultUrl(url),
            method: "post",
            data: datas,
        })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
// 判断是否自定义了host
function getDefaultUrl(url) {
    return url.indexOf("http://") == -1 ? config.defaultHostUrl + url : url
}
// // delete封装
// function del(url, params = {}, data = {}) {
//     return new Promise((resolve, reject) => {
//         Axios({
//             url,
//             method: "delete",
//             params,
//             data,
//         })
//             .then((res) => {
//                 resolve(res);
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// }
// //   Blob封装,resopnseType:Blob一般是用于文件下载
// function getBlob(url, params = {}) {
//     return new Promise((resolve, reject) => {
//         Axios({
//             url,
//             method: "get",
//             params,
//             responseType: 'blob'
//         })
//             .then((res) => {
//                 resolve(res);
//             })
//             .catch((err) => {
//                 reject(err);
//             });
//     });
// }
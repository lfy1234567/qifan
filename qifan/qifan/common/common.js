// --------------------------公共js------------------------------------
document.write('<script type="text/javascript" src="/lib/axios/axios.min.js"></script>')
document.write('<script type="text/javascript" src="/util/post.js"></script>')
document.write('<script type="text/javascript" src="/util/qifan-util.js"></script>')
document.write('<script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>')
document.write('<script type="text/javascript" src="/common/md5.js"></script>')
document.write('<script type="text/javascript" src="/lib/layui/layui.js"></script>')
document.write('<script type="text/javascript" src="/config/config.js"></script>')
document.write('<script type="text/javascript" src="/lib/vue/vue.js"></script>')
// --------------------------公共css------------------------------------
document.write('<link rel="stylesheet" href="/css/xadmin.css">')
document.write('<link rel="stylesheet" href="/css/font.css">')
document.write('<link rel="stylesheet" href="/css/qifan.css">')

//验证token
window.onload = function () {window.QiFan.CheckToken()}
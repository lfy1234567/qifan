var QiFan = {
  LoginUrlPc: '/Login.html',
  HomeUrlPc: '/Home.html',
  Url: '',
  $: null,

  setCookie: function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie: function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  },
  /**
   * 获取指定的URL参数值
   * @param {String} paramName 
   */
  getParameter: function (paramName) {
    var paramValue = "",
      isFound = !1;
    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
      var arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"),
        i = 0;
      while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
  },
  /**
   * 获取所有的URL参数值
   * @param {String} paramName 
   */
  getParameterNames: function () {
    var param = QiFan.getParameter("param");
    return JSON.parse(decodeURI(decodeURI(param)))
  },
  /**
   * 获取登陆Token
   */
  getToken: function () {
    var token = "";
    if (localStorage["token"] != undefined) {
      token = localStorage["token"];
    }
    return token;
  },
  setToken: function (token) {
    localStorage["token"] = token;
  },
  clearToken: function () {
    localStorage.removeItem("token");
  },
  CheckToken: function () {
    // 为空时回登录页 
    if (((this.getToken() == null || this.getToken() == "" || this.getToken() == undefined) && window.location.href.toLowerCase().indexOf("login") == -1) || (!localStorage["userinfo"]  && window.location.href.toLowerCase().indexOf("login") == -1)) {
      // 跳转登录页面
      top.location.replace(this.LoginUrlPc);
      return false;
    }
  },
  onLoading: function (type) {
    top.layer.load(type | 1);
  },
  offLoading: function () {
    top.layer.closeAll('loading');
  },
  initLayui: function () {
    layui.use(['laydate', 'form', 'layer', 'element', 'jquery'], function () {
      form = layui.form;
      layer = layui.layer;
      element = layui.element;
      $ = layui.jquery;
      // layer.msg('玩命卖萌中', function(){
      //   //关闭后的操作
      //   });
      //监听提交
      // form.on('submit(login)', function (data) {
      //   // alert(888)
      //   layer.msg(JSON.stringify(data.field), function () {
      //     location.replace('/index.html');
      //   });
      //   return false;
      // });
    });
  },
  OP: function (title, url, w, h, param, full) {
    if (title == null || title == '') {
      var title = false;
    };
    if (url == null || url == '') {
      var url = "error.html";
    };
    if (w == null || w == '') {
      var w = ($(window).width() * 0.9);
    };
    if (h == null || h == '') {
      var h = ($(window).height() - 50);
    };
    if (param) {
      param = encodeURI(encodeURI(JSON.stringify(param)))
    }
    top.layer.open({
      type: 2,
      area: [w + 'px', h + 'px'],
      fix: false, //不固定
      maxmin: true,
      shadeClose: true,
      shade: 0.4,
      title: title,
      content: url + '?param=' + param + "&frameCode=" + $(window.frameElement).attr("tab-id"),
    });
    if (full) {
      layer.full(index);
    }
  },
  CL: function () {
    top.layer.close(top.layer.getFrameIndex(window.name))
  },
  RF: function (param) {
    if (param == "init") {
      $(top.document).find("[tab-id=" + QiFan.getParameter("frameCode") + "]")[0].contentWindow.vm.init();
    }
    if (param == "reload" || !param) {
      $(top.document).find("[tab-id=" + QiFan.getParameter("frameCode") + "]")[0].contentWindow.location.reload();
    }
  },
  formatTime: function (curTime, type) {
    if (!curTime) {
      return ''
    }
    var nd = new Date(curTime)
    var y = nd.getFullYear()
    var mm = nd.getMonth() + 1
    var d = nd.getDate()
    var h = nd.getHours()
    var m = nd.getMinutes()
    if (mm < 10) {
      mm = '0' + mm
    }
    if (d < 10) {
      d = '0' + d
    }
    if (h < 10) {
      h = '0' + h
    }
    if (m < 10) {
      m = '0' + m
    }
    if (type == 'MM-DD') {
      return mm + '-' + d
    } else if (type == 'yyyy-MM-dd') {
      return y + '-' + mm + '-' + d
    } else if (type == 'week') {
      return y + '年' + mm + '月' + d + '日　' + weekDay[nd.getDay()]
    } else if (type == 'MM-DD&week') {
      return mm + '-' + d + '　' + weekDay[nd.getDay()]
    } else if (type == 'MM-DD&hh:mm') {
      return mm + '-' + d + ' ' + h + ':' + m
    } else if (type == '年月日') {
      return y + '年' + mm + '月' + d + '日　'
    }
    return y + '-' + mm + '-' + d + ' ' + h + ':' + m
  }
}

window.QiFan = QiFan;
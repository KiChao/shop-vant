//获取cookie、
export function getCookie(name) {
    var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return arr[2];
    else return null;
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie(name, value, hours) {
    var exp = new Date();
    exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
    document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//删除cookie
export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
//获取浏览器商的参数
export function GetQueryString(key) {
    // 获取参数
    var url = window.location.search
    // 正则筛选地址栏
    var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    // 匹配目标参数
    var result = url.substr(1).match(reg)
    // 返回参数值
    return result ? decodeURIComponent(result[2]) : null
}

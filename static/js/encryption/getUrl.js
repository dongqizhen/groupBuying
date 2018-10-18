var g_debugmode = 0; //0=online web    1=local app web
var g_server = 0; //0=测试环境请求地址 1=正式环境请求地址

/*var g_encrypt=0;  //0=接口不加密 1=接口加密*/

/**
 * @description open local native app page.
 * @param {any} url
 * @param {any} params string  params格式：id=" + questionTypeId + "&type=" + questionType+"     不用这种格式：{"自定义参数":"自定义值","自定义参数2":"自定义值2"}
 * @param {boolean} needCloseThisWindow
 */
function openNativePage(url, params, needCloseThisWindow) {
    if (g_debugmode == 0) {} else {
        // inside app.
        var fullUrl = "kaction://openPage?actionName=" + url;
        if (needCloseThisWindow != null && needCloseThisWindow == true) {
            fullUrl += "&closeThis=true";
        }
        if (params != null) {
            fullUrl += "&" + params;
        }
        window.location.href = fullUrl;
    }
}

/**
 * 打开登录页面
 */
function openLoginPage(needCloseThisWindow) {
    var fullUrl = "kaction://openPage?actionName=loginPage";
    if (needCloseThisWindow != null && needCloseThisWindow == true) {
        fullUrl += "&closeThis=true";
    }
    window.location.href = fullUrl;
}


/**
 * @description 打开第三方外链连接
 * @param {String} url 外链地址
 * @param {String} param 传入的参数
 */
function openThirdPage(url, param) {
    var fullUrl = "";
    //由于与原生交互影响url的切割，用"$-$"代替"?",用"*-*"代替"&";
    if (param) {
        if (param.indexOf("&") != -1) {
            param = param.replace('&', '*-*');
        }
        fullUrl = "kaction://openPage?actionName=webPage&url=" + url + "$-$" + param;
    } else {
        fullUrl = "kaction://openPage?actionName=webPage&url=" + url;
    }
    console.log(fullUrl);
    window.location.href = fullUrl;
}

/**
 * 返回上一步
 * @param {any} funName 安卓手机，返回上一个页面需要刷新页面的数据部分，出入对应的函数
 */
function goBackPage(funName) {
    if (g_debugmode == 0) {
        // go to back web page
        history.back();
    } else {
        // go to back local page.
        //关闭当前界面(需要urlEncode转码)
        if (funName) {
            window.location.href = "kaction://closeThis?functionName=" + funName;
        } else {
            window.location.href = "kaction://closeThis";
        }
    }
}
//wei ke tang TinyClassRoomActivity
function goBackPageAndReload() {
    if (g_debugmode == 0) {
        // go to back web page
        history.back();
    } else {
        // go to back local page.
        //关闭当前界面(需要urlEncode转码)
        window.location.href = "kaction://closeThisAndReload";
    }
}

//maintenance goBackPageAndReload
function mainGoBackPageAndReload() {
    if (g_debugmode == 0) {
        // go to back web page
        history.back();
    } else {
        // go to back local page.
        //关闭当前界面(需要urlEncode转码)
        window.location.href = "kaction://closeMainAndReload";
    }
}

function goHistoryBack() {
    history.back();
}

/**
 * open remote web page or local web page inside app.
 * @param url string
 * @param params string  params格式：id=" + questionTypeId + "&type=" + questionType+"     不用这种格式：{"自定义参数":"自定义值","自定义参数2":"自定义值2"}
 */
function openWebPage(url) {
    openWebPage(url, null, null, false);
}

function openWebPage(url, params) {
    openWebPage(url, params, null, false);
}

function openWebPage(url, params, fileName) {
    openWebPage(url, params, fileName, false);
}
/**
 * open remote web page or local web page inside app.
 * @param {any} url
 * @param {any} params               地址中参数
 * @param {any} fileName             文件夹名字
 * @param {any} needCloseThisWindow  跳转后页面是否关闭
 * @param {any} functionName         当页面跳转后，又返回该页面时如果需要刷新数据，出入数据请求的函数
 * @param {any} isFunctionBackInvoke 是否拦截安卓的返回按钮
 * @param {any} pageid 页面的ID，可以根据ID来实现其他功能
 */
function openWebPage(url, params, fileName, needCloseThisWindow, functionName, isFunctionBackInvoke, pageid) {
    var fullUrl = null;
    if (g_debugmode == 0) {
        // connect directly to remote web page.
        fullUrl = url;
        if (params != null) {
            fullUrl += "?" + params;
        }
        window.location.href = fullUrl;
    } else {
        // open web page inside app.
        if (fileName != null) {
            fullUrl = "kaction://openLocalWeb?fileName=" + fileName + "/" + url;
        } else {
            fullUrl = "kaction://openLocalWeb?fileName=" + url;
        }
        if (needCloseThisWindow != null && needCloseThisWindow == true) {
            fullUrl += "&closeThis=true";
        }
        if (functionName) {
            fullUrl += "&functionName=" + functionName;
        }
        if (params != null) {
            fullUrl += "&" + params;
        }
        if (isFunctionBackInvoke != null) {
            fullUrl += "&" + "isFunctionBackInvoke=" + isFunctionBackInvoke
        }
        if (pageid != null) {
            fullUrl += "&" + "pageid=" + pageid
        }
        window.location.href = fullUrl;
    }
}

/**
 * @description  打赏功能
 * @param {"6微课堂/7广场/5维修宝"} type 模块类型
 * @param {any} id
 * @param {any} moduleActionCode 模块标识：维修宝打赏 REPAIRWARD /维修宝评论打赏 MCOMMENTREWARD
 */
function moreOpetation(type, id, moduleActionCode) {
    if (g_debugmode == 0) {
        // alert in web page
        alert("can not reward " + "kaction://moreOpetationReward?type=" + type + "&id=" + id + "&moduleActionCode=" + moduleActionCode)
    } else {
        window.location.href = "kaction://moreOpetationReward?type=" + type + "&id=" + id + "&moduleActionCode=" + moduleActionCode;
    }
}

/**
 * @description 分享
 * @param {any} type 模块类型
 * @param {any} id 文章id
 * @param {any} title 分享标题
 * @param {any} content 分享显示内容
 * @param {any} imgurl 分享显示图片
 * @param {any} linkurl 分享跳转链接
 * @param {any} success 分享到医疗圈成功后成功的回调函数名
 */
function shareFunction(type, id, title, content, imgurl, linkurl, successfun) {
    var success = "";
    if (successfun != null) {
        success = successfun;
    }
    var content = content || "欢迎点击链接，查看文章详情。“好医工”APP_属于医工自己的全能助手";
    if (g_debugmode == 0) {
        // alert in web page
        alert("can not share " + title);
    } else {
        window.location.href = "kaction://moreOpetationShare?type=" + type + "&id=" + id + "&title=" + title + "&content=" + content + "&imgurl=" + imgurl + "&successfunname=" + success + "&url=" + linkurl;
    }
}

/**
 * 显示dialog框
 * @param {*} title 显示标题
 * @param {*} content 显示内容
 */
function showDialog(title, content) {
    if (g_debugmode == 0) {
        // alert in web page
        alert(title + "\n" + content);
    } else {
        // go to back local page.
        window.location.href = "kaction://showDialog?title=" + title + "&content=" + content;
    }
}

//弹出确认提示框
function showConfirmDialog(title, content, confirmFunctionName) {
    if (g_debugmode == 0) {
        var r = confirm(content);
        if (r == true) {
            window.location.href = "javascript:" + confirmFunctionName + "();";
        }
    } else {
        window.location.href = "kaction://showConfirmDialog?title=" + title + "&content=" + content + "&confirmFunctionName=" + confirmFunctionName;
    }
}

//只提示文字的提示框
function stringShowDialog(content) {
    if (g_debugmode == 0) {
        // alert in web page
        alert(content);
    } else {
        // go to back local page.
        window.location.href = "kaction://stringShowDialog?content=" + content;
    }
}

function downloadPdfFile(downloadUrl, fileName, type, id) {
    if (g_debugmode == 0) {
        // alert in web page
        alert("can not download " + downloadUrl);
    } else {
        downloadPdfFile(downloadUrl, fileName, type, id, null, null, null, null, null, null);
    }
}

//下载阅读PDF
//downloadUrl 下载地址 (需要urlEncode转码)
//fileName 文件名称
//type 分类(按模块自定义)(模块拼音全拼)
//id 模块下项的id
//collectStatus 收藏状态 0=未收藏 1=已收藏	(无此功能，可不传)
//praiseStatus 点赞状态 0=未点赞 1=已点赞	(无此功能，可不传)
//shareTitle 分享标题  (无分享功能，可不传)
//shareContent 分享内容	(无分享功能，可不传)
//shareImgUrl 分享图片	(无分享功能，可不传)
//shareUrl 分享的URL	(无分享功能，可不传)
function downloadPdfFile(downloadUrl, fileName, type, id, collectStatus, praiseStatus, shareTitle, shareContent, shareImgUrl, shareUrl) {
    if (g_debugmode == 0) {
        // alert in web page
        alert("downloadPdfFile downloadUrl:" + downloadUrl + '  fileName:' + fileName + ' type:' + type + ' id:' + id);
    } else {
        var fullUrl = "kaction://readPdf?downloadUrl=" + downloadUrl;
        if (fileName != null || type != null || id != null) {
            fullUrl += "&fileName=" + fileName + "&type=" + type + "&id=" + id;
        }
        if (collectStatus != null) {
            fullUrl += "&collectStatus=" + collectStatus;
        }
        if (praiseStatus != null) {
            fullUrl += "&praiseStatus=" + praiseStatus;
        }
        if (shareTitle != null) {
            fullUrl += "&shareTitle=" + shareTitle;
        }
        if (shareContent != null) {
            fullUrl += "&shareContent=" + shareContent;
        }
        if (shareImgUrl != null) {
            fullUrl += "&shareImgUrl=" + shareImgUrl;
        }
        if (shareUrl != null) {
            fullUrl += "&shareUrl=" + shareUrl;
        }

        window.location.href = fullUrl;
    }
}

//弹出更多操作按钮
//type 分类(按模块自定义)(模块拼音全拼)
//id 模块下项的id
//collectStatus 收藏状态 0=未收藏 1=已收藏	(无此功能，可不传)
//praiseStatus 点赞状态 0=未点赞 1=已点赞	(无此功能，可不传)
//shareTitle 分享标题  (无分享功能，可不传)
//shareContent 分享内容	(无分享功能，可不传)
//shareImgUrl 分享图片	(无分享功能，可不传)
//shareUrl 分享的URL	(无分享功能，可不传)
function showMoreBtn(type, id, collectStatus, praiseStatus, shareTitle, shareContent, shareImgUrl, shareUrl) {
    if (g_debugmode == 0) {
        // alert in web page
        alert("showMoreBtn type:" + type + ' id:' + id + ' collectStatus:' + collectStatus + ' praiseStatus:' + praiseStatus + " shareTitle:" + shareTitle + " shareContent:" + shareContent + " shareImgUrl:" + shareImgUrl + " shareUrl:" + shareUrl);
    } else {
        var fullUrl = "kaction://moreOperation?type=" + type;
        if (id != null) {
            fullUrl += "&id=" + id;
        }
        if (collectStatus != null) {
            fullUrl += "&collectStatus=" + collectStatus;
        }
        if (praiseStatus != null) {
            fullUrl += "&praiseStatus=" + praiseStatus;
        }
        if (shareTitle != null) {
            fullUrl += "&shareTitle=" + shareTitle;
        }
        if (shareContent != null) {
            fullUrl += "&shareContent=" + shareContent;
        }
        if (shareImgUrl != null) {
            fullUrl += "&shareImgUrl=" + shareImgUrl;
        }
        if (shareUrl != null) {
            fullUrl += "&shareUrl=" + shareUrl;
        }

        window.location.href = fullUrl;
    }
}

//拨打电话
function callPhone(mobile) {
    if (g_debugmode == 0) {
        // alert in web page
        alert(mobile);
    } else {
        // go to back local page.
        window.location.href = "kaction://callPhone?mobile=" + mobile;
    }
}

/*验证数字格式*/
function check_validate1(value) {
    //定义正则表达式部分
    var reg = /^\d+$/;
    if (value.constructor === String) {
        var re = value.match(reg);
        return true;
    }
    return false;
}

function check_validate1(value) {
    //定义正则表达式部分
    var reg = /^\d+(\.\d+)?$/;
    if (reg.test(value)) {
        //var re = value.match( reg );
        return true;
    }
    return false;
}

//选择联系人
//maxNumber 最多选择几个
//callBack 回调Function名称  参数Array
function selectContacts(maxNumber, callBack) {
    if (g_debugmode == 0) {
        window.location.href = "javascript:" + callBack + "(new Array('1'));";
    } else {
        window.location.href = "kaction://selectContacts?maxNumber=" + maxNumber + "&callBack=" + callBack;
    }
}


//支付
//orderNo 订单号
//orderPrice 订单金额 double类型 如1.00 = 1元
//productName 商品名称
//productContent 商品详情
//callBackSuccess 成功之后的回调function的名字 无参方法
//callBackFail 失败之后的回调function的名字 参数 failCode,failMsg
/**
 * add by wangmingxing,增加了一个参数 - attach，用于支付表示具体是哪个模块的支付。
 **/
function orderPay(orderNo, orderPrice, productName, attach, productContent, callBackSuccess, callBackFail) {
    if (g_debugmode == 0) {
        window.location.href = "javascript:" + callBackSuccess + "();";
    } else {
        var fullUrl = "kaction://orderPay?orderNo=" + orderNo + "&orderPrice=" + orderPrice;
        if (productName != null) {
            productName = encodeURI(encodeURI(productName))
            fullUrl += "&productName=" + productName;
        }
        if (attach != null) {
            fullUrl += "&attach=" + attach;
        }
        if (productContent != null) {
            fullUrl += "&productContent=" + productContent;
        }
        if (callBackSuccess != null) {
            fullUrl += "&callBackSuccess=" + callBackSuccess;
        }
        if (callBackFail != null) {
            fullUrl += "&callBackFail=" + callBackFail;
        }
        window.location.href = fullUrl;
    }
}


//邀请用户
function shareUser() {
    if (g_debugmode == 0) {
        alert("share app");
    } else {
        window.location.href = "kaction://shareApp?name=test";
    }
}

//发送自定义回调,带3个自定义参数
function sendCallFunction(functionName, param1, param2, param3) {
    if (g_debugmode == 0) {
        alert(functionName + " " + param1 + " " + param2 + " " + param3);
    } else {
        var fullUrl = "kaction://callFunction";
        if (functionName != null) {
            fullUrl += "?";
            fullUrl += "functionName=" + functionName;
        }
        if (param1 != null) {
            fullUrl += "&param1=" + param1;
        }
        if (param2 != null) {
            fullUrl += "&param2=" + param2;
        }
        if (param3 != null) {
            fullUrl += "&param3=" + param3;
        }
        //alert("fullUrl:"+fullUrl);
        window.location.href = fullUrl;
    }
}



/**
 * @_ajax
 * ? ajax  请求封装函数
 * @param {"请求类型"} type 默认：'post'
 * @param {"请求地址"} url
 * @param {"请求数据"} data
 * @param {"是否异步"} async 默认：true
 * @param {"成功回调函数"} success
 * @param {"失败回调函数"} error
 */

function _ajax(type, url, data, async, success, error) { //ajax請求
    $.ajax({
        type: type ? type : 'post',
        url: url,
        async: async ? async : true,
        data: toData(data),
        success: function(_data) {
            // console.log(_data)
            if (_data.result.admin_pay || (_data.result[0] ? _data.result[0].admin_pay : false)) {

                var admin_pay = _data.result.admin_pay || _data.result[0].admin_pay;

                window.location.href = "kaction://goldCoinAnimation?goldCoinNum=" + admin_pay;
                setTimeout(function() {
                    success(_data);
                }, 1200)
            } else {
                success(_data);
            }



        },
        error: function(xhr, type) {

            error ? error(xhr, type) : null
        }
    });
}

//支付
//orderNo 订单号
//orderPrice 订单金额 double类型 如1.00 = 1元
//productName 商品名称
//productContent 商品详情
//callBackSuccess 成功之后的回调function的名字 无参方法
//callBackFail 失败之后的回调function的名字 参数 failCode,failMsg
/**
 * add by wangmingxing,增加了一个参数 - attach，用于支付表示具体是哪个模块的支付。
 **/
function orderPay(orderNo, orderPrice, productName, attach, productContent, callBackSuccess, callBackFail) {
    if (g_debugmode == 0) {
        window.location.href = "javascript:" + callBackSuccess + "();";
    } else {
        var fullUrl = "kaction://orderPay?orderNo=" + orderNo + "&orderPrice=" + orderPrice;
        if (productName != null) {
            fullUrl += "&productName=" + productName;
        }
        if (attach != null) {
            fullUrl += "&attach=" + attach;
        }
        if (productContent != null) {
            fullUrl += "&productContent=" + productContent;
        }
        if (callBackSuccess != null) {
            fullUrl += "&callBackSuccess=" + callBackSuccess;
        }
        if (callBackFail != null) {
            fullUrl += "&callBackFail=" + callBackFail;
        }
        window.location.href = fullUrl;
    }
}


//邀请用户
// function shareUser() {
//     if (g_debugmode == 0) {
//         alert("share app");
//     } else {
//         window.location.href = "kaction://shareApp?name=test";
//     }
// }

//发送自定义回调,带3个自定义参数
function sendCallFunction(functionName, param1, param2, param3) {
    if (g_debugmode == 0) {
        alert(functionName + " " + param1 + " " + param2 + " " + param3);
    } else {
        var fullUrl = "kaction://callFunction";
        if (functionName != null) {
            fullUrl += "?";
            fullUrl += "functionName=" + functionName;
        }
        if (param1 != null) {
            fullUrl += "&param1=" + param1;
        }
        if (param2 != null) {
            fullUrl += "&param2=" + param2;
        }
        if (param3 != null) {
            fullUrl += "&param3=" + param3;
        }
        //alert("fullUrl:"+fullUrl);
        window.location.href = fullUrl;
    }
}


//发送自定义回调,不带参数
//function sendCallFunction(functionName){
//	sendCallFunction(functionName,null,null,null);
//}



//数据加密
//data 需要加密的文本
//callBack 回调Function名称  参数String
/*function encryptData(data,callBack){
    if (g_encrypt == 0){
        window.location.href="javascript:"+callBack+"("+data+");";
    }else{
        window.location.href="kaction://encryptData?data="+data+"&callBack="+callBack;
    }
}*/

function urlEncode(str) {
    var resultStr = encodeURI(str);
    resultStr = resultStr.replace(/\&/g, '@@');
    return resultStr;
}


////nijiayuan begin
function arrayToJson(o) {
    var r = [];
    if (typeof o == "string") return "\"" + o.replace(/([\'\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + "\"";
    if (typeof o == "object") {
        if (!o.sort) {
            for (var i in o)
                r.push('"' + i + '"' + ":" + arrayToJson(o[i]));
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)) {
                r.push("toString:" + o.toString.toString());
            }
            r = "{" + r.join() + "}";
        } else {
            for (var i = 0; i < o.length; i++) {
                r.push(arrayToJson(o[i]));
            }
            r = "[" + r.join() + "]";
        }
        return r;
    }
    return o.toString();
}

function writeObj(obj) {
    var description = "";
    for (var i in obj) {
        var property = obj[i];
        description += '"' + property + "':'" + property.toString();
    }
    alert(description);
}
//打印数组
function print_array(arr) {
    for (var key in arr) {
        if (typeof(arr[key]) == 'array' || typeof(arr[key]) == 'object') { //递归调用
            print_array(arr[key]);
        } else {
            document.write(key + ' = ' + arr[key] + '<br>');
        }
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.decodeURI(window.decodeURI(window.location.search.substr(1))).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

g_userid = getUrlParam('userid');

if (g_userid == null || g_userid == "null") {
    g_userid = window.sessionStorage.getItem("g_userid");
} else {
    window.sessionStorage.setItem("g_userid", g_userid);
}


g_token = getUrlParam('token');

if (g_token == null || g_token == "null") {
    g_token = window.sessionStorage.getItem("g_token");
} else {
    window.sessionStorage.setItem("g_token", g_token);
}

//"userid":"测试7544"'12207'10533 '10504'正式15301',
//"token":"web9275a051-d0ac-44e0-a8f0-d440def81d40"

// "userid":"12207",
// "token":"web9275a051-d0ac-44e0-a8f0-d440def81d40"
//获取用户的id
function commonMessage() {
    /* var url="http://115.47.45.51:8006";
     var urlBrand="http://115.47.45.51:8001";
     var urlMedical="http://115.47.45.51:8003";*/
    //  var urlGod="http://115.47.45.51:8016";
    if (g_server == 0) {
        // var url = "http://60.195.252.86:8084";
        // var urlBrand = "http://60.195.252.86:8080";
        // var urlMedical = "http://60.195.252.86:8083";
        // var medicalDetail = "http://60.195.252.86:8082";
        // var urlGod = "http://60.195.252.86:8081";
        // var urlBanner = "http://60.195.252.86:8099";
        // var urlQuestionnaire = "http://60.195.252.86:8018";

        // var url = "http://60.195.252.86:8080";
        var urlBrand = "http://60.195.252.86:8080";
        var urlMedical = "http://60.195.252.86:8080";
        var medicalDetail = "http://60.195.252.86:8080";
        var urlGod = "http://60.195.252.86:8080";
        // var urlBanner = "http://60.195.252.86:8080";
        // var urlQuestionnaire = "http://60.195.252.86:8080";

        // var url = "http://60.195.252.68:8084";
        // var urlBrand = "http://60.195.252.68:8080";
        // var urlMedical = "http://60.195.252.68:8083";
        // var medicalDetail = "http://60.195.252.68:8082";
        // var urlGod = "http://60.195.252.68:8081";
        // var urlBanner = "http://60.195.252.68:8068";
        // var urlQuestionnaire = "http://60.195.252.68:8018";
        // var urlOther = "http://60.195.252.68:8085";

        //验收环境，采用域名方式
        // var urlBrand = "http://webple.haoyigong.com";
        // var urlMedical = "http://prople.haoyigong.com";
        // var url = "http://dataple.haoyigong.com";
        // var medicalDetail = "http://infople.haoyigong.com";
        // var urlGod = "http://payple.haoyigong.com";
        // var urlBanner = "http://rgple.haoyigong.com";
        // var urlQuestionnaire = "http://diaowenple.haoyigong.com";

        // var other_Url = "http://otherple.haoyigong.com/server_other";
        // var file_Url = "http://fileple.haoyigong.com/server";
        // var video_Url = "http://videople.haoyigong.com/server"
    } else {
        var url = "http://data.haoyigong.com";
        var urlBrand = "http://web.haoyigong.com";
        var urlMedical = "http://pro.haoyigong.com";
        var medicalDetail = "http://info.haoyigong.com";
        var urlGod = "http://pay.haoyigong.com";
        var urlBanner = "http://rg.haoyigong.com";
        var urlQuestionnaire = "http://diaowen.haoyigong.com";
        //var urlQuestionnaire = "http://60.195.252.83:8018";

    }
    if (g_debugmode == 0) {
        return user = {
            "url": url,
            "urlBrand": urlBrand,
            "medicalDetail": medicalDetail,
            "urlMedical": urlMedical,
            "urlGod": urlGod,
            // "userid": "10533",
            "userid": "7544",
            "token": "web9275a051-d0ac-44e0-a8f0-d440def81d40",
            "urlBanner": urlBanner,
            "urlQuestionnaire": urlQuestionnaire
        };
    } else {
        return user = {
            "url": url,
            "urlBrand": urlBrand,
            "medicalDetail": medicalDetail,
            "urlMedical": urlMedical,
            "urlGod": urlGod,
            "userid": g_userid,
            "token": g_token,
            "urlBanner": urlBanner,
            "urlQuestionnaire": urlQuestionnaire
        };
    }

}

/*
function toData(json) {
    var data = JSON.stringify(json);
    if(g_encrypt==0){
        return "data=" + data;
    }else{
        var data2 = aesEncrypt(data);
        return "data=" + data2;
    }
}*/


/**
 * @description 判断是安卓/ios
 * @returns {"true/false"}
 */
function isAndroid() {
    var u = navigator.userAgent,
        flag = true;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    //解决fastClick与iscroll插件的冲突
    if (isAndroid) {
        return true;
    } else if (isiOS) {
        return false;
    }
}


/**
 * @param {回调函数} cb
 * @description 获取用户当前经纬度
 * @returns {"{erroe:String,data:{lat:String,lag:String}}"}
 */
function getPosition(funName) {
    if (g_debugmode == 0) {
        alert('getposition')
    } else {
        window.location.href = "kaction://getLocation?fun=" + funName;
    }

    // var obj = {
    //     erroe: "",
    //     lat: "",
    //     lag: ""
    // }

    // function showError(error) {
    //     switch (error.code) {
    //         case error.PERMISSION_DENIED:
    //             return obj['error'] = "定位失败,用户拒绝请求地理定位";
    //             cb(obj)
    //             break;
    //         case error.POSITION_UNAVAILABLE:
    //             return obj['error'] = "定位失败,位置信息是不可用";
    //             cb(obj)
    //             alert("定位失败,位置信息是不可用");
    //             break;
    //         case error.TIMEOUT:
    //             return obj['error'] = "定位失败,请求获取用户位置超时";
    //             cb(obj)
    //             alert("定位失败,请求获取用户位置超时");
    //             break;
    //         case error.UNKNOWN_ERROR:
    //             return obj['error'] = "定位失败,定位系统失效";
    //             cb(obj)
    //             alert("定位失败,定位系统失效");
    //             break;
    //     }
    // }

    // function showPosition(position) {
    //     var lat = position.coords.latitude; //纬度
    //     var lag = position.coords.longitude; //经度
    //     obj['error'] = "";
    //     obj['lat'] = lat;
    //     obj['lag'] = lag;
    //     cb(obj)
    // }

    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition, showError);
    // } else {
    //     obj['error'] = "不支持地理定位";
    //     cb(obj)
    // }
}

/**
 * 应付测试数据加密,生成随机字符串并解密,只适用于纯数字，比如id,index
 * 不要给字母加密,后果自负!
 * 加密:
 * @param {any} type true为解密 false为加密
 * @param {any} val type为true时:需要解密的数字 type为false时需要加密的数字
 * @param {any} min 最小位数
 * @param {any} max 最大位数
 * @param {any} charStr 随机字符串
 * @returns 返回字符串
 */
function encryptData(type, val, min, max, charStr) {
    var returnStr = "",
        range;
    if (typeof min == 'undefined') {
        min = 5;
    }
    if (typeof max == 'string') {
        charStr = max;
    }
    if (typeof val == 'undefined') {
        console.error('必须传入原始数据!')
        return;
    }
    if (type == true) {
        var res = val.replace(/[a-z]/ig, '')
        return res;
    }

    range = ((max && typeof max == 'number') ? Math.round(Math.random() * (max - min)) + min : min);
    charStr = charStr || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (charStr.length - 1));
        returnStr += charStr.substring(index, index + 1);
    }
    return val + returnStr;
}

/**
 * 判断是否是微信浏览器
 */
function is_weixn() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

// 返回页面传递参数，调用函数
var Router = function() {
        return this;
    }
    // 自由跳转到某个包含ID的页面
Router.prototype.topage = function(param) {
        var toid = param['toid'] == null ? null : param['toid'],
            closeid = param['closeid'] == null ? null : param['closeid'],
            data = param['data'] == null ? 'none' : param['data'],
            funname = param['funname'] == null ? 'none' : param['funname'],
            url = param['url'],
            closeIDStr = '';
        if (data !== 'none') {
            data = JSON.stringify(data)
        }
        if (!g_debugmode) {
            window.location.href = url;
        } else {
            for (var i = 0; i < closeid.length; i++) {
                var el = closeid[i];
                if (i < closeid.length - 1) {
                    closeIDStr += el + ','
                } else {
                    closeIDStr += el;
                }
            }
            var url = "kaction://tosomePage?"
            url += "toid=" + toid + "&"
            url += "closeid=" + closeIDStr + "&"
            url += "params=" + data + "&"
            url += "funname=" + funname;
            window.location.href = url;
        }
    }
    // 返回上一页，添加返回函数名，在上个页面调用的函数
Router.prototype.back = function(funname) {
        if (g_debugmode == 0) {
            history.back();
        } else {
            if (funName) {
                window.location.href = "kaction://closeThis?functionName=" + funName;
            } else {
                window.location.href = "kaction://closeThis";
            }
        }
    }
    // 打开新页面,调用方式和openwebpage一样
Router.prototype.open = function(params) {
    var isclose = params.file == null ? null : params.file,
        funname = params.funname == null ? null : params.funname,
        BackInvoke = params.BackInvoke == null ? null : params.BackInvoke,
        pageid = params.pageid == null ? null : params.pageid,
        urlparams = "";
    if (params.data == null) {
        params.data = null;
        urlparams = null;
    } else {
        for (var k in params.data) {
            if (params.data.hasOwnProperty(k)) {
                var el = params.data[k];
                urlparams += k + "=" + el + "&";
            }
        }
        urlparams = urlparams.substring(0, urlparams.length - 1)
    }
    openWebPage(params.url, urlparams, params.file, isclose, funname, BackInvoke, pageid)
}
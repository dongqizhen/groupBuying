function Util() {
    this.params = arguments
    this.commit = function(method) {
        if (!this[method]) console.error(method + ' is not a function')
        return this[method](arguments)
    }
}

Util.prototype = {
        constructor: Util
    }
    // 是否为email
Util.prototype.isemail = function(arg) {
        const str = arg[1]
        return new Promise(function(resolve, reject) {
            if (/^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(str)) {
                resolve(true)
            } else {
                reject(new Error(''))
            }
        })
    }
    // 是否为手机号
Util.prototype.isphone = function(arg) {
    const str = arg[1]
    return new Promise(function(resolve, reject) {
        if (/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/.test(str)) {
            resolve(true)
        } else {
            reject(new Error(''))
        }
    })
}
const g_encrypt = 1;

Util.prototype.toData = json => {
    let data = JSON.stringify(json);
    if (g_encrypt == 0) {
        return "data=" + data;
    } else {
        console.log(data);
        data = aesEncrypt(data);
        return "data=" + data;
    }
}

/**
 * @description 判断是安卓/ios
 * @returns {"true/false"} 
 */
Util.prototype.isAndroid = () => {
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

export default new Util()
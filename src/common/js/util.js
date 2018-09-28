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
    // return new Promise(function(resolve, reject) {
    if (/^1[3-9]\d{9}$/.test(arg)) {
        // resolve(true)
        return true;
    } else {
        // reject(new Error(''))
        return false;
    }
    // })
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



export default new Util()
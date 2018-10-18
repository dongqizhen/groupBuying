const chalk = require('chalk')

let alpha = {
    URL: "http://60.195.252.86:8080",
    // URL: "http://192.168.2.116:8080",
}
let beta = {
    URL: "https://www.api/code",
    BASE_URL: "https://www.api/code"
}
let gamma = {
    URL: "http://prople.haoyigong.com",
    WEB_URL: "http://webple.haoyigong.com"
}
let release = {
    URL: "http://pro.haoyigong.com",
    WEB_URL: "http://web.haoyigong.com"
}


module.exports = {
    // 开发
    alpha,
    // 测试
    beta,
    // 验收版本
    gamma,
    // 正式版本
    release
}
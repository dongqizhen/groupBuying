const chalk = require('chalk')

let alpha = {
    URL: "http://60.195.252.86:8080",
    // URL: "http://192.168.2.103:8080",
}
let beta = {
    URL: "https://www.api/code",
    BASE_URL: "https://www.api/code"
}
let gamma = {
    URL: "https://www.api/code",
    BASE_URL: "https://www.api/code"
}
let release = {
    URL: "https://www.api/code",
    BASE_URL: "https://www.api/code"
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
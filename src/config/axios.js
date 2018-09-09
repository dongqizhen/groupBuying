// config axios
import axios from 'axios'

let request = axios.create()

request.defaults.timeout = 5000 //请求超时时间
request.withCredentials = false // 是否携带cookie信息
request.responseType = `json`
request.defaults.transformRequest = [ //`transformRequest`选项允许我们在请求发送到服务器之前对请求的数据做出一些改动该选项只适用于以下请求方式：`put/post/patch`数组里面的最后一个函数必须返回一个字符串、-一个`ArrayBuffer`或者`Stream`
    (data) => toData(data)
]
request.defaults.baseURL = process.env.API_HOST.URL;

export default request
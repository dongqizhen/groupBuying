import axios from '@/config/axios.js'
// request demo
export const _getData = (url = '', data = {}, success, error) => axios.post(url, data).then(function(data) {
    success(data)
}).catch(function(err) {
    if (error) { error(err) } else {
        console.log(err)
    }
})
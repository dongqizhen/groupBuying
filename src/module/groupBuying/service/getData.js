import axios from '@/config/axios.js'
// request demo
export const _getData = (url = '', data = {}, success, error) => axios.post(url, {
    userid: 7544,
    token: "09a52ead-ef25-411d-8ac2-e3384fceed68",
    ...data
}).then(data => {

    if (data.data.status.code == 200) {
        success(data.data.result)
    } else {}

}).catch(err => {
    if (error) {
        error(err)
    } else {
        console.log(err)
    }
})
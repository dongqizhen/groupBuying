import axios from '@/config/axios.js'
// request demo
export async function _getData(url = '', data = {}, successCallBack, errorCallBack) {
    return await axios.post(url, {
        userid: 7544,
        token: "09a52ead-ef25-411d-8ac2-e3384fceed68",
        ...data
    }).then(data => {
        if (data.data.status.code == 200) {
            successCallBack(data.data.result)
        } else {
            console.log(data.data.status)
        }

    }).catch(err => {
        if (errorCallBack) {
            errorCallBack(err)
        } else {
            console.log(err)
        }
    })
}
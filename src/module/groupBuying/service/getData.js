import axios from '@/config/axios.js'
import { Toast } from 'vant'
// request demo
export async function _getData(url = '', data = {}, successCallBack, errorCallBack) {
    return await axios.post(url, {
        userid: 7544, //10533 //10493
        token: "09a52ead-ef25-411d-8ac2-e3384fceed68",
        ...data
    }).then(data => {
        if (data.data.status.code == 200) {
            successCallBack(data.data.result)
        } else {
            console.log(data.data.status)
            Toast({
                message: data.data.status.message,
                duration: 1000
            });

        }

    }).catch(err => {
        if (errorCallBack) {
            errorCallBack(err)
        } else {
            console.log(err)
        }
    })
}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import store from './store/index'
import Util from '@/common/js/util'
import Axios from '@/config/axios.js'
import VueTouch from 'vue-touch-easyhi'
import VueTouchRipple from 'vue-touch-ripple'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'
//import "../../../static/css/cube-ui/cube-ui.scss"
import {
    connectWebViewJavascriptBridge,
    setupWebViewJavascriptBridge
} from '../../common/js/jsBridge'
import {
    SwipeCell,
    Lazyload
} from 'vant';
import 'vant/lib/vant-css/index.css';
import VueTextareaAutosize from 'vue-textarea-autosize';
import VueScroller from 'vue-scroller'
import {
    XButton,
    XTextarea,
    XNumber,
    Loading,
    Confirm
} from 'vux';
import FastClick from 'fastclick';
import Cube, {
    Button,
    Toast,
    Dialog,
    ImagePreview,
    Sticky,
    Radio,
    Checkbox,
    Scroll,
    TabBar,
    Slide,
    ScrollNavBar,
    Input,
    Swipe,
    createAPI,
    ActionSheet
} from 'cube-ui';
import Ripple from 'vue-ripple-directive'
// import animated from 'animate.css' // npm install animate.css --save安装，在引入

// Vue.use(animated)



Ripple.color = 'rgba(153, 153, 153, 0.3)';
Ripple.zIndex = 55;
Vue.directive('ripple', Ripple);

Vue.prototype.$util = Util
Vue.prototype.$http = Axios
Vue.prototype.$API_URL = process.env.API_HOST.URL
    //Vue.prototype.$bridge = jsbridge
Vue.prototype.$USER_INFO = commonMessage()
Vue.config.productionTip = false

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}


Vue.use(VueTouch)
    .use(Vuex)
    .use(VueTouchRipple, {
        // default global options
        color: '#999',
        opacity: 0.3,
        speed: 1,
        transition: 'ease'
    }).use(TabBar).use(Slide).use(Scroll).use(ScrollNavBar).use(SwipeCell).use(Input).use(Swipe).use(Radio).use(Cube).use(VueTextareaAutosize).use(Vant);

Vue.use(VueScroller)
Vue.use(Lazyload, {
    attempt: 3,
    error: '../static/images/defaultAuthor.png',
    loading: '../static/images/defaultAuthor.png'
});

createAPI(Vue, ActionSheet, ['select'], true)
createAPI(Vue, Toast, ['click'], true)
createAPI(Vue, Dialog, ['confirm', 'cancel'], true)

Vue.component('loading', Loading)
Vue.component('confirm', Confirm)
Vue.component('x-button', XButton)
Vue.component('x-number', XNumber)
    /* eslint-disable no-new */

const initVueApp = () => {
    new Vue({
        el: '#app',
        router,
        store,
        components: {
            App
        },
        template: '<App/>'
    })
}
console.log(Util.isAndroid())
    // 第一连接时初始化bridage
if (Util.isAndroid()) {
    new connectWebViewJavascriptBridge(function(bridge) {

        initVueApp()

        bridge.init(function(message, responseCallback) {
            console.log('JS got a message', message);
            var data = {
                'Javascript Responds': '测试中文!'
            };
            console.log('JS responding with', data);
            responseCallback(data);
        });
        // 注册一个"functionInJs",
        bridge.registerHandler("functionInJs", function(data, responseCallback) {

            bridge.callHandler(
                "Log", {
                    param: JSON.stringify({
                        data: "1111111111"
                    })
                },
                function(responseData) {
                    responseCallback(responseData);
                }
            );

        });
    })
} else {

    new setupWebViewJavascriptBridge(function(bridge) {

        initVueApp(); // vue 实例
        //window.WebViewJavascriptBridge.callHandler('isBackNativePage');

        var uniqueId = 1

        function log(message, data) {
            var log = document.getElementById('log')
            var el = document.createElement('div')
            el.className = 'logLine'
            el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
            if (log.children.length) {
                log.insertBefore(el, log.children[0])
            } else {
                log.appendChild(el)
            }
        }
        /* Initialize your app here */

        /*我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文*/
        bridge.registerHandler('openWebviewBridgeArticle', function() {
                log("openWebviewBridgeArticle was called with by ObjC")
            })
            /*JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC*/
        bridge.registerHandler('getUserInfos', function(data, responseCallback) {
            log("Get user information from ObjC: ", data)
            responseCallback({
                'userId': '123456',
                'blog': '标哥的技术博客'
            })
        })

        /*JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。ObjC端可以在处理完成后，反馈给JS，这样写就是在载入页面完成时就先调用*/

        bridge.callHandler('demoBack', function(responseData) {
            log("JS call ObjC's getUserIdFromObjC function, and js received response:", responseData)
        })

        /* document.getElementById('blogId').onclick = function(e) {
            log('js call objc: getBlogNameFromObjC')
            bridge.callHandler('getBlogNameFromObjC', {
                'blogURL': 'http://www.henishuo.com'
            }, function(response) {
                log('JS got response', response)
            })
        } */

        /* bridge.callHandler("demoBack", function(data) {
            alert(data)
        }); */
    })



}
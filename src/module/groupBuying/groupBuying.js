// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/index'
import Util from '@/common/js/util'
import Axios from '@/config/axios.js'
import VueTouch from 'vue-touch-easyhi'
import VueTouchRipple from 'vue-touch-ripple'
import 'vue-touch-ripple/dist/vue-touch-ripple.css'
import "../../../static/css/cube-ui/cube-ui.scss"
import { SwipeCell } from 'vant';
import 'vant/lib/vant-css/index.css';

import Cube, {
    Button,
    Toast,
    Dialog,
    ImagePreview,
    Sticky,
    Scroll,
    TabBar,
    Slide,
    ScrollNavBar
} from 'cube-ui';

Vue.prototype.$util = Util
Vue.prototype.$http = Axios
Vue.config.productionTip = false

Vue.use(VueTouch)
    .use(Vuex)
    .use(VueTouchRipple, {
        // default global options
        color: '#999',
        opacity: 0.3,
        speed: 1,
        transition: 'ease'
    }).use(TabBar).use(Slide).use(Scroll).use(ScrollNavBar).use(SwipeCell);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
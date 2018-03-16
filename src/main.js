import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js';
import './ui.js' ;
import hljs from 'highlight.js/lib/highlight';
import 'highlight.js/styles/googlecode.css';
import h2m from 'h2m';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import {quillEditor} from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import Validator from 'vue-validator';

import {Message} from 'iview';
import 'iview/dist/styles/iview.css';

// import marked from 'marked';



Vue.use(Validator)
Vue.use(mavonEditor);
Vue.use(quillEditor);
Vue.use(h2m);
Vue.use(hljs);
// Vue.use(marked);

Vue.config.productionTip = false;

Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre>code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block);
    })
});

var vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});





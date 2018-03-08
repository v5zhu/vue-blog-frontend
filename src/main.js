import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
// import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import './login.js';
import './ui.js' ;
import hljs from 'highlight.js';
import 'highlight.js/styles/googlecode.css';
import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import { quillEditor } from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

Vue.use(mavonEditor);
Vue.use(quillEditor);

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





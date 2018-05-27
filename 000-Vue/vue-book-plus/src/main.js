// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


// 导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper';
// 使用轮播图插件
Vue.use(VueAwesomeSwiper);
import 'swiper/dist/css/swiper.css';
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img1.imgtn.bdimg.com/it/u=3779605030,1222595953&fm=27&gp=0.jpg',
  loading: 'http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif',
  attempt: 1
});
// 在进入路由之前 每一次都会执行此方法,全局钩子,拦截功能
router.beforeEach(function (to,from,next) {
  document.title = to.meta.title;
  if(to.path === '/list'){
    // next({path:'/add'})
    next();
  }else{
    next();
  }
});
import store from './store';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});


import Vue from "vue";

import App from "./App.vue";

// 引入vue-router
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 引入vue-resource来处理请求获取数据，相当于axios插件的功能
import VueResource from "vue-resource";
Vue.use(VueResource);

// 引入 mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);

// 引入mui中的样式
import "./static/css/mui.min.css";
import "./static/css/icons-extra.css";
import "./static/fonts/mui-icons-extra.ttf";

// 引入全局css样式
import "./root.css";

// 引入处理时间的插件
import moment from "moment";
// 定义一个处理时间的过滤器
Vue.filter("timeFilter", function (input, fmtString) {
    return moment(input).format(fmtString);
});

// 引入图片预览插件
import vuePicturePreview from 'vue-picture-preview';
Vue.use(vuePicturePreview);


// 引入各个页面的组件
import Home from "./components/Home.vue";
import Member from "./components/Member.vue";
import ShopCar from "./components/ShopCar.vue";
import Search from "./components/Search.vue";
import NewsList from "./components/NewsList.vue";
import NewsDetail from "./components/NewsDetail.vue";
import PhotoList from "./components/PhotoList.vue";
import PhotoDetail from "./components/PhotoDetail.vue";
import GoodsList from "./components/GoodsList.vue";
import GoodsInfo from "./components/GoodsInfo.vue";
import GoodsDesc from "./components/GoodsDesc.vue";
import Discuss from "./components/Discuss.vue";



// 实例化VueRouter
var  router = new VueRouter({
    // 自动找到router-link-active并将其替换成后面的值
    linkActiveClass: "mui-active",
    // 监视的路由
    routes: [
        // 当刚进去的时候显示首页
        // {name: "root", path: "/", component: Home},
        // redirect 是直接跳转
        {name: "root", path: "/", redirect: "/home"},
        {name: "home", path: "/home", component: Home},
        {name: "member", path: "/member", component: Member},
        {name: "shopcar", path: "/shopcar", component: ShopCar},
        {name: "search", path: "/search", component: Search},
        {name: "newslist", path: "/newslist", component: NewsList},
        {name: "newsdetail", path: "/newsdetail/:id", component: NewsDetail},
        {name: "photolist", path: "/photolist", component: PhotoList},
        {name: "photodetail", path: "/photodetail/:id", component: PhotoDetail},
        {name: "goodslist", path: "/goodslist", component: GoodsList},
        {name: "goodsinfo", path: "/goodsinfo/:id", component: GoodsInfo},
        {name: "goodsdesc", path: "/goodsdesc", component: GoodsDesc},
        {name: "discuss", path: "/discuss", component: Discuss}

    ]
});


new Vue({
    el: "#app",
    router,
    render: createElement => createElement(App)
});


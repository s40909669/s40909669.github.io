<template>
    <div id="app">
        <!--头部内容 mint-ui-->
        <mt-header title="漫购网-动漫资讯购物"></mt-header>
        <transition name="router" mode="out-in">
            <router-view></router-view>
        </transition>
        <!--底部内容 mui-->
        <nav class="mui-bar mui-bar-tab">
            <router-link class="mui-tab-item" :to="{name:'home'}">
                <span class="mui-icon icon-shouye"></span>
                <span class="mui-tab-label">首页</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'member'}">
                <span class="mui-icon icon-huiyuan"></span>
                <span class="mui-tab-label">会员</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'shopcart'}">
                <span class="mui-icon icon-gouwuche"><span class="mui-badge">{{pickNum}}</span></span>
                <span class="mui-tab-label">购物车</span>
            </router-link>
            <router-link class="mui-tab-item" :to="{name:'search'}">
                <span class="mui-icon icon-chazhao"></span>
                <span class="mui-tab-label">查找</span>
            </router-link>
        </nav>
    </div>
</template>

<script>
    import connect from './components/common/connect.js';
    import prodTools from './components/common/prodTools.js';

    export default {
        data() {
            return {
                pickNum: prodTools.getTotalCount(),
            }
        },
        created() {
            // 箭头函数本身没有this要往上面找 正好符合此处
            connect.$on('addShopCart', (num) => {
                this.pickNum += num;
                // 解决购物车内商品数量为0小图标显示0的问题
                this.pickNum==0?this.pickNum=null:this.pickNum
            })

        },
        methods: {},
    }
</script>

<style scoped>
    .mui-bar .mui-icon .mui-badge {
        font-size: 10px;
        line-height: 1.4;
        position: absolute;
        top: -5px;
        left: 100%;
        margin-left: -10px;
        padding: 0px 5px;
        color: white;
        background: red;
        border-radius: 7px;
    }
    .route-enter-active,.router-leave-active{
        transition: opacity .2s
    }
    .route-enter,.router-leave-to{
        opacity: 0;
    }
</style>
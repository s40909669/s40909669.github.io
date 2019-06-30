<template>
    <div>
        <!--轮播图mint-ui-->
        <my-swipe :url="lunboUrl"></my-swipe>
        <!--九宫格mui-->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'news.list'}">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">动漫新番</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'photo.share'}">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">动漫大新闻</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link :to="{name:'goods.list'}">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">手办大集市</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                       <span class="mui-icon mui-icon-search"></span>
                       <div class="mui-media-body">动漫搜索</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // imgs:[],
                lunboUrl:'http://localhost:3002/getlunbo',
            }
        },
        created(){
            // this.$ajax.get('http://localhost:3002/getlunbo')
            //     .then(res=>{
            //         this.imgs = res.data.lunbo;
            //     })
            //     .catch(err=>{
            //         console.log(err);
            //     })

        }
    }
</script>

<style scoped>
    /*!*轮播图*!*/
    /*.mint-swipe{*/
        /*max-height: 187px;*/
    /*}*/
    /*.mint-swipe img{*/
        /*height: 100%;*/
        /*width: 100%;*/
    /*}*/
    /*九宫格*/
    .mui-table-view.mui-grid-view.mui-grid-9{
        background-color: white;
        margin-top: 0px;
    }
    .mui-table-view.mui-grid-view.mui-grid-9 li{
        border: 0;
    }
    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content:'';
    }
    .mui-icon-home{
        background: url('../../static/img/news.png') round;
    }
    .mui-icon-email{
        background: url('../../static/img/picShare.png') round;
    }
    .mui-icon-chatbubble{
        background: url('../../static/img/goodShow.png') round;
    }
    .mui-icon-location{
        background: url('../../static/img/feedback.png') round;
    }
    .mui-icon-search{
        background: url('../../static/img/search.png') round;
    }
    .mui-icon-phone{
        background: url('../../static/img/callme.png') round;
    }
    .mui-icon{
        height: 50px;
        width: 50px;
    }
</style>
<template>
    <div class="tmpl" style="height: 577px;">
        <nav-bar title="热卖手办"></nav-bar>
        <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="prod in prods" :key="prod.id">
                <router-link :to="{name:'goods.detail',query:{id:prod.id}}">
                    <img class="mui-media-object" :src="prod.img_url">
                    <div class="mui-media-body">{{prod.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{prod.market_price}}</span>
                            <s>￥{{prod.sell_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{prod.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                pageIndex:1,    //页码
                prods:[],   //商品列表数据
                allLoaded:false,    //是否禁止触发上拉函数
                isAutoFill:false,   //是否自动触发
            }
        },
        created(){
            this.loadMore()
        },
        methods:{
            loadBottom(){
                this.loadMoreConcat()
            },
            loadMore(){
                this.$ajax.get('http://localhost:3002/getsblist?pageindex=1')
                    .then(res=>{
                        this.prods = res.data.getsb
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            loadMoreConcat(){
                this.$ajax.get('http://localhost:3002/getsblist?pageindex=' + (++this.pageIndex))
                    .then(res=>{
                        if (res.data.getsb instanceof Array) {
                            this.prods = this.prods.concat(res.data.getsb)
                        }
                        // 1页12条数据 数据要是少于12条 说明后面没有数据了 就不用拉了
                        if(res.data.getsb.length !=12){
                            this.allLoaded = true;
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                    // 通知上拉操作已经完成
                    this.$refs.loadmore.onBottomLoaded()
            }
        },
    }
</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
.mui-table-view.mui-grid-view{
    margin-bottom: 50px;
}
</style>

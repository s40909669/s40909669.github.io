<template>
    <div class="tmpl">
        <nav-bar :title="title"></nav-bar>
        <div class="news-title">
            <p v-text="news.title"></p>
            <div>
                <span>{{news.click}}次点击</span>
                <span>分类:新番</span>
                <span>添加时间:{{news.add_time | convertDate}}</span>
            </div>
        </div>
        <div class="news-content" v-html="news.content"></div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                news:{},
                title:'',  //标题，哪个来用 就写谁
            }
        },
        created(){
            let id = this.$route.query.id;
            this.$ajax.get('http://localhost:3002/getnew/' + id)
                .then(res=>{
                    this.news = res.data
                })
                .catch(err => {
                    console.log(err);
                })
        },
        beforeRouteEnter(to, from, next){
            let myTitle = '';
            if(from.name === 'new.list'){
                myTitle = '动漫详情';
            }else if(from.name === 'goods.detail'){
                myTitle = '商品介绍';
            }
            next(vm=>{
                vm.title = myTitle;
            })
        },
    }
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.news-content {
    padding: 10px 5px;
}


</style>

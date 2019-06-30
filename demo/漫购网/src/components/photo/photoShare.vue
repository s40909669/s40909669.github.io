<template>
    <div class="tmpl">
        <nav-bar title="最新动漫热点"></nav-bar>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="gorys in gory" :key="gorys.id">
                    <a href="javascript:;" @click="loaddm(gorys.id)">{{gorys.title}}</a>
                </li>
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="dm in dms" :key="dm.id">
                    <router-link :to="{name:'photo.detail',params:{id:dm.id}}">
                        <!--图片懒加载-->
                        <img v-lazy="dm.img_url">
                        <p>
                            <span v-text="dm.title"></span>
                            <br>
                            <span v-text="dm.content"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                gory:[],
                dms:[],
            }
        },
        created(){
            this.$ajax.get('http://localhost:3002/getgory')
                .then(res => {
                    this.gory = res.data.message;

                    this.gory.unshift({
                        id:0,
                        title:'全部热点'
                    })
                })
                .catch(err => {
                    console.log(err);
                })
                this.loaddm(0);
        },
        methods:{
            loaddm(id){
                this.$ajax.get('http://localhost:3002/getgory/' + id)
                    .then(res=>{
                        this.dms = res.data.dm
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }
    }
</script>
<style>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    overflow-y:hidden;
    padding-left: 0px;
    margin: 5px;
}
.photo-header ul::-webkit-scrollbar{
    height: 0px;
    width: 0px;
}
/*.photo-header ul::-webkit-scrollbar-thumb{*/
    /*border-radius: 5px;*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.1);*/
    /*background: rgba(0,0,255,.3);*/
/*}*/
/*.photo-header ul::-webkit-scrollbar-track{*/
    /*border-radius: 5px;*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.2);*/
    /*background: rgba(0,0,0,.2);*/
/*}*/

/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

/*mint-ui图片懒加载的样式上面要加<img v-lazy="dm.img_url">*/
image[lazy=loading]{
    width: 40px;
    height: 300px;
    margin: auto;
}


</style>

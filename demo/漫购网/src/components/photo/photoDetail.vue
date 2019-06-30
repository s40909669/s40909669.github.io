<template>
    <div class="tmpl">
        <nav-bar title="热点详情"></nav-bar>
        <div class="photo-title">
            <p v-text="textrd.title"></p>
            <span>发起日期：{{textrd.add_time | convertDate}}</span>
            <span>{{textrd.click}}次浏览</span>
            <span>分类：动漫热点</span>
        </div>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <viewer :images="imgs">
            <li v-for="(img,index) in imgs" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <img :src="img.img_url" alt="">
            </li>
            </viewer>
        </ul>
        <div class="photo-desc">
            <p v-html="textrd.content"></p>
        </div>

        <!--&lt;!&ndash;评论&ndash;&gt;-->
        <!--<div class="photo-bottom">-->
            <!--<ul>-->
                <!--<li class="photo-comment">-->
                    <!--<div>-->
                        <!--<span>提交评论</span>-->
                        <!--<span><a @click="back">返回</a></span>-->
                    <!--</div>-->
                <!--</li>-->
                <!--<li class="txt-comment">-->
                    <!--<textarea v-model="msg"></textarea>-->
                <!--</li>-->
                <!--<li>-->
                    <!--<mt-button type="primary" size="large"  @click="sendComment">发表评论</mt-button>-->
                <!--</li>-->
                <!--<li class="photo-comment">-->
                    <!--<div>-->
                        <!--<span>评论列表</span>-->
                        <!--<span>28条评论</span>-->
                    <!--</div>-->
                <!--</li>-->
            <!--</ul>-->
            <!--<ul class="comment-list">-->
                <!--<li v-for="(comment,index) in  comments" :key="index">-->
                    <!--{{comment.user_name}}:{{comment.contert}} {{comment.add_time}}-->
                <!--</li>-->
            <!--</ul>-->
            <!--<mt-button type="primary" size="large" plain @click="loadByPage">加载更多</mt-button>-->
        <!--</div>-->
        <comment :cid="cid"></comment>
    </div>
</template>
<script>
    export default {
        data(){
            return{
                imgs:[],    //热点详情图片
                textrd:{},  //热点详情文本
                // comments:[],    //评论
                // pageIndex:1,    //页码
                cid:this.$route.params.id,  //热点图片ID
                // msg:'',     //新发表的评论
            }
        },
        created(){
            // let pid = this.$route.params.id;
            this.$ajax.get('http://localhost:3002/getrdimg/' + this.cid)
                .then(res=>{
                    this.imgs = res.data
                })
                .catch(err=>{
                    console.log(err)
                })

            this.$ajax.get('http://localhost:3002/getrdtext/' + this.cid)
                .then(res=>{
                    this.textrd = res.data
                })
                .catch(err=>{
                    console.log(err)
                })
                // this.loadFirst()
        },
        // methods: {
        //     loadFirst() {
        //         this.$ajax.get('http://localhost:3002/getrdpl/' + this.cid + '?pageindex=1')
        //             .then(res => {
        //                 this.comments = res.data.getpinglun
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //             })
        //     },
        //     loadByPage() {
        //         this.$ajax.get('http://localhost:3002/getrdpl/' + this.cid + '?pageindex=' + (++this.pageIndex))
        //             .then(res => {
        //                 if (res.data.getpinglun instanceof Array) {
        //                     this.comments = this.comments.concat(res.data.getpinglun)
        //                 }
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //             })
        //     },
        //     sendComment(){
        //         this.$ajax.post('http://localhost:3002/postrdpl/' + this.cid, 'content=' + this.msg)
        //             .then(res=>{
        //                 this.loadFirst()
        //                 this.msg = ''
        //             })
        //             .catch(err => {
        //                 console.log(err)
        //             })
        //     },
        //     back(){
        //         this.$router.go(-1)
        //     },
        // }
    }
</script>
<style scoped>
ul {
    margin: 0;
    padding: 0;
}

.photo-title {
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
    list-style: none;
    height: 150px;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 5px;
}
.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 img{
    width: 100%;
    height: 100%;
}

/*评论*/
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5px;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}
</style>

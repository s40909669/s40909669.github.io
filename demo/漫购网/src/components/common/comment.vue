<template>
    <div>
        <!--评论-->
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="back">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                    <mt-button type="primary" size="large"  @click="sendComment">发表评论</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>28条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in  comments" :key="index">
                    {{comment.user_name}}:{{comment.contert}} {{comment.add_time}}
                </li>
            </ul>
            <mt-button type="primary" size="large" plain @click="loadByPage">加载更多</mt-button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                comments:[],
                pageIndex:1,
                msg:'',
            }
        },
        created(){
            this.loadFirst()
        },
        props:['cid']
        ,
        methods: {
            loadFirst() {
                this.$ajax.get('http://localhost:3002/getrdpl/' + this.cid + '?pageindex=1')
                    .then(res => {
                        this.comments = res.data.getpinglun
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            loadByPage() {
                this.$ajax.get('http://localhost:3002/getrdpl/' + this.cid + '?pageindex=' + (++this.pageIndex))
                    .then(res => {
                        if (res.data.getpinglun instanceof Array) {
                            this.comments = this.comments.concat(res.data.getpinglun)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            sendComment(){
                this.$ajax.post('http://localhost:3002/postrdpl/' + this.cid, 'content=' + this.msg)
                    .then(res=>{
                        this.loadFirst()
                        this.msg = ''
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            back(){
                this.$router.go(-1)
            },
        }
    }
</script>

<style scoped>
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
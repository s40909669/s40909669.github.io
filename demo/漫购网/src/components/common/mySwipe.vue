<template>
    <div>
        <!--轮播图mint-ui-->
        <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(img,index) in imgs" :key="index"><a :href="img.url"><img :src="img.img"></a></mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                imgs:[],
            }
        },
        props:['url'],
        created(){
            this.$ajax.get(this.url)
                .then(res=>{
                    this.imgs = res.data.img_url || res.data.lunbo
                })
                .catch(err=>{
                    console.log(err)
                })
            },
    }
</script>

<style scoped>
/*轮播图*/
.mint-swipe{
    max-height: 187px;
}
.mint-swipe img{
    height: 100%;
    width: 100%;
}
</style>
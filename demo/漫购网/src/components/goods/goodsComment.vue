<template>
    <div class="tmpl">
        <nav-bar title="商品评论"></nav-bar>
        <comment :cid="$route.query.id"></comment>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        created(){

        }
    }
</script>

<style scoped>

</style>
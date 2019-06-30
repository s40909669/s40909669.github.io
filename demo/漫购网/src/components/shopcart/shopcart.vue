<template>
    <div class="tmpl">
        <nav-bar title="购物车"></nav-bar>
        <div class="pay-detail">
            <ul>
                <li class="p-list" v-for="(goods,index) in goodsList" :key="goods.id">
                    <mt-switch v-model="goods.isPicked"></mt-switch>
                    <img :src="goods.img_url">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span>{{goods.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
    import prodTools from '../common/prodTools.js';
    // 通知底部购物车图标变更数据
    import connect from '../common/connect.js';

    export default {
        data() {
            return {
                goodsList: [],
            }
        },
        created() {
            let prods = prodTools.getProds();
            //判断如果没有商品，return
            if(Object.keys(prods).length === 0)return;
            let url = 'http://localhost:3002/getshopcartlist/';
            url += Object.keys(prods).join(',');
            this.$ajax.get(url)
                .then(res => {
                    this.goodsList = res.data;
                    // 给接收到的对象添加商品数量以及默认被选中状态
                    this.goodsList.forEach((ele) => {
                        if (prods[ele.id]) {
                            // vue中添加属性是没有办法做到响应 此处需要用$set
                            this.$set(ele, 'num', prods[ele.id]);
                            this.$set(ele, 'isPicked', true)
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        },
        methods: {
            add(i) {
                // 更新购物车小图标数据
                this.goodsList[i].num++;
                connect.$emit('addShopCart', 1);
                // 更新本地存储数据
                prodTools.addOrUpdata({
                    id: this.goodsList[i].id,
                    num: 1,
                })
            },
            sub(i) {
                if (this.goodsList[i].num > 1) {
                    // 更新购物车小图标数据
                    this.goodsList[i].num--;
                    connect.$emit('addShopCart', -1);
                    // 更新本地存储数据
                    prodTools.addOrUpdata({
                        id: this.goodsList[i].id,
                        num: -1,
                    })
                }
            },
            del(i){
                let goods = this.goodsList[i];
                // 根据传入的index找到对应对象 取对象中的id值 根据id值调用方法删除对应的数据
                prodTools.delete(goods.id)
                // 根据传入的index找到对应对象 取对象中的num值 根据num值删除对应的购买数量
                connect.$emit('addShopCart',-goods.num)
                // 根据传入的index删除当前元素
                this.goodsList.splice(i,1)
            }
        },
        computed: {
            payment() {
                let num = 0;    //商品购买数量
                let sum = 0;    //商品总金额
                this.goodsList.forEach((ele)=>{
                    if(ele.isPicked){
                        sum += ele.num * ele.sell_price;
                        num += ele.num
                    }
                });
                return {
                    num,sum
                };
            }
        },
    }
</script>

<style scoped>
    .pay-detail ul li {
        list-style: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        margin-bottom: 3px;
    }

    .pay-detail ul {
        padding-left: 5px;
        margin-top: 5px;
    }

    .pay-detail ul li img {
        width: 80px;
        height: 80px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
    }

    .pay-detail ul li > :nth-child(1),
    .pay-detail ul li > :nth-child(3) {
        display: inline-block;
    }

    .pay-calc p {
        display: inline-block;
        width: 250px;
        overflow: hidden;
        color: blue;
        font-size: 15px;
        margin-bottom: 10px;
    }

    .pay-detail ul li > :nth-child(1) {
        line-height: 80px;
    }

    .calc:nth-child(1) {
        color: red;
        font-size: 20px;
    }

    .calc span:not(:nth-child(1)) {
        border: 1px solid rgba(0, 0, 0, 0.3);
        display: inline-block;
        width: 20px;
        text-align: center;
    }

    .calc a {
        margin-left: 20px;
    }

    .show-1,
    .show-2 {
        display: inline-block;
    }

    .show-1,
    .show-2 {
        margin-left: 30px;
    }

    .show-price {
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>
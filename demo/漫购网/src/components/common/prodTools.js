// 处理购物车增删改查业务的对象
let ProdTools = {};
// 创建一个本地存储
let store = window.localStorage;
// 获取本地存储的数据，没有数据就是空对象（这里将字符串转化为对象）
let prods = JSON.parse(store.getItem('prods') || '{}');
// 添加和更新（p）是一个对象，包含商品id以及购买数量
ProdTools.addOrUpdata = function (p) {
    // 如果新加入对象中的id与本地存储中的id相同说明之前有数据 此时更新数据
    if (prods[p.id]) {
        prods[p.id] += p.num
        // 否则就添加该商品id以及购买数据
    } else {
        prods[p.id] = p.num
    }
    // 添加或更新数据后 需要保存当前数据 调用存储数据到本地存储的函数
    this.savaProds(prods);
};
// 删除
ProdTools.delete = function (id) {
    delete prods[id];
    // 删除数据后 需要保存当前数据 调用存储数据到本地存储的函数
    this.savaProds(prods);
};
//获取
ProdTools.getProds = function () {
    return JSON.parse(store.getItem('prods') || '{}');
};
//获取总数
ProdTools.getTotalCount = function () {
    let sum = 0;
    for (let id in prods) {
        sum += prods[id];
    }
    // 解决本地存储为空时购物车小图标数量显示为0的问题
    return sum == 0 ? sum = null : sum

};
// 存储数据到本地存储的函数(传入要保存到本地存储的数据)
ProdTools.savaProds = function (prods) {
    // 本地储存.保存（存到哪，要保存的数据（把对象转为字符串保存））
    store.setItem('prods', JSON.stringify(prods));
};
// 向外导出这个处理购物车增删改查业务的对象
export default ProdTools;


//注：'prods'是装数据的容器    prods是数据
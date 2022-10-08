//获取id元素的函数
function $(id) {
    return document.getElementById(id);
};


//存储当前操作数据
let nowData = [];
//初始值
let index = 0;
//设置开关用于是否显示总金额
let flag = true;

//将数据渲染到页面函数
let addDom = (item) => {
    let newH2 = document.createElement('h2');
    newH2.innerHTML = `<strong>${item.name}</strong>
    <span>$ ${(item.money).toLocaleString()}</span>`;

    //判断是否出现总金额
    if (flag) {
        $('main').appendChild(newH2);
    } else {
        //添加节点到总金额元素的前面
        $('main').insertBefore(newH2, $('main').lastElementChild)
    }
}

//清空旧数据函数
let clearData = () => {
    //防止页面原来结构清除
    $('main').innerHTML = `
    <h2>
    <strong>Person</strong>
    <span>Wealth</span>
    </h2>`;

    //打开状态开关
    flag = true;

}


//导航栏按钮添加点击事件
$('toggle').addEventListener('click', function () {
    //给body添加显示导航类名
    // document.querySelector('body').classList.toggle('show_nav');
    document.body.classList.toggle('show_nav');
});

//添加账户按钮
$('add-user').addEventListener('click', function () {

    //判断是否到达数组长度，如果到达最大值则不进行下一步操作
    if (index >= dataInfo.length) {
        return;
    }

    //每次添加得到数据放进nowData数组中保存
    nowData.push(dataInfo[index]);

    //将数据渲染到页面中
    addDom();

    //自增在最后
    index++;

});

//资金翻倍按钮
$('double').addEventListener('click', function () {
    //清空旧数据
    clearData();

    //遍历新数组的数据
    nowData.forEach(function (item) {

        //数据翻倍（重新赋值，改变原数据
        item.money = item.money * 2;

        let newH2 = document.createElement('h2');
        newH2.innerHTML = `<strong>${item.name}</strong>
        <span>$ ${(item.money * 2).toLocaleString()}</span>`;
        $('main').appendChild(newH2);
    })
});

//查询按钮
$('show-millionaire').addEventListener('click', function () {
    //清空
    clearData();

    //过滤nowData数据
    nowData = nowData.filter(function (item) {
        return item.money >= 1000000
    });

    nowData.forEach(function(){
        addDom();
    })
});

//富豪榜 排序
$('sort').addEventListener('click', function () {

    //对nowData数据进行排序
    nowData.sort(function (a, b) {
        return b.money - a.money;
    });

    nowData.forEach(function(){
        addDom();
    })
    
});


//计算总额
$('calculate').addEventListener('click', function () {
    let sum = 0;
    //累加操作
    nowData.reduce(function (total, current, currentIndex, arr) {
        return total += current.money;
    },0);

    let newH2 = document.createElement('h2');
    newH2.innerHTML = `<strong>总金额</strong>
   <span>$ ${(sum).toLocaleString()}</span>`;
    //判断是否可以继续显示总金额
    if (flag) {
        $('main').appendChild(newH2);
        //关闭状态
        flag = false;
    }

});
let li_list = document.getElementsByTagName("li");
let ul = document.querySelector(".img_box>ul");
let arrow_left = document.querySelector(".arrow_left");
let arrow_right = document.querySelector(".arrow_right");
let dots = document.querySelectorAll(".dot_box>span");
let dot_box = document.querySelector('.dot_box')


// 初始值(用于控制轮播图)
let index = 1;
// 保存上一次操作的值
let lastIndex = 1;


// 克隆第一张和最后一张做无缝图片
// 1. 克隆最后一张插入到第一张图片前面
ul.insertBefore(ul.lastElementChild.cloneNode(true), ul.firstElementChild);
// 2. 克隆第二张追加到最后一张的后面
ul.appendChild(ul.children[1].cloneNode(true));

// 将真正的第一张图恢复到可视区域
ul.style.transform = `translateX(-${index}00%)`;
// 设置定时器
setInterval(function () {
  //恢复过渡效果
  ul.style.transition = "0.2s ease-in-out";
}, 500);

// 右箭头移动功能
arrow_right.addEventListener("click", function () {
  // ul平移自身100% * index
  ul.style.transform = `translateX(-${++index}00%)`;
  // 判断index是否到达最后一张(无缝)
  if (index === li_list.length - 1) {
    //console.log("到达最后一张");
    // 瞬间回到第二张图片(真正的第一张)
    index = 1;
    // transitionend事件, 用于检测过渡效果是否完成
    ul.addEventListener("transitionend", function () {
      //console.log("过渡效果已经完成, 可以瞬间跳转");
      // 关闭过渡效果
      ul.style.transition = "none";
      // 复位
      ul.style.transform = `translateX(-${index}00%)`;

      // 恢复过渡效果
      // getComputedStyle 获取css的最终样式 (获取完毕之后可以设置多次同个属性)
      window.getComputedStyle(ul, "style").transition;
      ul.style.transition = "0.2s ease-in-out";
    }, {
      // 设置一次事件, 避免出现同一个行为事件触发多次回调函数
      once: true
    });
  };
  // 切换小圆点颜色
  dotColor();
});


// 左边箭头移动功能
arrow_left.addEventListener("click", function () {
  // ul平移自身100% * index
  ul.style.transform = `translateX(-${--index}00%)`;
  // 判断index是否到达第一张(无缝)
  if (index === 0) {
    //console.log("到达第一张");
    // 瞬间回到倒数第二张图片(真正的最后一张)
    index = li_list.length - 2;
    // transitionend事件, 用于检测过渡效果是否完成
    ul.addEventListener("transitionend", function () {
      //console.log("过渡效果已经完成, 可以瞬间跳转");
      // 关闭过渡效果
      ul.style.transition = "none";
      // 复位
      ul.style.transform = `translateX(-${index}00%)`;
      // 恢复过渡效果
      // getComputedStyle 获取css的最终样式 (获取完毕之后可以设置多次同个属性)
      window.getComputedStyle(ul, "style").transition;
      ul.style.transition = "0.2s ease-in-out";
    }, {
      // 设置一次事件, 避免出现同一个行为事件触发多次回调函数
      once: true
    });
  };
  // 切换小圆点颜色
  dotColor();
});


// 给小圆点绑定点击事件
/* dots.forEach(function (el) {
  el.addEventListener("click", function () {
    // 获取自定义的属性data-index, 这个值就是当前ul所要平移的值
    let dataIndex = el.dataset.index;
    // 当前操作的值赋值给index初始值
    index = dataIndex;
    ul.style.transform = `translateX(-${dataIndex}00%)`;
    // 切换小圆点颜色
    dotColor();
    
  });
}); */

//通过事件代理进行无缝轮播
dot_box.addEventListener('click',function(e){
  if(e.target.nodeName.toLowerCase()==='span'){
    //获取当前data-index的值
    let x = (Number(e.target.getAttribute('data-index')));
    index = x
    ul.style.transform = `translateX(-${index}00%)`;
    //小圆点切换时的颜色
    dotColor();
  }

});

// 小圆点颜色切换
function dotColor() {
  // 清除上一次操作的样式
  dots[lastIndex - 1].classList.remove("dotActive")
  // index 就是当前操作的下标
  dots[index - 1].classList.add("dotActive");
  // 将当前操作的index赋值lastIndex
  lastIndex = index;
};
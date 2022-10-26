function Swiper(select) {
  this.ele = document.querySelector(select);

  this.imgbox = this.ele.querySelector(".img_box");
  this.ul = this.ele.querySelector("ul");
  this.li_list = this.ele.querySelectorAll("ul>li");
  this.arrow_right = this.ele.querySelectorAll("arrow_right");
  this.dotbox = this.ele.querySelector(".dot_box");
  
  //索引
  this.index = 0;

  //直接调用
  this.init();
}
//启动器
Swiper.prototype.init = function () {
  this.clickevent();
  this.cloneImg();
  
};

//复制图片，用于无缝轮播
Swiper.prototype.cloneImg = function () {
  // 1. 克隆最后一张插入到第一张图片前面
  this.ul.insertBefore(this.ul.lastElementChild.cloneNode(true), this.ul.firstElementChild);
  // 2. 克隆第二张追加到最后一张的后面
  this.ul.appendChild(this.ul.children[1].cloneNode(true));

  // 将真正的第一张图恢复到可视区域
  this.ul.style.transform = `translateX(-${this.index}00%)`;
  //this.ul.style.transition = "0.2s ease-in-out";
};

//图片和小圆点切换
Swiper.prototype.changeImg = function (type) {
  //取消dotActive类名
  this.dotbox.children[this.index].classList.remove("dotActive");

  //判断type类型，来修改index的值
  if (type === true) {
    this.index++;
  } else if (type === false) {
    this.index--;
  } else {
    this.index = type;
  }

  //当图片(小圆点)到最后一张/第一张的操作
  if (this.index >= this.dotbox.children.length) {
    this.index = 0;
    
  }
  if (this.index < 0) {
    this.index = this.dotbox.children.length - 1;
  }

  //添加active类名
  this.dotbox.children[this.index].classList.add("dotActive");
};

//点击事件
Swiper.prototype.clickevent = function () {
  this.ele.addEventListener("click", (e) => {
    //兼容
    e = e || window.event;
    //判断箭头
    if (e.target.className === "arrow_left") {
      this.changeImg(false);
      this.ul.style.transform = `translateX(-${this.index}00%)`;
    }
    if (e.target.className === "arrow_right") {
      this.changeImg(true);
      this.ul.style.transform = `translateX(-${this.index}00%)`;
    }

    //点击某一个小圆点
    if (e.target.className === "dot") {
      //拿到索引
      let currentIndex = e.target.dataset.index - 1;
      //点击小圆点切换
      this.changeImg(currentIndex);
      this.ul.style.transform = `translateX(-${this.index}00%)`;
    }
  });
};


//创建一个新类，添加自动播放功能
function Swiper2(select) {
  //console.log(select);
  //构造函数继承
  Swiper.apply(this, arguments);

}

//继承父类的原型方法和属性
function Obj() {};
Obj.prototype = Swiper.prototype;
Swiper2.prototype = new Obj();
Swiper2.prototype.init = function () {
  this.autoplay();
  this.clickevent();
  this.cloneImg();
};
//自动轮播
Swiper2.prototype.autoplay = function () {
  
  let timer = 0;
  timer = setInterval(() => {
    this.changeImg(true);
    this.ul.style.transform = `translateX(-${this.index}00%)`;
  }, 2000);

  //检测是否需要停止
  //鼠标移入后停止自动轮播
  this.ul.addEventListener("mouseenter", () => {
    clearInterval(timer);

  });
  //鼠标移出后再次执行轮播
  this.ul.addEventListener("mouseleave", () => {
    timer = setInterval(() => {
      this.changeImg(true);
      this.ul.style.transform = `translateX(-${this.index}00%)`;
    }, 2000);
  });
};

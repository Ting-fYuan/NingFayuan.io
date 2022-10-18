
let url = "http://studentback.dfbuff.top/getMethod";
let parmas = {
  type: "图片",
};

// Ajax("GET", url, parmas).then((res) => {
//   let ul = document.querySelector("ul");
//   // console.log(res);
//   res.result.forEach((item) => {
//     // console.log(item);
//     ul.innerHTML += `<li><img src='' class='lazyImg' data-src=${item.content}></li>`;
//   });

//   lazyLoad(".lazyImg");
//   function lazyLoad($tag) {
//     let img = document.querySelectorAll($tag);
//     //如果长度不存在，直接返回
//     if (!img.length) return;
//     img.forEach(function (el) {
//       if (
//         document.documentElement.clientHeight +
//           document.documentElement.scrollTop >=
//         el.offsetTop
//       ) {
//         el.classList.remove("lazyImg");
//         el.src = el.dataset.src;
//       }
//     });
//   }
//   document.addEventListener("scroll", () => {
//     lazyLoad(".lazyImg");
//   });
// });

(async () => {
  try {
    let res = await Ajax("GET", url, parmas);
    let ul = document.querySelector("ul");
    res.result.forEach((item) => {
      ul.innerHTML += `<li><img src='' class='lazyImg' data-src=${item.content}></li>`;
      let imgs = document.querySelectorAll(".lazyImg");
      let obs = new IntersectionObserver((entries) => {
        entries.forEach((item) => {
          if (item.isIntersecting) {
            item.target.src = item.target.dataset.src;
            obs.unobserve(item.target);
          }
        });
      });
      imgs.forEach((el) => {
        obs.observe(el);
      });
    });
  } catch (error) {
    console.log(error);
  }
})();

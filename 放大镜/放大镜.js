window.addEventListener('load', () => {

    //获取元素
    let box = document.querySelector('.box');
    let smallBox = document.querySelector('.smallBox');
    let mask = document.querySelector('.mask');
    let bigBox = document.querySelector('.bigBox');
    let smallImg = document.querySelector('.smallImg');
    let bigImg = document.querySelector('.bigImg');
    let imgBox = document.querySelector('.imgBox');

    //遮罩层跟随鼠标进行移动
    mask.addEventListener('mouseover', () => {
        mask.style.display = `block`;
        bigBox.style.display = `block`;
    });
    //遮罩层跟随鼠标移动并且鼠标位于遮罩层中央
    mask.addEventListener('mousemove', (e) => {
        //让遮罩层的左上角为坐标原点
        let x = e.pageX - smallBox.offsetLeft;
        let y = e.pageY - smallBox.offsetTop;

        //让鼠标在遮罩层中央
        let width = x - mask.offsetWidth / 2;
        let height = y - mask.offsetHeight / 2;

        //遮罩层不超出smallBox范围
        if (width <= 0) {
            width = 0;
        } else if (width >= smallBox.offsetWidth - mask.offsetWidth) {
            width = smallBox.offsetWidth - mask.offsetWidth;
        };
        if (height <= 0) {
            height = 0;
        } else if (height >= smallBox.offsetHeight - mask.offsetHeight) {
            height = smallBox.offsetHeight - mask.offsetHeight;
        };

        //改变mask遮罩层的位置
        mask.style.left = width + 'px';
        mask.style.top = height + 'px';

        //改变大图片的位置
        bigImg.style.width = smallImg.offsetWidth * bigBox.offsetWidth / mask.offsetWidth + 'px';
        bigImg.style.left = - width * (smallImg.offsetWidth * smallBox.offsetWidth / mask.offsetWidth) / smallImg.offsetWidth + 'px';
        bigImg.style.top = - height * (smallImg.offsetHeight * smallBox.offsetHeight / mask.offsetHeight) / smallImg.offsetHeight + 'px';
        //console.log(bigImg);
        //console.log(bigImg.offsetWidth);
    });

    //鼠标1移入图片盒子是切换图片路径
    imgBox.addEventListener('mousemove', (e) => {
        bigImg.src = e.target.src;
        smallImg.src = e.target.src;
    });

});
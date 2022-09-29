//获取DOM节点
let h4 = document.querySelectorAll('h4');
let main = document.querySelectorAll('.main');

for(let i=0;i<h4.length;i++){
    h4[i].addEventListener('mouseenter',function(){

        //鼠标在main之间移动
        for(let k=0;k<h4.length;k++){
        main[k].style=`height:0`;
        main[k].style=`display:none`;
        }
        //鼠标移入时给main添加高度
        main[i].style=`height:180px`;

    })
    h4[i].addEventListener('mouseleave',function(){
        //鼠标移出时设置高度为0
        main[i].style=`height:0`
    })
}


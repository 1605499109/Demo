
//在ES6之前，我们都是用var来声明变量，而且JS只有函数作用域和全局作用域，没有块级作用域，所以{}限定不了var声明变量的访问范围

window.onload = function () {             //当页面载入完毕后执行Javascript代码
    let begin = document.querySelector("#begin");
    let main = document.querySelector("#main");
    let life = document.querySelector("#life");
    let score = document.querySelector("#score");
    let sound = document.querySelector("#sound");
    let game = document.querySelector("#game");
    let start = document.querySelector("#start");
    let pause = document.querySelector("#pause");
    let reload = document.querySelector("#reload");
    let restart = document.querySelector("#restart");
    let end = document.querySelector("#end");
    let btnGroup = document.querySelector("#btnGroup");

    //初始化变量
    let flag = false;
    let lifeNum = 3;
    let scoreNum = 0;
    //创建图片定时器让图片定时生成
    let creatImgInterval;//定时器
    let downImgInterval;//图片下落定时器
    let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];//创建数组
    let model = document.querySelector('#model');//获取模态框

    life.textContent = lifeNum;
    score.textContent = scoreNum;

    //点击隐藏模态框，显示游戏盒子
    begin.addEventListener('click', function () {
        model.style.display = 'none';
        main.style.display = 'block';
    })
    //开始游戏
    start.addEventListener('click', function () {
        flag = true;
        createImg();
        downImg();
    })
    //暂停按钮
    pause.addEventListener('click', function () {
        if (flag) {
            flag = false;
            this.textContent = '继续游戏';
            window.clearInterval(creatImgInterval);
            window.clearInterval(downImgInterval);
        }
        else {
            flag = true;
            play();
            this.textContent = '暂停游戏';




        }
    })
    sound.addEventListener('click', function () {
        alert('audio');
    })
    //创建函数
    function createImg() {
        let bwidh = document.body.clientWidth;





        if (flag == true) {
            creatImgInterval = setInterval(function () {
                let randomNum = randomScope(0, 25);
                let word = chars[randomNum]

                let imgLeft = randomScope(100, bwidh - 100);//获取图片左边的距离
                // console.log(bwidh);


                game.innerHTML += `<img src="./images/letter/${word}.png" style="width: 80px; position:absolute; left:${imgLeft}px;top:100px" alt="">`//添加凭借好的字符串
            }, 1000)
        }
    }

    //让图片自由下落
    function downImg() {
        let bHeight = document.body.clientHeight - 200;
        downImgInterval = setInterval(function () {
            if (flag) {
                let imgs = game.children;
                for (let i = 0; i < imgs.length; i++) {
                    let img = imgs[i];
                    let offTop = img.offsetTop;
                    // console.log(offTop);
                    if (offTop < bHeight) {
                        img.style.top = (offTop + 20) + 'px';

                    }
                    else {
                        game.removeChild(img);
                        lifeNum--;
                        if (lifeNum <= 0) {
                            flag = false;
                            lifeNum = 0;
                            reload.style.display = 'block';
                            btnGroup.style.display = 'none';
                            window.clearInterval(creatImgInterval);
                            window.clearInterval(downImgInterval);
                        }
                        //分数相减
                        life.textContent = lifeNum;
                        if(scoreNum<10){
                            scoreNum=0;
                        }else{
                            scoreNum-=10;
                            score.textContent=scoreNum;

                        }

                    }


                }

            }
        }, 200)



    }






    //随机函数
    function randomScope(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    //调用函数
    function play() {
        createImg();
        downImg();

    }

    // 重新开始 
    resart.addEventListener('click', function () {
            window.clearInterval(creatImgInterval);
            window.clearInterval(downImgInterval);
            flag=true;//更改FLAG标识符
            game.innerHTML='';
            lifeNum=3
            scoreNum=0;
            life.textContent=lifeNum;
            score.textContent=scoreNum;
            reload.style.display='none';
            btnGroup.style.display='block';



    })
    end.addEventListener('click', function () {
    window.location.href='http://www.baidu.com'


        
    })


//键盘事件
window.addEventListener('keydown',function(e){
    let keyword= e.key.toUpperCase();
   
    let imgs = game.children;
    for( let i= 0;i<imgs.length;i++){
        let img =imgs[i];
        let imgSrc=img.src.split('/');

        // console.log(img.src.split('/'));
        let word =imgSrc[imgSrc.length -1].split('.')[0];
        
        if(keyword == word){
            game.removeChild(img);
            scoreNum +=10;
            score.textContent=scoreNum;
        }
        
        




    }
})








}
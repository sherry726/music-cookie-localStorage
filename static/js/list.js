window.onload = function(){
    // document.cookie = 'test=test;Max-Age=3600';
    // document.cookie = 'test1=test1;Max-Age=3600';
    // console.log(document.cookie);
    let colorArr = ["white","rgb(204,232,207)", "rgb(200,200,169)", "rgb(114,111,128)"];
    let key = 0;
    // if(getCookie('key')){
    //     key = getCookie('key');
    // }
    /*改为使用localStorage来实现换肤*/
    if( localStorage.getItem('key')){
        key =  localStorage.getItem('key');
    }
    document.body.style.background = colorArr[key];
    document.querySelector('.changeSkin').onclick = function(){
        key++;
        // if(key>colorArr.length - 1){
        //     key = 0;
        // }
        key = key>3?0:key;
        // setCookie('key',key,{
        //     'Max-Age':3600 * 24
        // });
        localStorage.setItem('key',key);
        document.body.style.background = colorArr[key];
    }


    /**
     * 控制播放、添加按钮隐藏与显示
    **/
   let uls = document.querySelectorAll('.listContainer');
   let btns = document.querySelectorAll('.btnController');
   uls.forEach((item,key)=>{
        item.onmouseover = function(){
            btns.forEach((value,index)=>{
                if(index+1==key){
                    btns[index].style.display = 'block';
                    uls[index+1].style.backgroundColor = '#dfdff4';
                }else{
                    btns[index].style.display = 'none';
                    uls[index+1].style.backgroundColor = '';
                }
            })
        }
        // item.onmouseover = function(){
        //     uls[key+1].style.backgroundColor = '#dfdff4';
        // }
        // item.onmouseout = function(){
        //     uls[key+1].style.backgroundColor = '';
        // }
   })
    
}

/***
 * 封装设置、获取cookie的方法
 * 设置方法setCookie()
 * 获取方法getCookie()
 * console.log(document.cookie)   //test=test; test1=test1
***/
function setCookie(name,value,options={}){
    let cookieData = `${name}=${value};`;
    for(let key in options){
        let str = `${key}=${options[key]}`;
        cookieData += str;
    }
    document.cookie = cookieData;
}
function getCookie(name){
    let arr = document.cookie.split('; ');
    for(let i=0;i<arr.length;i++){
        let arr2 = arr[i].split('=');
        if(arr2[0] == name){
            return arr2[1];
        }
    }
    return '';
}

//引入数据


function showDetail(item){
    console.log(item);
    console.log(JSON.stringify(item));
    //存储音乐信息
    if(localStorage.getItem('item')){
        //去重
        let localData = JSON.parse(localStorage.getItem('item'));
        console.log(localData);
        if(!localData.find(value=>value.id==item.id)){
            localData.unshift(item);
            localStorage.setItem('item',JSON.stringify(localData));
        }
    
    }else{
        localStorage.setItem('item',JSON.stringify([item]));
    }
    //开启详情页
    if(!localStorage.getItem('isOpen')){
        window.open("/detail");
    }
    
}
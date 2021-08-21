//存储页面开启状态
localStorage.setItem('isOpen',true);

//当页面关闭时，清除isOpen状态
window.addEventListener('beforeunload',function(){
    localStorage.removeItem('isOpen');
})

//监听localStorage的变化，一旦有变化就更新视图
window.addEventListener('storage',function(){
    updateView();
})

window.onload = function(){
    updateView();

    //清空所有音乐列表
    document.querySelector('.deleteAll').onclick = function(){
        localStorage.removeItem('item');
        updateView();
    }

    //清空勾选项
    document.querySelector('.deleteItem').onclick = function(){
        let inputs = document.querySelectorAll('.exchange input');
        let musicData = localStorage.getItem('item');
        musicData = JSON.parse(localStorage.getItem('item')) || [];
        // inputs.forEach((item,index)=>{
        //     console.log(item.checked);
        //     if(item.checked){
        //         musicData.splice(index,1);
        //     }
        // })
        let len = inputs.length - 1;
        //倒序遍历
        for(var i=len;i>=0;i--){
            if(inputs[i].checked){
                musicData.splice(i,1);
            }
        }
        localStorage.setItem('item',JSON.stringify(musicData))
        updateView(); 
    }
}
//updateView
function updateView(){
    let musicData = localStorage.getItem('item');
    if(musicData){
        musicData = JSON.parse(musicData);
        let innerContent = '';
        musicData.forEach(item=>{
            let str = `
                <ul class="myul">
                    <input type="checkbox">
                    <li>${item.songName}</li>
                    <li>${item.singer}</li>
                    <li>${item.time}</li>
                </ul>
            `;
            innerContent += str;
        })
        document.querySelector('.exchange').innerHTML = innerContent;
    }else{
        document.querySelector('.exchange').innerHTML = '';
    }
}

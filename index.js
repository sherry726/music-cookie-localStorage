const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaStaticCache = require('koa-static-cache');
const nunjucks = require('nunjucks');
const KoaBody = require('koa-body');
const md5 = require('md5');
const musicData = require("./data/music.json");
const server = new Koa();
const router = new KoaRouter();

//为ctx封装render方法
const nj = new nunjucks.Environment(
    new nunjucks.FileSystemLoader('views',{
        noCache:true,
        watch:true
    })
)
server.use(async (ctx,next)=>{
    ctx.render = function(filename,data){
        ctx.body = nj.render(filename,data);
    }
    await next();
})

//搭建静态资源服务器
server.use(KoaStaticCache('./static',{
    prefix:"/public",
    gzip:true,
    dynamic:true
}))

//处理表单内容的中间件
server.use(KoaBody({
    multipart:true,
    formidable:{
        uploadDir:__dirname + '/static/upload',
        keepExtensions:true
    }
}))

//首页index
router.get('/',async (ctx,nect)=>{
    // ctx.body = 'hello';
    await ctx.render('index.html')
})
//登录页login
router.get('/login',async (ctx,nect)=>{
    let cookieInfo = ctx.cookies.get('isLogin');
    if(cookieInfo){
        let serverInfo = md5('lucy'+'123');
        if(serverInfo == cookieInfo){
            ctx.redirect('/list');
        }
    }
    await ctx.render('login.html')
})
router.post('/checkUser',async (ctx,next)=>{
    // console.log(ctx.request.body);
    //假设username=luly,pwd=123 没有连接数据库
    if(ctx.request.body.username == 'lucy' && ctx.request.body.pwd == '123'){
        //选择记住我之后，存储用户登录状态
        if(ctx.request.body.memberMe){
            //存储用户登录状态
            let loginStatus = md5('lucy'+'123');
            ctx.cookies.set('isLogin',loginStatus,{
                maxAge:7 * 24 * 60 * 60 * 1000
            });
        }
        ctx.redirect('/list');
    }else{
        ctx.redirect('/error');
    }
})
//歌曲列表页
router.get("/list", async (ctx, next) => {
    await ctx.render("list.html",{
        musicData
    });
    // console.log(musicData);
})
//播放详细页
router.get('/detail',async (ctx,nect)=>{
    await ctx.render('detail.html');
})
router.get("/error", async (ctx, next) => {
    await ctx.render("error.html");
})
server.use(router.routes());
server.listen(8081,()=>{
    console.log('项目启动成功!');
});
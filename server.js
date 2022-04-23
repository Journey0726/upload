import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-body'
import fs from 'fs'

const app = new Koa()
const router = new KoaRouter()
app.use(koaBody({
  multipart: true
}))
app.use(router.routes())

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', "*")
  ctx.set('Access-Control-Allow-Methods', "GET, POST")
  await next()
})

router.post('/file-slice', async (ctx, next) => {
  console.log(ctx.request.files);
  console.log(ctx.request.files.index);
  // const ws = fs.writeFileSync('test.txt', 'avbd')
  ctx.body = ctx.request.files
  await next()
})

app.listen(3000, () => {
  console.log('服务启动在3000端口');
})
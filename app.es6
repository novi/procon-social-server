import koa from 'koa'
let app = koa()

import conf from './conf'

app.use(function *(){
  this.body = 'Hello World 2'
});

let port = conf.PORT || process.env.PORT
app.listen(port)
console.log(`listening on ${port}`)
import koa from 'koa';
let app = koa();

app.use(function *(){
  this.body = 'Hello World 2';
});

app.listen(3000 || process.env.PORT);
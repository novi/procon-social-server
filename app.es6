import koa from 'koa'
import mount from 'koa-mount'

let app = koa()

import conf from './conf'

app.conf = conf

conf.Logger && app.use(conf.Logger())

import api from './routes/api'

app.use(mount('/api', api))

let port = process.env.PORT || conf.PORT
app.listen(port)
console.log(`listening on ${port}`)
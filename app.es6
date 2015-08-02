import koa from 'koa'
import mount from 'koa-mount'

let app = koa()

import conf from './conf'

conf.Logger && app.use(conf.Logger())

import api from './routes/api'

app.use(mount('/api', api))

let port = conf.PORT || process.env.PORT
app.listen(port)
console.log(`listening on ${port}`)
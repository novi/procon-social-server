import _ from 'koa-route'
import koa from 'koa'

let app = koa()

export default app

let getTwitterFeed = function *() {
  this.body = "test"
}

app.use(_.get('/social_feed/twitter', getTwitterFeed))

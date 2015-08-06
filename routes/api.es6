import _ from 'koa-route'
import koa from 'koa'
import conf from '../conf'
import compose from 'koa-compose'
import Twit from 'twit'
import thunkify from 'thunkify'
import co from 'co'
import cache from 'memory-cache'

let app = koa()

export default app

let auth = function *(next) {
  //console.log(this.req.headers)
  //this.throw(401)
  yield next
}

let KEY = "demo_feed"

function sleep(ms) {
  return function (cb) {
    setTimeout(cb, ms);
  };
}

let fetchTwitterFeed = function *() {
  let Tw = new Twit({
    consumer_key: conf.Twitter.ConsumerKey,
    consumer_secret: conf.Twitter.ConsumerSecret,
    access_token: conf.Twitter.AccessToken,
    access_token_secret:conf.Twitter.AccessSecret
  })
  let get = thunkify(Tw.get.bind(Tw))
  let data = yield get('search/tweets', {q:'#procon26'})
  cache.put(KEY, data[0])
  console.log('cache updated %s', new Date())
}

co(function *(){
  for(;;){
    // refresh search results
    yield fetchTwitterFeed()
    yield sleep(1000*30)
  }
}).catch(console.error)

let getTwitterFeed = function *() {
  let data = cache.get(KEY)
  if (!data) {
    this.status = 204
    return
  }
  this.body = data
}

app.use(_.get('/social_feed/twitter', compose([auth, getTwitterFeed])))

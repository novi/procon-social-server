import logger from 'koa-logger'
import twitter from './twitter'

export default {
  PORT: 3000,

  Logger: logger,
  Twitter: twitter
}
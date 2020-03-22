const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const uuidv4 = require('uuid/v4');
const faker = require('faker');

const app = new Koa();
const router = new Router();

app.use(cors());

app
  .use(router.routes())
  .use(router.allowedMethods());


class Message {
  constructor() {
    this.id = uuidv4();
    this.from = faker.internet.email();
    this.subject = faker.lorem.sentence();
    this.body = faker.lorem.paragraph();
    this.recieved = Date.now();
  }
}

const messagesArr = [];

function clear() {
  messagesArr.length = 0;
}

const interval = setInterval(() => {
  const message = new Message();
  messagesArr.push(message);
}, 10000);

setTimeout(clearInterval, 200000, interval);

router.get('/messages/unread', async (ctx, next) => {
  ctx.body = {
    status: 'ok',
    timestamp: Date.now(),
    messages: messagesArr,
  };
});

const port = process.env.PORT || 7070;
// eslint-disable-next-line no-unused-vars
const server = http.createServer(app.callback()).listen(port);

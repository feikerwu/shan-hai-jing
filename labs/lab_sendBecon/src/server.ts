import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  if (req.method == 'OPTIONS') res.sendStatus(200);
  /*让options请求快速返回*/ else next();
});

app.post('/report', (req, res) => {
  console.log(new Date().toISOString(), { query: req.query, body: req.body });
  res.end('got');
});

app.listen(3000, () => {
  console.log('server listen in port 3000');
});

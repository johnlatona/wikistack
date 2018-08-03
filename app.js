const express = require('express');
const morgan = require('morgan');
const mainLayout = require('./views/layout');
const views = require('./views/');
const models = require('./models/index');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

const app = express();

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
   res.redirect('/wiki');
});

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

const PORT = 1337;

const connect = async () => {
  await models.db.sync({ force: true});
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

connect();

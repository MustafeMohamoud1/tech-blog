const express = require('express');
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');
const sequelize = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const sessionStore = new sequelizeStore({
  db: sequelize
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore
}));

app.use('/', routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

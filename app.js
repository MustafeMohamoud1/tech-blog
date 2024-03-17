const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path'); 
const session = require('express-session');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
const routes = require('./routes');
const sequelize = require('./models');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Create an instance of express-handlebars with your desired configurations
const handlebars = exphbs.create({
  /* Add your configurations here */
});

// Set Handlebars as the template engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Specify the directory where Handlebars views are located
app.set('views', path.join(__dirname, 'views'));

app.get('/favicon.ico', (req, res) => res.status(204));

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

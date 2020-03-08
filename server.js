
var express = require('express');
var session = require('express-session');
const apiRoutes = require('./routes/apiRoutes');
const staticRoutes = require('./routes/staticRoutes');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const {SESSION_SECRET} = require('./config/index');
const expressLayout = require('express-ejs-layouts');

var app = express();


require('dotenv').config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(session({
	secret: SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static(__dirname+'/public'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(helmet.frameguard({ action: 'deny' }));
app.use('/',staticRoutes);


var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening to PORT 8081.....'));

module.exports = app;

let express = require(`express`)
let app = express()
var session = require('express-session');
const PORT = 8080
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
let routes = require("./routes/countries");
const flash = require("connect-flash");
const fs = require("fs")

app.use(session({ cookie: { maxAge: 60000 }, 
	secret: 'woot',
	resave: false, 
	saveUninitialized: false})); 
	
app.locals.data = require("./data/data.json");

app.get('/', (req, res) => {
	res.render('countries')
})


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/"));
app.use(methodOverride("_method"));
app.use(flash());

app.use('/', routes);


app.listen(PORT, () => {
	console.log(`Server running at port ${PORT} and network\nhttp://localhost:${PORT}`)
})
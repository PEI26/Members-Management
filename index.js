const express = require('express')
const path = require('path')
const app = express();
const logger = require('./middleware/log')
const exphbs = require('express-handlebars')
const members = require('./Members')
//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Init middleware
app.use(logger)
//handlebar middleware
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//homepage route
app.get('/',(req,res)=>
res.render('index',{
    title:'Member App',
    members
}));

//member api routes
app.use('/api/members',require('./routes/api/members'))

//set static folder
app.use(express.static(path.join(__dirname,'public')));

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`sever is ${PORT}`))
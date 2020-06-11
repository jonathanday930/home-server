express= require('express')
const morgan = require('morgan');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost',{ useNewUrlParser: true,  useUnifiedTopology: true}).then(console.log("connected to MongoDB...") )

var Handlebars = require('express-handlebars');

const config= require('config')

var handlebars = Handlebars.create({
  helpers:{
    list:  function(context, options) {
      var ret = "<ul>";

      for (var i = 0, j = context.length; i < j; i++) {
        ret = ret + "<li>" + options.fn(context[i]) + "</li>";
      }

      return ret + "</ul>";
    }
  }

})

hbs = require('handlebars')


app = express()


app.engine('hbs',handlebars.engine)
app.set('view engine','hbs')
app.set('views','./views')

bodyParser= require('body-parser')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true })); 

console.log(app.get('env'))
if(app.get('env') === 'development'){
  app.use(morgan('short'))
  console.log('morgan enabled...')
}


var fileRoutes = require('./routes/files.js')
app.use('/files/', fileRoutes);

var userRoutes = require('./routes/user.js')
app.use('/user/', userRoutes);

var homepage = require('./routes/homepage.js')
app.use('/',homepage)

var authRoutes = require('./routes/auth.js')
app.use('/auth/',authRoutes)

const port = 3000
// readFolderContents('.')
app.listen(port,()=> console.log(`listening on ${port}`))

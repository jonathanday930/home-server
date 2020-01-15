express= require('express')
const morgan = require('morgan');
var Handlebars = require( 'express-handlebars');


var hbs = Handlebars.create({
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



app = express({'strict': true})


app.engine('hbs',hbs.engine)
app.set('view engine','hbs')
app.set('views','./views')


app.use(express.json({'strict': true}))

app.use(morgan('tiny'))

var folderRoutes = require('./routes/folder.js')
app.use('/folder/', folderRoutes);

var fileRoutes = require('./routes/file.js')
app.use('/file/', fileRoutes);


const port = 3000
// readFolderContents('.')
app.listen(port,()=> console.log(`listening on ${port}`))

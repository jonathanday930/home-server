express= require('express')
app = express({'strict': true})

app.set('view engine','pug')
app.set('views','./views')

app.use(express.json({'strict': true}))

var folderRoutes = require('./routes/folder.js')
app.use('/folder/', folderRoutes);

var fileRoutes = require('./routes/file.js')
app.use('/file/', fileRoutes);


const port = 3000
// readFolderContents('.')
app.listen(port,()=> console.log(`listening on ${port}`))

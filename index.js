const fs = require('fs')
const util = require('util');

const express = require('express')
app = express()

app.use(express.json())

app.set('view engine','pug')
app.set('views','./views')

const readDir = util.promisify(fs.readdir)

const homeDirectory = '.'

app.get('/:path',(req,res)=> {

directoryToSearch = req.params.path.replace('\\','/').replace('$','.')

console.log(`Received get request for path ${directoryToSearch}`)

console.log(`${ directoryToSearch } `)
linkPreface = 'localhost:3000/' + req.params.path + '\\'
fs.readdir(directoryToSearch,(err,files)=>{res.render('fileList',{files : files, linkPreface:linkPreface} )})

});


const port = 3000
// readFolderContents('.')
app.listen(port,()=> console.log(`listening on ${port}`))

const fs = require('fs')
const util = require('util');
const path = require('path')
const express = require('express')
app = express()

app.use(express.json())

app.set('view engine','pug')
app.set('views','./views')

const readDir = util.promisify(fs.readdir)

const homeDirectory = '/home/jonathan/node-projects/home-server'

// This is for a folder
app.get('/folder/?:path(*)',(req,res)=> {

directoryToSearch = path.join(homeDirectory,req.params.path)


console.log(`searching directory ${directoryToSearch}`)
const address ='http://localhost:3000/folder/'
// const address ='/folder/'

console.log(`param is ${req.params.path}`)
linkPreface = path.join(address,req.params.path)
console.log(`preface is ${linkPreface}`)

fs.readdir(directoryToSearch,(err,files)=>{
  if (! files== null){
  files = []
}

  console.log(`files is: ${files}` )
  console.log(`passing these to pug: ${files} and ${linkPreface}`)
  res.render('fileList',{files : files, linkPreface:linkPreface} )
}
);

});

console.log(path.join('http://hi', 'b\\c/d'))
const port = 3000
// readFolderContents('.')
app.listen(port,()=> console.log(`listening on ${port}`))

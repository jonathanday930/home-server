const fs = require('fs')
const util = require('util');
const path = require('path')
const express = require('express')
app = express()

app.use(express.json())

app.set('view engine','pug')
app.set('views','./views')
app.enable('strict routing');
const readDir = util.promisify(fs.readdir)

const homeDirectory = '/home/jonathan/node-projects/home-server'


app.get('/folder',(req,res)=> {
  console.log('folder no slash')
  res.redirect('/folder/')


});

// This is for a folder
app.get('/folder/:path(*)',(req,res)=> {

directoryToSearch = path.join(homeDirectory,req.params.path)

//http://localhost:3000/
console.log(`searching directory ${directoryToSearch}`)
const address ='folder/'
// const address ='/folder/'

console.log(`param is |${ req.params.path.length}|`)
linkPreface = path.join(address,req.params.path)
console.log(`preface is ${linkPreface}`)

fs.readdir(directoryToSearch,(err,files)=>{
  if (! files== null){
  files = []
}
  links = []
  for (i in files){
    links.push(path.join(req.params.path,files[i]))
  }
  console.log(`files is: ${files}` )
  console.log(`passing these to pug: ${links} and ${linkPreface}`)
  res.render('fileList',{files : links, linkPreface:linkPreface} )
}
);

});

console.log(path.join('http://hi', 'b\\c/d'))
const port = 3000
// readFolderContents('.')
app.listen(port,()=> console.log(`listening on ${port}`))

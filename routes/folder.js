const fs = require('fs')
const util = require('util');
const path = require('path')
var parseUrl = require('parseurl');
const express = require('express')

router = express.Router()


const stat = util.promisify(fs.stat)

const homeDirectory = '/home/jonathan/cs176/'

 router.get('/:path(*)',async (req,res)=> {

   console.log(`folder received params ${req.params.path}`)


  // if (parseUrl.original(req).pathname == req.baseUrl){
  //   res.redirect(parseUrl.original(req).pathname +'/')
  // }

  pathRequested = path.join(homeDirectory,req.params.path)

  console.log(`searching file in folder: ${pathRequested}`)

  fileStat = await stat(pathRequested)
  console.log(`file is directory: ${fileStat.isDirectory()}`)

  if (fileStat.isDirectory()){

    // Pug urls wont add other fields unless the url ends with /
    if (parseUrl.original(req).pathname.slice(-1) != '/'){
      console.log(`redirecting to ${parseUrl.original(req).pathname + '/'}`)
      return res.redirect(parseUrl.original(req).pathname + '/')
    }

  //http://localhost:3000/

  // const address ='/folder/'


  fs.readdir(pathRequested,(err,files)=>{
    if (! files== null){
      console.log('this is important')
    files = []
  }

    links = []
    for (i in files){
      links.push({link:path.join('/folder/',req.params.path,files[i]), title: files[i]})
      console.log(path.join('/',req.params.path,files[i]))
    }


    console.log(`files is: ${files}` )
    console.log(`passing these to pug: ${links} and ${req.params.path}`)
    res.render('folder',{files : links, title:req.params.path} )
  }
  );
} else{
  console.log('sending file')
  path1 = path.join('../../filee/view/',req.params.path)
  console.log(`redirecting to ${path1}`)
  return res.redirect(path.join('/../file/view/',req.params.path))
}
});

module.exports = router
